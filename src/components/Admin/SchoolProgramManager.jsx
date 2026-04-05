import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SchoolProgrammanager.module.css';

const SchoolProgramManager = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newProgram, setNewProgram] = useState({ 
    title: '', duration: '', price: '', description: '', imageUrl: '' 
  });

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "programs"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrograms(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProgram.title || !newProgram.imageUrl ) {
      toast.error("Title and Image URL are required!");
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, "programs"), {
        ...newProgram,
        createdAt: new Date()
      });
      setNewProgram({ title: '', duration: '', price: '', description: '', imageUrl: '' });
      fetchPrograms(); 
      toast.success("Program saved successfully!");
    } catch (error) {
      toast.error("Could not save program.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "programs", id));
      setPrograms(prev => prev.filter(p => p.id !== id));
      toast.success("Program deleted");
    } catch (error) {
      toast.error("Failed to delete program");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />

      <div className={styles.header}>
        <h3>School Program Manager</h3>
        <p>Manage and add adventure programs for schools.</p>
      </div>

      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.inputGrid}>
          <input 
            placeholder="Program Title" 
            value={newProgram.title} 
            onChange={e => setNewProgram({...newProgram, title: e.target.value})} 
          />
          <input 
            placeholder="Duration (e.g. 1 Day)" 
            value={newProgram.duration} 
            onChange={e => setNewProgram({...newProgram, duration: e.target.value})} 
          />
          <input 
            placeholder="Price (₹)" 
            value={newProgram.price} 
            onChange={e => setNewProgram({...newProgram, price: e.target.value})} 
          />
        </div>

        <div className={styles.urlInput}>
          <LinkIcon size={18} color="#FF6B35" />
          <input 
            placeholder="Paste Image URL here..." 
            value={newProgram.imageUrl} 
            onChange={e => setNewProgram({...newProgram, imageUrl: e.target.value})} 
          />
        </div>

        <textarea 
          placeholder="Description" 
          value={newProgram.description} 
          onChange={e => setNewProgram({...newProgram, description: e.target.value})} 
        />

        <button type="submit" className={styles.addBtn} disabled={isSaving}>
          {isSaving ? "Saving..." : <><Plus size={18} /> Save Program</>}
        </button>
      </form>

      <div className={styles.listSection}>
        <h4>Live Programs ({programs.length})</h4>
        {loading ? (
          <p>Loading programs...</p>
        ) : (
          <div className={styles.programGrid}>
            {programs.map(item => (
              <div key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={item.imageUrl || item.image} alt={item.title} className={styles.cardImage} />
                  <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className={styles.cardContent}>
                  <h5>{item.title}</h5>
                  <p>{item.duration} | ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolProgramManager;