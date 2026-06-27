import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <Link to="/trim" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <img 
                src="/image.png" 
                alt="TrimAligner" 
                style={{ 
                  height: '52px', 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(0.95)' // Make the logo look beautiful and white on the dark background
                }} 
              />
            </Link>
            <p style={{ color: '#8c9894', lineHeight: '1.8', fontWeight: '300', fontSize: '0.95rem' }}>
              Advanced dental trim and software solutions for modern aligner manufacturing. Precision meets innovation in every detail.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', color: 'var(--accent)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.85rem' }}>
                <Link to="/trim" style={{ color: '#d1d8d5', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = '#d1d8d5'}>Trim Machine</Link>
              </li>
              <li style={{ marginBottom: '0.85rem' }}>
                <Link to="/software" style={{ color: '#d1d8d5', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = '#d1d8d5'}>Software Solutions</Link>
              </li>
              <li style={{ marginBottom: '0.85rem' }}>
                <Link to="/contact" style={{ color: '#d1d8d5', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = '#d1d8d5'}>Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', color: 'var(--accent)' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1.2rem', display: 'flex', gap: '0.85rem', color: '#d1d8d5', fontSize: '0.95rem', fontWeight: '300' }}>
                <MapPin size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <span>724, Anna Nagar,<br />Madurai, 625020</span>
              </li>
              <li style={{ marginBottom: '1.2rem', display: 'flex', gap: '0.85rem', color: '#d1d8d5', fontSize: '0.95rem', fontWeight: '300', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>+91 90030 44843</span>
              </li>
              <li style={{ marginBottom: '1.2rem', display: 'flex', gap: '0.85rem', color: '#d1d8d5', fontSize: '0.95rem', fontWeight: '300', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>info@trimaligner.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TrimAligner Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
