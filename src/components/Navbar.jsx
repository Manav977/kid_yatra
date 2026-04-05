import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; 
import { onAuthStateChanged } from "firebase/auth";
import styles from './Navbar.module.css';
import { Logo } from './Logo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu khulne par background scroll lock karne ke liye
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleAdminLogin = () => {
    setMobileMenuOpen(false);
    if (user) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false); // Menu pehle band karo
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Navbar ki height ke liye offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300); // Menu transition ke liye thoda delay
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo} onClick={() => scrollToSection('home')}>
          <Logo />
        </div>

        <button 
          className={styles.menuToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Overlay */}
        <div className={`${styles.overlay} ${mobileMenuOpen ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          {['home', 'about', 'activities', 'school-programs', 'gallery', 'safety', 'contact'].map((item) => (
            <li key={item} className={styles.navItem}>
              <button className={styles.navLink} onClick={() => scrollToSection(item)}>
                {item.replace('-', ' ').toUpperCase()}
              </button>
            </li>
          ))}
          
          <li className={styles.adminEntry}>
            <button className={styles.adminBtn} onClick={handleAdminLogin}>
              <Lock size={16} style={{marginRight: '8px'}} /> 
              {user ? "DASHBOARD" : "ADMIN"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};