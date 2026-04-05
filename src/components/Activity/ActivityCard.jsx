import React, { useState } from 'react';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ title, description, image }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrapper} ${!isLoaded ? styles.skeleton : ''}`}>
        <img 
          src={image} 
          alt={title} 
          className={`${styles.cardImage} ${isLoaded ? styles.visible : styles.hidden}`} 
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className={styles.cardContent}>
        {/* Agar aap text par bhi skeleton chahte hain toh condition laga sakte hain */}
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};