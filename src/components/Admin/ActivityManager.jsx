import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast'; 
import { Trash2, Plus, Link as LinkIcon, FileText } from 'lucide-react';
import styles from './ActivityManager.module.css';

const ActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ title: '', description: '', image: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "activities"), orderBy("title", "asc"));
      const snapshot = await getDocs(q);
      setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newActivity.title || !newActivity.image) {
      toast.error("Please fill in the title and image URL");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "activities"), {
        ...newActivity,
        createdAt: new Date()
      });
      setNewActivity({ title: '', description: '', image: '' });
      fetchData(); 
      toast.success("Activity added successfully!");
    } catch (error) {
      toast.error("Failed to add activity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "activities", id));
      fetchData();
      toast.success("Activity deleted");
    } catch (error) {
      toast.error("Could not delete activity");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={styles.header}>
        <h3>Activity Management</h3>
        <p>Create and manage school adventure activities</p>
      </div>

      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.inputGrid}>
          <div className={styles.inputField}>
            <FileText size={18} className={styles.icon} />
            <input 
              placeholder="Activity Title" 
              value={newActivity.title} 
              onChange={e => setNewActivity({...newActivity, title: e.target.value})} 
            />
          </div>
          <div className={styles.inputField}>
            <LinkIcon size={18} className={styles.icon} />
            <input 
              placeholder="Image URL" 
              value={newActivity.image} 
              onChange={e => setNewActivity({...newActivity, image: e.target.value})} 
            />
          </div>
        </div>

        <textarea 
          className={styles.textArea}
          placeholder="Description of the activity..." 
          value={newActivity.description} 
          onChange={e => setNewActivity({...newActivity, description: e.target.value})} 
          rows="3"
        />
        
        <button type="submit" className={styles.addBtn} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : <><Plus size={18} /> Add Activity</>}
        </button>
      </form>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Activity Title</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt="" className={styles.thumb} />
                </td>
                <td className={styles.titleText}>{item.title}</td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className={styles.deleteBtn}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {activities.length === 0 && <p className={styles.emptyMsg}>No activities found.</p>}
      </div>
    </div>
  );
};

export default ActivityManager;