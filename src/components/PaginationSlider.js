import React from 'react';
import { Button } from './Button';
import styles from '../../styles/PaginationSlider.module.css';
export const PaginationSlider = (props) => {
  const { setPrevious, currentPage, totalPages, setNext } = props;
  return (
    <div className={styles.paginationGrid}>
      <Button
        className={styles.paginationButton}
        click={setPrevious}
        text={'Previous'}
      />
      <p className={styles.paginationText}>
        Page {currentPage} of {totalPages > 0 ? totalPages : 1}
      </p>
      <Button
        className={styles.paginationButton}
        click={setNext}
        text={'Next'}
      />
    </div>
  );
};
