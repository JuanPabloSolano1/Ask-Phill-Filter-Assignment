import React from 'react';
import styles from '../../styles/Modal.module.css';
import { ColorGrid } from '@/components/ColorGrid';
import { PricesRange } from '@/components/PricesRange';
import { Button } from '@/components/Button';
import { CancelIcon } from '@/components/Icons';
import categoryStyles from '../../styles/Categories.module.css';

export const FiltersModal = (props) => {
  const {
    toggleModal,
    colorClick,
    categoryClick,
    openModal,
    clearFilter,
    pricesRange,
    availableColors,
    availablePrices,
    selectedColors,
    selectedCategories,
    selectedPrices,
  } = props;

  // Function that displays the categories that are filtered by the user
  const displaySelectedCategories = () => {
    return selectedCategories.length ? (
      selectedCategories.map((category, index) => {
        return (
          <div key={index} className={categoryStyles.categoriesContainer}>
            <p
              onClick={categoryClick}
              category={category}
              className={categoryStyles.categoryFiltered}
            >
              {category}
            </p>
          </div>
        );
      })
    ) : (
      <p className={styles.noCategory}>No categories selected</p>
    );
  };

  // This function returns the max and min value from an array of prices
  const priceRange = (type) => {
    return type === 'min'
      ? availablePrices.reduce((a, b) => Math.min(a, b))
      : availablePrices.reduce((a, b) => Math.max(a, b));
  };

  // Function that returns the max price from the selectedPrices array
  const priceMax = () => {
    const maximumPrice = selectedPrices.reduce((a, b) => Math.max(a, b));
    return maximumPrice;
  };

  const modalBody = openModal ? (
    <div className={styles.drawer}>
      <div className={styles.cancelIcon}>
        <CancelIcon click={toggleModal} />
      </div>
      <ColorGrid
        availableColors={availableColors}
        click={colorClick}
        colors={selectedColors}
      />
      <div
        className={
          selectedCategories.length ? styles.categoriesGrid : styles.categories
        }
      >
        <div>
          <h3 className={categoryStyles.header}>Categories</h3>
        </div>
        {displaySelectedCategories()}
      </div>
      <div>
        <PricesRange
          allPriceMin={priceRange('min')}
          allPriceMax={priceRange('max')}
          value={selectedPrices.length ? priceMax() : priceRange('max')}
          prices={selectedPrices}
          change={pricesRange}
        />
      </div>
      <div className={styles.clearFilterButton}>
        <Button text={'Clear'} click={clearFilter} />
      </div>
    </div>
  ) : null;

  return (
    <React.Fragment>
      <p onClick={toggleModal} className={styles.filtersLink}>
        More Filters
      </p>
      {modalBody}
    </React.Fragment>
  );
};
