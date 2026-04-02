import React from 'react';
import "./App.css";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Activities } from './components/Activity/Activities';
import { SchoolPrograms } from './components/Program/SchoolPrograms';
import { Gallery } from './components/Activity/Gallery';
import { Safety } from './components/Program/Safety';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Contact/Footer';

// Components


/**
 * Main Application Component
 * Renders the single-page layout for Kid Yatra
 */
function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Activities />
        <SchoolPrograms />
        <Gallery />
        <Safety />
        <Contact />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;