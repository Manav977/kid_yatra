import React, { useEffect } from 'react'; // useEffect import kiya
import { schoolPrograms } from '../../mock';
import styles from './SchoolPrograms.module.css';

export const SchoolPrograms = () => {

  // Preloading Logic: Jab component mount ho, images download shuru kar do
  useEffect(() => {
    schoolPrograms.forEach((program) => {
      const img = new Image();
      img.src = program.image;
    });
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
          {schoolPrograms.map((program) => (
            <div key={program.id} className={styles.programCard}>
              <img 
                src={program.image} 
                alt={program.title} 
                className={styles.programImage}
                loading="lazy" // Sirf un browsers ke liye jo preloading support nahi karte
                decoding="async"
              />
              <div className={styles.programContent}>
                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.programDescription}>{program.description}</p>
              </div>
            </div>
          ))}
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