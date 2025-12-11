import React from 'react';
import styles from './Callout.module.css';

export default function Callout({ type = "info", children }) {
    return (
       <div className={`${styles.callout} ${styles[type]}`}>
      {children}
    </div>
  );
} 
    