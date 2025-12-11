import React from "react";
import styles from "./Steps.module.css";

export function Steps({ children }) {
  return <div className={styles.steps}>{children}</div>;
}

export function Step({ title, children }) {
  return (
    <div className={styles.step}>
      <h3>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
