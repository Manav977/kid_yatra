import React from 'react';
import { db } from './firebaseConfig'; // Check karein aapka config file path sahi ho
import { collection, addDoc } from "firebase/firestore";
import { activities, galleryImages, schoolPrograms } from './src/mock'; // Aapka mock data

const UploadData = () => {
  const uploadToFirebase = async () => {
    try {
      console.log("Uploading started...");

      // 1. Activities Upload
      for (const item of activities) {
        await addDoc(collection(db, "activities"), {
          title: item.title,
          description: item.description,
          image: item.image
        });
      }

      // 2. Gallery Upload
      for (const img of galleryImages) {
        await addDoc(collection(db, "gallery"), {
          url: img.url,
          alt: img.alt
        });
      }

      // 3. School Programs Upload
      for (const program of schoolPrograms) {
        await addDoc(collection(db, "programs"), {
          title: program.title,
          description: program.description,
          image: program.image
        });
      }

      alert("Mubarak ho! Saara data Firebase mein upload ho gaya.");
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("Kuch gadbad ho gayi, console check karein.");
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Firebase Data Importer</h1>
      <button 
        onClick={uploadToFirebase}
        style={{ padding: '15px 30px', background: '#FF6B35', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem', borderRadius: '8px' }}
      >
        Click to Upload All Mock Data
      </button>
    </div>
  );
};

export default UploadData;