import React from 'react';
import { useState } from 'react';
import { data } from '@/utils/mistadata';
import { CategoriesGrid } from '@/components/CategoriesGrid';
import { ProductCards } from '@/components/ProductCard';
import { PaginationSlider } from '@/components/PaginationSlider';
import { FiltersModal } from '@/components/FiltersModal';
import { Banner } from '@/components/Banner';
import { filterByProps } from '@/utils/filter';
import { getPagination } from '@/utils/pagination';
import styles from '../styles/Miista.module.css';
import Head from 'next/head';

const Miista = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // Function to generate arrays based on props (colors , categories abd prices)
  // with unique entries
  const arrayFromProp = (prop) => {
    const check = data.reduce((acc, item) => {
      acc = [...acc, ...item[prop]];
      return acc;
    }, []);
    return [...new Set(check)];
  };

  // Function to toggle the color back and forth and store the color if
  // it is not found in the selectedColors array
  const toggleFilterColor = (value) => {
    const hasColor = selectedColors.includes(value);

    if (hasColor) {
      setSelectedColors(selectedColors.filter((color) => color != value));
    } else {
      setSelectedColors([...selectedColors, value]);
    }

    setCurrentPageIndex(0);
  };

  // Function to toggle the category back and forth and store the category if
  // it is not found in the selectedCategories array
  const toggleFilterCategory = (value) => {
    const hasCategory = selectedCategories.includes(value);

    if (hasCategory) {
      setSelectedCategories(
        selectedCategories.filter((category) => category != value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }

    setCurrentPageIndex(0);
  };

  // Function to toggle the category back and forth and store the category if
  // it is not found in the selectedCategories array
  const handlePriceFilter = (value) => {
    const setPriceRange = [...availablePrices].filter(
      (prices) => prices <= value
    );

    setSelectedPrices(setPriceRange);
    setCurrentPageIndex(0);
  };

  // Variable that sets the amount of items per page (Pagination)
  const groupsAmount = 30;

  // Object that stores the colors , categories and prices from items
  const filters = {
    colors: selectedColors,
    categories: selectedCategories,
    prices: selectedPrices,
  };

  // Function that filters the products based on the filters object
  // The products are sorted to showcase the highest price product first
  const filteredList = filterByProps(data, filters).sort(
    (a, b) => b.prices - a.prices
  );

  // Once we have the filtered array. We pass it to the pagination function.
  // The pagination function will return an array of arrays divided by the number stored in
  // the groupsAmount variable
  const pages = getPagination(filteredList, groupsAmount);
  const currentPageItems = pages[currentPageIndex];

  // Function that checks if the products are paginated. Then it loops and
  // passes the information to the ProductCard component for rendering.
  const renderProducts = () => {
    if (pages.length > 0) {
      return (
        <div>
          <ProductCards items={currentPageItems} />
        </div>
      );
    }
  };

  // Function that substracts the pages and returns if the index is 0
  // This function is made for the pagination to work
  const setPreviousPage = () => {
    if (currentPageIndex === 0) {
      return;
    }

    setCurrentPageIndex(currentPageIndex - 1);
  };

  // Function that adds the pages and returns if the index is the last one
  // This function is made for the pagination to work
  const setNextPage = () => {
    if (currentPageIndex === pages.length - 1) {
      return;
    }

    setCurrentPageIndex(currentPageIndex + 1);
  };

  // Function to clear all the filters
  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedCategories([]);
    setSelectedPrices([]);
  };

  // Variables that store all the unique number of colors , categories and prices
  const availableColors = arrayFromProp('colors');
  const availableCategories = arrayFromProp('categories');
  const availablePrices = arrayFromProp('prices');

  // Object that stores Modal Props that woud get passed to the component
  const ModalProps = {
    availableColors,
    selectedColors,
    availableCategories,
    availablePrices,
    selectedCategories,
    selectedPrices,
    openModal,
  };

  return (
    <React.Fragment>
      <Head>
        <title>Miista</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Banner />
      <div>
        <CategoriesGrid
          allCategories={availableCategories}
          click={(event) =>
            toggleFilterCategory(event.target.getAttribute('category'))
          }
          selectedCategories={selectedCategories}
        />
        <FiltersModal
          {...ModalProps}
          toggleModal={() => setOpenModal(!openModal)}
          categoryClick={(event) =>
            toggleFilterCategory(event.target.getAttribute('category'))
          }
          colorClick={(event) => toggleFilterColor(event.target.innerText)}
          pricesRange={(event) => handlePriceFilter(event.target.value)}
          clearFilter={() => clearFilters()}
        />
      </div>
      <div>{renderProducts()}</div>
      <div className={styles.paginationGrid}>
        <PaginationSlider
          setPrevious={setPreviousPage}
          currentPage={currentPageIndex + 1}
          totalPages={pages.length}
          setNext={setNextPage}
        />
      </div>
    </React.Fragment>
  );
};

export default Miista;
