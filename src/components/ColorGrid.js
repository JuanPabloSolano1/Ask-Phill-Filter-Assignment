import React from 'react';
import styles from '../../styles/Colors.module.css';

export const ColorGrid = (props) => {
  const { availableColors, click, colors } = props;

  const color = availableColors.map((color) => {
    const style = {
      backgroundColor: color,
    };
    return (
      <div>
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
    <div>
      <h3 className={styles.header}>Colors</h3>
      <div className={styles.colorgrid}>{color}</div>
    </div>
  );
};
