import React from 'react';
import { Target, Shield, Sparkles } from 'lucide-react';
import styles from './About.module.css';
import { Logo } from './Logo';

export const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutContainer}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <p className={styles.sectionSubtitle}>
          Empowering young minds through adventure, learning, and unforgettable experiences
        </p>

        <div className={styles.aboutContent}>
          <div className={styles.aboutCard}>
            <div className={styles.iconWrapper}>
              <Target size={32} />
            </div>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardText}>
              At Kid Yatra, we believe adventure is the best teacher. Our mission is to create 
              thrilling, safe, and educational experiences that help children build confidence, 
              develop teamwork skills, and create lasting memories at our Hill 'n' Thrills resort 
              in the beautiful Morni Hills.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <div className={styles.iconWrapper}>
              <Sparkles size={32} />
            </div>
            <h3 className={styles.cardTitle}>Resort Adventures</h3>
            <p className={styles.cardText}>
              Our adventure resort offers over 12 exciting activities including zip lines, wall 
              climbing, trampolines, rope courses, and more. Every activity is designed to challenge 
              young adventurers while ensuring maximum safety with trained staff and proper equipment.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <div className={styles.iconWrapper}>
              <Shield size={32} />
            </div>
            <h3 className={styles.cardTitle}>School Programs</h3>
            <p className={styles.cardText}>
              We bring the adventure to you! Our mobile team sets up exciting activities right at 
              your school premises. With portable equipment and certified instructors, we make it 
              easy for schools to offer students unforgettable adventure experiences without leaving campus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};