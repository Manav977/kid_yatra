import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

// 1. Lazy loading setup
// Named exports ke liye hum promise chaining (.then) use karte hain kyunki lazy() ko default export chahiye hota hai.
const Navbar = lazy(() => import('./components/Navbar').then(module => ({ default: module.Navbar })));
const Hero = lazy(() => import('./components/Hero').then(module => ({ default: module.Hero })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Activities = lazy(() => import('./components/Activity/Activities').then(module => ({ default: module.Activities })));
const SchoolPrograms = lazy(() => import('./components/Program/SchoolPrograms').then(module => ({ default: module.SchoolPrograms })));
const Gallery = lazy(() => import('./components/Activity/Gallery').then(module => ({ default: module.Gallery })));
const Safety = lazy(() => import('./components/Program/Safety').then(module => ({ default: module.Safety })));
const Contact = lazy(() => import('./components/Contact/Contact').then(module => ({ default: module.Contact })));
const Footer = lazy(() => import('./components/Contact/Footer').then(module => ({ default: module.Footer })));

// Default exports ke liye simple lazy() kaam karega
const Admin = lazy(() => import('./components/Admin/Admin'));
const Login = lazy(() => import('./components/Admin/Login'));

// Loading Fallback Component (Aap yahan apna custom spinner bhi laga sakte hain)
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h2>Loading...</h2>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        {/* 2. Wrap everything inside Suspense */}
        <Suspense fallback={<Loader />}>
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

            {/* Admin Panel Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;