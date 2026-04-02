import React, { useEffect } from 'react';
import { ActivityCard } from './ActivityCard';
import { activities } from '../../mock';
import styles from './Activities.module.css';

export const Activities = () => {
  
  useEffect(() => {
    // Preloading Logic
    activities.forEach((activity) => {
      const img = new Image();
      img.src = activity.image;
      
      // Optional: Agar aap check karna chahte hain load hui ya nahi
      // img.onload = () => console.log(`${activity.title} loaded!`);
    });
  }, []); // [] ka matlab hai ye sirf page load hone par ek baar chalega

  return (
    <section id="activities" className={styles.activities}>
      <div className={styles.activitiesContainer}>
        <h2 className={styles.sectionTitle}>Our Adventures</h2>
        <p className={styles.sectionSubtitle}>
          Explore our wide range of thrilling activities designed for young adventurers
        </p>

        <div className={styles.activitiesGrid}>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              image={activity.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};