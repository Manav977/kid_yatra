import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Trash2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import styles from './Admin.module.css';

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState({ url: '', alt: '' });
  const [isAdding, setIsAdding] = useState(false);

  // Fetch Gallery Data
  const fetchGallery = async () => {
    setLoading(true);
    try {
      // Collection name must be exactly "gallery" in Firebase
      const snapshot = await getDocs(collection(db, "gallery"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setImages(data);
    } catch (error) {
      console.error("Gallery Fetch Error:", error);
      toast.error("Failed to load gallery data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchGallery(); 
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newImage.url) {
      toast.error("Please provide an image URL");
      return;
    }

    setIsAdding(true);
    try {
      await addDoc(collection(db, "gallery"), {
        url: newImage.url,
        alt: newImage.alt || "Gallery Image",
        createdAt: new Date()
      });
      setNewImage({ url: '', alt: '' });
      fetchGallery();
      toast.success("Image added successfully!");
    } catch (error) {
      toast.error("Error adding image");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "gallery", id));
      setImages(prev => prev.filter(img => img.id !== id));
      toast.success("Image removed");
    } catch (error) {
      toast.error("Error deleting image");
    }
  };

  return (
    <div className={styles.managerContainer}>
      <Toaster position="top-center" />

      <div className={styles.managerHeader}>
        <h3>Gallery Manager</h3>
        <p>Manage your website photos</p>
      </div>

      <form onSubmit={handleAdd} className={styles.adminForm}>
        <div className={styles.urlInputGroup}>
          <LinkIcon size={18} className={styles.linkIcon} />
          <input 
            placeholder="Image URL" 
            value={newImage.url} 
            onChange={e => setNewImage({...newImage, url: e.target.value})} 
          />
        </div>
        <div className={styles.urlInputGroup}>
          <ImageIcon size={18} className={styles.linkIcon} />
          <input 
            placeholder="Alt Text" 
            value={newImage.alt} 
            onChange={e => setNewImage({...newImage, alt: e.target.value})} 
          />
        </div>
        <button type="submit" className={styles.addBtn} disabled={isAdding}>
          {isAdding ? "Saving..." : <><Plus size={18} /> Add to Gallery</>}
        </button>
      </form>

      <div className={styles.listSection}>
        <h4>Current Gallery ({images.length})</h4>
        {loading ? (
          <p>Loading gallery...</p>
        ) : (
          <div className={styles.galleryPreviewGrid}>
            {images.map(img => (
              <div key={img.id} className={styles.previewCard}>
                <img src={img.url } alt={img.alt} />
                <button onClick={() => handleDelete(img.id)} className={styles.deleteBtn}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {!loading && images.length === 0 && <p className={styles.comingSoon}>No images found in database.</p>}
      </div>
    </div>
  );
};

export default GalleryManager;