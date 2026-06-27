import React, { useState, useEffect } from 'react';
import { Check, Download } from 'lucide-react';

const BuyNow = () => {
  const claimedSlots = 3; // Update this value (1, 2, 3, 4 etc.) to change the slots claimed count out of 100
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll reveal IntersectionObserver
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

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const subject = encodeURIComponent(`New TRIM Quote Request from ${orderForm.name}`);
    const body = encodeURIComponent(`
Name: ${orderForm.name}
Clinic/Lab: ${orderForm.clinicName}
Email: ${orderForm.email}
Phone: ${orderForm.phone}

Special Logistics Notes:
${orderForm.notes || 'None'}
    `);
    
    const officialEmail = "info@trimaligner.com";
    window.location.href = `mailto:${officialEmail}?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setShowOrderModal(false);
      setIsSubmitted(false);
      setOrderForm({ name: '', email: '', phone: '', clinicName: '', notes: '' });
      alert("Order request received! An email draft has been generated to complete your submission.");
    }, 1000);
  };

  const handleChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Page Header */}
      <section className="section section-bg" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge">Premium Automated Solutions</span>
          <h1 className="heading-1" style={{ marginBottom: '1.25rem' }}>
            Bring <span>TRIM</span> to Your Lab
          </h1>
          <p className="text-lg" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: '1.7' }}>
          
          </p>
        </div>
      </section>

      {/* Pricing & Product Packages */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }} className="reveal">
            
            {/* Main Package Card */}
            <div className="glass-card" style={{ 
              maxWidth: '640px', 
              width: '100%', 
              background: '#ffffff', 
              border: '1px solid var(--border-color)', 
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              padding: '3rem',
              borderRadius: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Popular Tag */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'var(--primary)',
                color: '#ffffff',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                COMPLETE SYSTEM
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <h3 className="heading-3" style={{ fontSize: '1.8rem', margin: 0 }}>FOUNDERS EDITION PACKAGE</h3>
                  <div style={{
                    background: 'rgba(26, 86, 219, 0.06)',
                    border: '1px solid rgba(26, 86, 219, 0.2)',
                    color: 'var(--primary)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 2px 4px rgba(26, 86, 219, 0.05)'
                  }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                    <span>{claimedSlots} / 50 Claimed</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '300' }}>The Founders Edition program is designed to help integrate automated aligner trimming into a wide range of real-world aligner production workflows.

Because every lab and clinic uses different aligner design software, production methods, and model handling systems, the first 50 partner labs will receive workflow-focused customization support.
</p>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '3.25rem', fontWeight: '800', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.5 }}>$5,500</span>
                <span style={{ fontSize: '3.25rem', fontWeight: '800', color: 'var(--text-main)' }}>$3,500</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '400' }}>USD / unit</span>
              </div>

              {/* Inclusion List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                {[
                  "TRIM 4-Axis Precision Spline Trimmer Hardware",
                  "Lifetime TrimBase and Trimcam Software Integration License",
                  "2-Year Extended Parts and Labor Warranty",
                  "Fixture and holder optimization",
                  "Workflow adaptation based on existing aligner software",
                                  ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={14} style={{ strokeWidth: '3px' }} />
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '400' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Order Button */}
              <button 
                onClick={() => setShowOrderModal(true)} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1.1rem', fontSize: '1.05rem', display: 'flex', justifyContent: 'center' }}
              >
                Request Purchase Proposal
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Product Catalog / PDF Detail Section */}
      <section id="download-specs" className="section section-bg" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid-2 reveal" style={{ alignItems: 'center', gap: '4.5rem' }}>
            
            {/* Left Column: Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span className="badge">PRODUCT DOCUMENTATION</span>
              <h2 className="heading-2" style={{ margin: 0 }}>
                Download Technical <span>Specifications Catalog</span>
              </h2>
              <p className="text-lg" style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                Get access to the comprehensive system catalog for TRIM. This document covers complete mechanical dimensions, electrical power ratings, vacuum extraction specifications, and software workflow guidelines.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0.5rem 0' }}>
                {[
                  "Detailed 4-axis motion path parameters",
                  "Electrical requirements & active dust extraction setup",
                  "Software workflow compatibility matrices (TrimBase & TrimCam)",
                  "Custom clamping bracket and fixture dimensions"
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      flexShrink: 0
                    }}></div>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '500' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1rem' }}>
                <a 
                  href="/Trim_V1.pdf" 
                  download="Trim_Catalog.pdf"
                  className="btn btn-primary"
                  style={{ padding: '1.1rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                >
                  <Download size={18} />
                  Download Catalog PDF
                </a>
              </div>
            </div>

            {/* Right Column: Image of Trim setup */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="image-frame" style={{
                width: '100%',
                maxWidth: '520px',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-color)'
              }}>
                <img 
                  src="/trim_setup.png" 
                  alt="Trim system workflow setup with laptop and machine" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Order Proposal Modal */}
      {showOrderModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9, 13, 22, 0.6)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card animate-fade-in" style={{
            background: '#ffffff',
            maxWidth: '520px',
            width: '100%',
            position: 'relative',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            padding: '2.5rem'
          }}>
            <button 
              onClick={() => setShowOrderModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '0.25rem'
              }}
            >
              ✕
            </button>

            <h3 className="heading-3" style={{ marginBottom: '0.5rem', fontSize: '1.6rem' }}>Request TRIM Package Quote</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', fontWeight: '300' }}>
              Fill in your professional details below. Our team will prepare a formal sales agreement and shipping quote.
            </p>

            <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Contact Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={orderForm.name} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                  placeholder="Dr. Jenkins" 
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Clinic / Lab Name</label>
                <input 
                  type="text" 
                  name="clinicName" 
                  value={orderForm.clinicName} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                  placeholder="OrthoTech Solutions" 
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={orderForm.email} 
                    onChange={handleChange} 
                    className="form-input" 
                    required 
                    placeholder="name@clinic.com" 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={orderForm.phone} 
                    onChange={handleChange} 
                    className="form-input" 
                    required 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Special Logistics Notes (Optional)</label>
                <textarea 
                  name="notes" 
                  value={orderForm.notes} 
                  onChange={handleChange} 
                  className="form-textarea" 
                  style={{ minHeight: '80px' }}
                  placeholder="E.g., request custom fixture adaptors, robotic setups..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitted}
                style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {isSubmitted ? "Generating Proposal..." : "Submit Quote Request"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BuyNow;
