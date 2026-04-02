import React, { useEffect } from 'react';
import { galleryImages } from '../../mock';
import styles from './Gallery.module.css';

export const Gallery = () => {

  useEffect(() => {
    // Gallery ki saari images ko background mein preload karein
    galleryImages.forEach((image) => {
      const img = new Image();
      img.src = image.url;
    });
  }, []);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.galleryContainer}>
        <h2 className={styles.sectionTitle}>Adventure Gallery</h2>
        <p className={styles.sectionSubtitle}>
          Moments of joy, excitement, and unforgettable memories
        </p>

        <div className={styles.galleryGrid}>
          {galleryImages.map((image) => (
            <div key={image.id} className={styles.galleryItem}>
              <img 
                src={image.url} 
                alt={image.alt} 
                className={styles.galleryImage}
                // Browser ko batayein ki ye images background mein fetch ho sakti hain
                loading="lazy" 
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};