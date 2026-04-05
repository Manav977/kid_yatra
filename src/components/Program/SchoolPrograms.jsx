import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import styles from './SchoolPrograms.module.css';

export const SchoolPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "programs"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="school-programs" className={styles.schoolPrograms}>
      <div className={styles.programsContainer}>
        <h2 className={styles.sectionTitle}>School Adventure Programs</h2>
        <p className={styles.sectionSubtitle}>
          Bring the thrill of adventure directly to your school! Kid Yatra organizes complete 
          adventure activity setups at school premises with trained staff, safety equipment, 
          and engaging programs that combine fun with learning.
        </p>
        <p className={styles.highlightText}>
          Safe Setup • Trained Staff • Fun Learning • No Travel Required
        </p>

        <div className={styles.programsGrid}>
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonText1}></div>
                <div className={styles.skeletonText2}></div>
              </div>
            ))
          ) : (
            programs.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <img 
                  src={program.imageUrl || program.image ||'https://via.placeholder.com/400x250?text=Kid+Yatra+Adventure'} 
                  alt={program.title} 
                  className={styles.programImage}
                  loading="lazy" 
                  decoding="async"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=Kid+Yatra+Adventure';
                  }}
                />
                <div className={styles.programContent}>
                  <h3 className={styles.programTitle}>{program.title}</h3>
                  <span className={styles.programMeta}>
                    {program.duration || 'Day Trip'} | ₹{program.price || 'Contact for Quote'}
                  </span>
                  <p className={styles.programDescription}>{program.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.ctaSection}>
          <button className={styles.ctaButton} onClick={scrollToContact}>
            Book for Your School
          </button>
        </div>
      </div>
    </section>
  );
};