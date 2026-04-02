import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

export const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          {/* Logo + Description */}
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>Kid Yatra</div>
            <p className={styles.footerDescription}>
              Creating unforgettable adventure experiences for young explorers
              at Hill 'n' Thrills resort and schools across the region. Safety,
              fun, and learning combined!
            </p>

            {/* Social Icons */}
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <div className={styles.quickLinks}>
              <a
                className={styles.footerLink}
                onClick={() => scrollToSection("home")}
              >
                Home
              </a>
              <a
                className={styles.footerLink}
                onClick={() => scrollToSection("about")}
              >
                About Us
              </a>
              <a
                className={styles.footerLink}
                onClick={() => scrollToSection("activities")}
              >
                Activities
              </a>
              <a
                className={styles.footerLink}
                onClick={() => scrollToSection("school-programs")}
              >
                School Programs
              </a>
              <a
                className={styles.footerLink}
                onClick={() => scrollToSection("gallery")}
              >
                Gallery
              </a>
              <a
                className={styles.footerLink}
                onClick={() => scrollToSection("safety")}
              >
                Safety
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact Us</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} size={20} />
                <span>Hill 'n' Thrills, Morni Hills, Haryana</span>
              </div>
              <a href="tel:+917508410487" className={styles.contactItem}>
                <Phone className={styles.contactIcon} size={20} />
                <span>+91 7508410487</span>
              </a>

              {/* Email par click karne par Mail App khulegi */}
              <a href="mailto:Info@Kidyatra.com" className={styles.contactItem}>
                <Mail className={styles.contactIcon} size={20} />
                <span>Info@kidyatra.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} Kid Yatra. All rights reserved. Built
            with passion for young adventurers.
          </p>
        </div>
      </div>
    </footer>
  );
};
