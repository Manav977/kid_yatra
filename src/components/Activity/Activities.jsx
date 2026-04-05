import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig'; // Path sahi check karlein
import { collection, getDocs } from "firebase/firestore";
import { ActivityCard } from './ActivityCard';
import styles from './Activities.module.css';

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivitiesFromFirebase = async () => {
      try {
        // Firebase se 'activities' collection ka reference lena
        const querySnapshot = await getDocs(collection(db, "activities"));
        
        // Data ko array mein convert karna
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivitiesFromFirebase();
  }, []);

  return (
    <section id="activities" className={styles.activities}>
      <div className={styles.activitiesContainer}>
        <h2 className={styles.sectionTitle}>Our Adventures</h2>
        <p className={styles.sectionSubtitle}>
          Explore our wide range of thrilling activities designed for young adventurers
        </p>

        <div className={styles.activitiesGrid}>
          {loading ? (
            // Jab tak loading ho rahi hai, 8 khali cards (Skeleton look ke liye)
            Array(8).fill(0).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                {/* Agar aapne pehle wala Skeleton CSS banaya hai toh yahan use karein */}
                Loading...
              </div>
            ))
          ) : (
            // Jab data aa jaye
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
              />
            ))
          )}
        </div>

        {!loading && activities.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No activities found in database.</p>
        )}
      </div>
    </section>
  );
};