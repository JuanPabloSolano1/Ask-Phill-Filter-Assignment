import React from 'react';
import styles from '../../styles/Colors.module.css';

export const ColorGrid = (props) => {
  const { availableColors, click, colors } = props;

  const color = availableColors.map((color, index) => {
    const style = {
      backgroundColor: color,
    };
    return (
      <div key={index}>
        <div
          data-color={color.toLowerCase()}
          onClick={click}
          className={
            colors.includes(color) ? styles.colorSelected : styles.color
          }
          style={style}
        >
          {color}
        </div>
      </div>
    );
  });
  return (
    <div className={styles.colorsContainer}>
      <h3 className={styles.header}>Colors</h3>
      <div className={styles.colorgrid}>{color}</div>
    </div>
  );
};
