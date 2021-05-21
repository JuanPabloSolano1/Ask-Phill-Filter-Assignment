import React from 'react';
import styles from '../../styles/Categories.module.css';

export const CategoriesGrid = (props) => {
  const { allCategories, click, selectedCategories } = props;

  const category = allCategories.map((category, index) => {
    return (
      <div key={index} className={styles.categoriesContainer}>
        <p
          category={category}
          className={
            selectedCategories.includes(category)
              ? styles.categoryFiltered
              : styles.categoryNotFiltered
          }
          onClick={click}
        >
          {category}
        </p>
      </div>
    );
  });
  return <div className={styles.categoriesGrid}>{category}</div>;
};
