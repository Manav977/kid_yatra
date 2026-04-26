import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from './Admin.module.css';
import ActivityManager from './ActivityManager';
import GalleryManager from './GalleryManager';
import SchoolProgramManager from './SchoolProgramManager';


const Admin = () => {
  const [activeTab, setActiveTab] = useState('activities');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); // Agar login nahi hai toh home bhej do
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) return <div className={styles.loader}>Checking Permissions...</div>;

  return (
    <div className={styles.adminWrapper}>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Kid Yatra Admin</h2>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
        <ul>
          <li className={activeTab === 'activities' ? styles.active : ''} onClick={() => setActiveTab('activities')}>Activities</li>
          <li className={activeTab === 'gallery' ? styles.active : ''} onClick={() => setActiveTab('gallery')}>Gallery</li>
          <li className={activeTab === 'programs' ? styles.active : ''} onClick={() => setActiveTab('programs')}>Programs</li>
        </ul>
      </nav>
      <main className={styles.mainContent}>
        <section className={styles.contentCard}>
          {activeTab === 'activities' && <ActivityManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'programs' && <SchoolProgramManager />}
        </section>
      </main>
    </div>
  );
};

export default Admin;