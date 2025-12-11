import React from 'react';
import clsx from 'clsx';
import styles from './FeatureCard.module.css';

const FeatureCard = ({ title, description, icon, className, href }) => {
  const CardWrapper = href ? 'a' : 'div';
  
  return (
    <CardWrapper 
      className={clsx(styles.featureCard, className)}
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {icon && (
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon}</span>
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      {href && (
        <div className={styles.arrow}>
          →
        </div>
      )}
    </CardWrapper>
  );
};

export default FeatureCard;