import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { Logo } from './Logo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // Agar header fixed NAHI hai, toh offset ki zarurat nahi hoti
    // Seedha element ke top par scroll karein
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition, 
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  }
};

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo} onClick={() => scrollToSection('home')}>
          <Logo/>
        </div>

        <button 
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('home')}>
              Home
            </a>
          </li>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('about')}>
              About Us
            </a>
          </li>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('activities')}>
              Activities
            </a>
          </li>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('school-programs')}>
              School Programs
            </a>
          </li>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('gallery')}>
              Gallery
            </a>
          </li>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('safety')}>
              Safety
            </a>
          </li>
          <li>
            <a className={styles.navLink} onClick={() => scrollToSection('contact')}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};