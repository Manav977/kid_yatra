import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    schoolName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.schoolName.trim())
      newErrors.schoolName = "School name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    const serviceID = "service_4l3j1qq";
    const templateID = "template_w85bs3i";
    const publicKey = "x2kgOzFoHCHv3Wc-m";

    const templateParams = {
      from_name: formData.name,
      school_name: formData.schoolName,
      phone_number: formData.phone,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setSubmitSuccess(true);
      // Reset form data for next time
      setFormData({
        name: "",
        schoolName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactContainer}>
        <h2 className={styles.sectionTitle}>Book Your Adventure</h2>
        <p className={styles.sectionSubtitle}>
          Ready to create unforgettable memories?
        </p>

        <div className={styles.formCard}>
          {submitSuccess ? (
            <div
              className={styles.successMessage}
              style={{ textAlign: "center", padding: "2rem" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3>Thank You!</h3>
              <p>
                Your request has been submitted successfully. We will contact
                you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className={styles.submitButton}
                style={{ marginTop: "1rem", width: "auto" }}
              >
                Send Another Message
              </button>
            </div>
          ) : submitError ? (
            <div
              className={styles.errorMessage}
              style={{ textAlign: "center", padding: "2rem" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❌</div>
              <h3>Oops!</h3>
              <p>
                Something went wrong while sending the message. Please try
                again.
              </p>
              <button
                onClick={() => setSubmitError(false)}
                className={styles.submitButton}
                style={{ marginTop: "1rem", width: "auto" }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  className={styles.input}
                  value={formData.schoolName}
                  onChange={handleChange}
                />
                {errors.schoolName && (
                  <span className={styles.error}>{errors.schoolName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className={styles.input}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <textarea
                  name="message"
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Booking Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
