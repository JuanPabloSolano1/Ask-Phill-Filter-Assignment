import React from 'react';
import styles from '../../styles/PricesRange.module.css';

export const PricesRange = (props) => {
  const { change, allPriceMin, allPriceMax, value, prices } = props;

  const getSelectablePrice = (type) => {
    const price =
      type === 'min'
        ? prices.reduce((a, b) => Math.min(a, b))
        : prices.reduce((a, b) => Math.max(a, b));
    return price;
  };

  return (
    <div className={styles.priceContainer}>
      <div className={styles.priceSlider}>
        <input
          type="range"
          onChange={change}
          type="range"
          name="prices"
          min={allPriceMin}
          max={allPriceMax}
          step="20"
          value={value}
          className={styles.inputRange}
        ></input>
      </div>
      <p className={styles.priceRange}>
        {prices.length
          ? `Price: €${getSelectablePrice('min')} - €${getSelectablePrice(
              'max'
            )}`
          : `Price: €${allPriceMin} - €${allPriceMax}`}
      </p>
    </div>
  );
};
