import React from 'react';
import { Shield, Users, Award, CheckCircle } from 'lucide-react';
import styles from './Safety.module.css';

export const Safety = () => {
  return (
    <section id="safety" className={styles.safety}>
      <div className={styles.safetyContainer}>
        <h2 className={styles.sectionTitle}>Your Safety is Our Priority</h2>
        <p className={styles.sectionSubtitle}>
          Every adventure at Kid Yatra is designed with the highest safety standards. 
          Our certified instructors, premium equipment, and comprehensive safety protocols 
          ensure that every child can explore, learn, and have fun with complete peace of mind.
        </p>

        <div className={styles.safetyGrid}>
          <div className={styles.safetyCard}>
            <div className={styles.iconWrapper}>
              <Shield size={32} />
            </div>
            <h3 className={styles.safetyTitle}>Premium Safety Gear</h3>
            <p className={styles.safetyDescription}>
              All participants are equipped with high-quality safety gear including harnesses, 
              helmets, and protective padding. Every piece of equipment is regularly inspected 
              and maintained to international safety standards.
            </p>
          </div>

          <div className={styles.safetyCard}>
            <div className={styles.iconWrapper}>
              <Users size={32} />
            </div>
            <h3 className={styles.safetyTitle}>Certified Instructors</h3>
            <p className={styles.safetyDescription}>
              Our team consists of trained and certified adventure activity instructors with 
              extensive experience working with children. They provide constant supervision 
              and guidance throughout every activity.
            </p>
          </div>

          <div className={styles.safetyCard}>
            <div className={styles.iconWrapper}>
              <Award size={32} />
            </div>
            <h3 className={styles.safetyTitle}>Safety First Training</h3>
            <p className={styles.safetyDescription}>
              Before each activity, participants receive comprehensive safety briefings and 
              instructions. We ensure every child understands the rules and feels confident 
              before beginning their adventure.
            </p>
          </div>
        </div>

        <div className={styles.safetyFeatures}>
          <h3 className={styles.featuresTitle}>Our Safety Commitments</h3>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} size={20} />
              <span>24/7 first aid facilities and trained medical staff on-site</span>
            </li>
            <li className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} size={20} />
              <span>Age-appropriate activities with proper difficulty levels</span>
            </li>
            <li className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} size={20} />
              <span>Regular equipment maintenance and safety audits</span>
            </li>
            <li className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} size={20} />
              <span>Small group ratios for personalized attention</span>
            </li>
            <li className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} size={20} />
              <span>Comprehensive insurance coverage for all activities</span>
            </li>
            <li className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} size={20} />
              <span>Emergency response protocols and evacuation plans</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};