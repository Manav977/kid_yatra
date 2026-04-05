import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig.js';
import { collection, getDocs } from "firebase/firestore";
import styles from './Gallery.module.css';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery images: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.galleryContainer}>
        <h2 className={styles.sectionTitle}>Adventure Gallery</h2>
        <p className={styles.sectionSubtitle}>
          Moments of joy, excitement, and unforgettable memories
        </p>

        <div className={styles.galleryGrid}>
          {loading ? (
            // Jab data load ho raha ho, 8 skeletons dikhayein
            Array(8).fill(0).map((_, index) => (
              <div key={index} className={styles.skeletonItem}></div>
            ))
          ) : (
            // Jab data aa jaye
            images.map((image) => (
              <div key={image.id} className={styles.galleryItem}>
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className={styles.galleryImage}
                  loading="lazy" 
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};