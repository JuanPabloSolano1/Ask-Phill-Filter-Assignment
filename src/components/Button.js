import React from 'react';
import styles from '../../styles/Button.module.css';
export const Button = (props) => {
  const { text, click } = props;
  return (
    <React.Fragment>
      <button className={styles.button} onClick={click}>
        {text}
      </button>
    </React.Fragment>
  );
};
