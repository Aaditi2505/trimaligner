import React, { useRef, useState, useEffect } from 'react';
import { Layers, Monitor, Cpu, Code, Settings, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const SoftwareImageSlider = ({ images, prefix = "Interface" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2800);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleNext = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFadeState('fade-in');
    }, 200);
  };

  const handlePrev = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setFadeState('fade-in');
    }, 200);
  };

  return (
    <div
      className="mockup-window"
      style={{
        position: 'relative',
        height: '100%',
        minHeight: '560px',
        borderRadius: '1.5rem',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(9, 13, 22, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(9, 13, 22, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Editor/Window Header (macOS style Light theme) */}
      <div style={{
        height: '44px',
        background: '#f4f6fa',
        borderBottom: '1px solid rgba(9, 13, 22, 0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.25rem',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        {/* Window controls */}
        <div style={{ display: 'flex', gap: '0.45rem' }}>
          <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f' }}></div>
        </div>
        {/* Window Title */}
        <div style={{ fontSize: '0.75rem', color: '#566270', letterSpacing: '0.05em', fontWeight: '600' }}>
          {prefix} Active Viewport - Frame {currentIndex + 1}
        </div>
        {/* Right side spacer */}
        <div style={{ width: '45px' }}></div>
      </div>

      {/* Main Viewport Workspace */}
      <div style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative'
      }}>
        
        {/* Slide Image */}
        <img
          src={images[currentIndex]}
          alt={`${prefix} screenshot ${currentIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '460px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            opacity: fadeState === 'fade-in' ? 1 : 0,
            transform: fadeState === 'fade-in' ? 'scale(1)' : 'scale(0.98)',
            transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
            borderRadius: '0.5rem',
            display: 'block'
          }}
        />

        {/* Navigation Buttons (Left/Right Arrows - Light theme styled) */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(9, 13, 22, 0.08)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(9, 13, 22, 0.08)',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
            e.currentTarget.querySelector('svg').style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.querySelector('svg').style.color = 'var(--text-main)';
          }}
          aria-label="Previous screenshot"
        >
          <ChevronLeft size={18} style={{ color: 'var(--text-main)', margin: '0 auto', transition: 'color 0.2s' }} />
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(9, 13, 22, 0.08)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(9, 13, 22, 0.08)',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
            e.currentTarget.querySelector('svg').style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.querySelector('svg').style.color = 'var(--text-main)';
          }}
          aria-label="Next screenshot"
        >
          <ChevronRight size={18} style={{ color: 'var(--text-main)', margin: '0 auto', transition: 'color 0.2s' }} />
        </button>
      </div>

      {/* Editor Status Bar / Dot Indicator */}
      <div
        style={{
          height: '42px',
          background: '#f4f6fa',
          borderTop: '1px solid rgba(9, 13, 22, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          flexShrink: 0
        }}
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setFadeState('fade-out');
              setTimeout(() => {
                setCurrentIndex(idx);
                setFadeState('fade-in');
              }, 200);
            }}
            style={{
              width: idx === currentIndex ? '24px' : '7px',
              height: '7px',
              borderRadius: '9999px',
              backgroundColor: idx === currentIndex ? 'var(--accent)' : 'rgba(9, 13, 22, 0.15)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};



const Software = () => {
  const trimBaseRef = useRef(null);
  const trimCamRef = useRef(null);

  const [activeSection, setActiveSection] = useState('trimbase');

  // Scroll reveal observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref, sectionName) => {
    setActiveSection(sectionName);
    if (ref.current) {
      const yOffset = -110; // Offset for navbar
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const trimBaseImages = [
    '/image_copy_3.png',
    '/image_copy_4.png',
    '/image_copy_5.png',
    '/image_copy_6.png',
    '/image_copy_7.png',
    '/image_copy_8.png'
  ];

  const trimCamImages = [
    '/image_copy_9.png',
    '/image_copy_10.png',
    '/image_copy_11.png',
    '/image_copy_12.png',
    '/image_copy_13.png'
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
      
      {/* Switcher Buttons Header */}
      <section className="section section-bg" style={{ paddingBottom: '3.5rem', paddingTop: '2.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="heading-1" style={{ 
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '2.2rem' }}>THE</span>
            <img 
              src="/image.png" 
              alt="Trim" 
              style={{ 
                height: '3.2rem', 
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <span style={{ fontSize: '2.2rem' }}>SOFTWARE</span>
          </h1>
          
          <div className="image-btn-container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <button
                onClick={() => scrollToSection(trimBaseRef, 'trimbase')}
                className={`image-btn ${activeSection === 'trimbase' ? 'active' : ''}`}
                aria-label="Scroll to TrimBase details"
                style={{ display: 'flex', flexDirection: 'column', height: '240px', width: '320px', padding: '1rem', alignItems: 'center', justifyContent: 'center' }}
              >
                <img src="/trimbase_monitor.png" alt="Trim Base Preview" style={{ height: '200px', width: '100%', objectFit: 'contain' }} />
              </button>
              <span style={{ fontSize: '1.25rem', fontWeight: '600', color: activeSection === 'trimbase' ? 'var(--primary)' : 'var(--text-muted)' }}>TrimBase</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <button
                onClick={() => scrollToSection(trimCamRef, 'trimcam')}
                className={`image-btn ${activeSection === 'trimcam' ? 'active' : ''}`}
                aria-label="Scroll to TrimCAM details"
                style={{ display: 'flex', flexDirection: 'column', height: '240px', width: '320px', padding: '1rem', alignItems: 'center', justifyContent: 'center' }}
              >
                <img src="/trimcam_monitor.png" alt="Trim CAM Preview" style={{ height: '200px', width: '100%', objectFit: 'contain' }} />
              </button>
              <span style={{ fontSize: '1.25rem', fontWeight: '600', color: activeSection === 'trimcam' ? 'var(--primary)' : 'var(--text-muted)' }}>TrimCam</span>
            </div>
          </div>
        </div>
      </section>

      {/* TrimBase Section */}
      <section ref={trimBaseRef} className="section">
        <div className="container">
          <div className="grid-2 reveal">
            
            <div style={{ paddingRight: '1rem' }}>
              <img
                src="/image_copy_14.png"
                alt="TrimBase Logo"
                style={{
                  height: '80px',
                  objectFit: 'contain',
                  marginBottom: '1.5rem',
                  display: 'block'
                }}
              />
              <span className="badge badge-accent">Model Setup Software</span>
              <h3 className="heading-3" style={{ fontSize: '2.1rem', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                Proprietary Fixture for Robotic Trimming
              </h3>
              <p className="text-lg" style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                TrimBase is an advanced software solution designed for automated aligner model trimming by efficiently adding customizable fixtures to dental models in batch, built for seamless integration with physical TRIM cutting systems.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.8', fontWeight: '300' }}>
                The software features powerful boolean functions for reliable mesh operations, ensuring clean and precise fixture adaptation even on complex models. With its batch processing capability, users can handle large volumes of aligner models with minimal effort, significantly improving productivity in dental labs and manufacturing environments.
              </p>

              {/* Feature Grid */}
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Layers style={{ color: 'var(--accent)' }} size={24} />
                  <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)' }}>Batch Processing</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '300' }}>Process hundreds of models concurrently with single-click algorithms.</p>
                </div>
                <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Cpu style={{ color: 'var(--accent)' }} size={24} />
                  <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)' }}>Voxel Clearing</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '300' }}>Robust voxelized Boolean operators that handle complex hollow models.</p>
                </div>
              </div>
            </div>

            <div>
              <SoftwareImageSlider images={trimBaseImages} prefix="TrimBase" />
            </div>
          </div>
        </div>
      </section>

      {/* TrimCam Section */}
      <section ref={trimCamRef} className="section section-bg" style={{ paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2 reveal">
            
            {/* Slider shows first to switch columns on large screens */}
            <div style={{ order: window.innerWidth > 768 ? 1 : 2 }}>
              <SoftwareImageSlider images={trimCamImages} prefix="TrimCam" />
            </div>

            <div style={{ order: window.innerWidth > 768 ? 2 : 1, paddingLeft: '1rem' }}>
              <img
                src="/image_copy_15.png"
                alt="TrimCam Logo"
                style={{
                  height: '80px',
                  objectFit: 'contain',
                  marginBottom: '1.5rem',
                  display: 'block'
                }}
              />
              <span className="badge">CAM Generation Engine</span>
              <h3 className="heading-3" style={{ fontSize: '2.1rem', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                Intelligent Spline and Toolpath Routing
              </h3>
              <p className="text-lg" style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                TrimCam takes the prepared dental model data from TrimBase and calculates optimized G-code toolpaths for our high-precision cutting trim systems.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.8', fontWeight: '300' }}>
                It features high-precision Iso-Contour spline extraction methods, allowing users to define perfect gingival margins. With real-time Z-height adjustment synchronization and directional control, it delivers a smooth cutting boundary without chipping or operator adjustments.
              </p>

              {/* Feature Grid */}
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#ffffff' }}>
                  <Code style={{ color: 'var(--primary)' }} size={24} />
                  <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)' }}>Spline Extraction</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '300' }}>High-fidelity margin line tracing with built-in path smoothers.</p>
                </div>
                <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#ffffff' }}>
                  <Settings style={{ color: 'var(--primary)' }} size={24} />
                  <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)' }}>Interactive CAM Engine</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '300' }}>Pre-loaded router configurations for 4-axis mill cutting feeds.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="section reveal" style={{ textAlign: 'center', paddingTop: 0 }}>
        <div className="container" style={{
          background: 'var(--bg-secondary)',
          borderRadius: '2rem',
          padding: '5rem 2rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span className="badge">Schedule a Trial</span>
          <h2 className="heading-2" style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
            Ready to Upgrade Your <span>Lab Workflow</span>?
          </h2>
          <p className="text-lg" style={{ marginBottom: '2.5rem', maxWidth: '580px', margin: '0 auto 2.5rem' }}>
            Contact our engineering team today for a live interactive demonstration of TrimBase and TrimCam.
          </p>
          <a href="/contact" className="btn btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem' }}>
            Request Demo Session
          </a>
        </div>
      </section>
    </div>
  );
};

export default Software;
