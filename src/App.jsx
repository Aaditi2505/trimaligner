import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Trim from './pages/Trim';
import Software from './pages/Software';
import BuyNow from './pages/BuyNow';
import Contact from './pages/Contact';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollManager />
      <Navbar />
      <main style={{ minHeight: '80vh', paddingTop: '130px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/trim" replace />} />
          <Route path="/trim" element={<Trim />} />
          <Route path="/software" element={<Software />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

