import React from 'react';
import clsx from 'clsx';
import styles from './Callout.module.css';

const Callout = ({ type = 'info', title, children, className }) => {
  const calloutClasses = clsx(
    styles.callout,
    styles[`callout--${type}`],
    className
  );

  return (
    <div className={calloutClasses}>
      {title && (
        <div className={styles.calloutHeader}>
          <strong>{title}</strong>
        </div>
      )}
      <div className={styles.calloutContent}>
        {children}
      </div>
    </div>
  );
};

export default Callout;
