import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Admin from './components/Admin/Admin'; // Admin Page import
import Login from './components/Admin/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Website Route */}
          <Route path="/" element={
            <>
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
            </>
          } />

          {/* Admin Panel Route */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;