import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/trim" className="logo">
          {/* Logo with matching clean design styling */}
          <img 
            src="/image.png" 
            alt="TrimAligner" 
            style={{ 
              height: '52px', 
              objectFit: 'contain',
              filter: 'contrast(1.05) brightness(0.95)'
            }} 
          />
        </Link>
        
        <div className="nav-links">
          <NavLink 
            to="/trim" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Trim
          </NavLink>
          <NavLink 
            to="/software" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Software
          </NavLink>
          <NavLink 
            to="/buynow" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Buy Now
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
