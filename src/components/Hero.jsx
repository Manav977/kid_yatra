import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const HERO_IMAGES = [
  "https://res.cloudinary.com/dvj3fj7gz/image/upload/f_auto,q_auto/v1774717106/Gemini_Generated_Image_vlshetvlshetvlsh_1_ajqkod.png",
  "https://res.cloudinary.com/dvj3fj7gz/image/upload/f_auto,q_auto/v1774717460/Gemini_Generated_Image_j8prdtj8prdtj8pr_jb8con.png",
  "https://res.cloudinary.com/dvj3fj7gz/image/upload/f_auto,q_auto/v1774717414/e1460609-7829-4b0f-a466-129aa1eab6f7_pukutj.jpg"
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // New state to check first image load

  useEffect(() => {
    // 1. PRELOADING LOGIC & CHECKING FIRST IMAGE
    let loadedCount = 0;
    HERO_IMAGES.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (index === 0) setIsLoaded(true); // Pehli image aate hi skeleton hata do
      };
    });

    // 2. SLIDER TIMER
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      {/* 3. HERO SKELETON */}
      {!isLoaded && (
        <div className={styles.heroSkeleton}>
          <div className={styles.shimmer}></div>
        </div>
      )}

      <div className={styles.heroBackgroundsContainer}>
        {HERO_IMAGES.map((imageUrl, index) => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={`Adventure activity background ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            className={`${styles.heroBackgroundImage} ${
              index === currentImageIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>
      
      {/* Content hamesha dikhega (ya loading ke baad) */}
      <div className={`${styles.heroContent} ${isLoaded ? styles.fadeIn : ''}`}>
        <h1 className={styles.heroTitle}>Unforgettable Adventures for Young Explorers</h1>
        <p className={styles.heroSubtitle}>Hill 'n' Thrills Adventure Resort - Morni Hills</p>
        <p className={styles.heroDescription}>
          We bring adventure to resorts and directly to your school!
        </p>
        <button className={styles.ctaButton} onClick={scrollToContact}>
          Book Now
        </button>
      </div>
    </section>
  );
};