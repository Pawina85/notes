import React from "react"
import styles from "./FeatureCard.module.css"

export default function FeatureCard({ title, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{children}</p>
    </div>
  );
}