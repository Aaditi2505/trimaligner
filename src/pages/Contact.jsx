import React, { useState, useEffect } from 'react';
import { Phone, Mail, Send, Globe, ChevronDown, ChevronUp, CheckCircle2, X } from 'lucide-react';

const Contact = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    labType: 'lab',
    dailyVolume: '50to150'
  });

  const [faqActive, setFaqActive] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handlePrevStep = () => {
    setFormStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`New Inquiry from ${formData.name} - TrimAligner`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Facility Type: ${formData.labType}
Daily Volume: ${formData.dailyVolume}

Message:
${formData.message}
    `);
    
    const officialEmail = "info@trimaligner.com"; 
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = `mailto:${officialEmail}?subject=${subject}&body=${body}`;
    } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${officialEmail}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }
  };

  const toggleFaq = (index) => {
    setFaqActive(faqActive === index ? null : index);
  };

  const faqData = [
    { q: "What file formats does the software support?", a: "TrimBase supports standard open STL, OBJ, and PLY formats exported from any 3d aligner planning software" },
    { q: "How long does a typical trimming cycle take?", a: "The physical TRIM cutter device routes the contour path in approximately 1.3 minutes per aligner shell." },
    { q: "What is the warranty and support coverage?", a: "TRIM includes a standard 2-year parts and labor warranty. We also provide direct video servicing support and ship a temporary replacement machine during service windows to ensure minimal downtime." },
    { q: "Can we design custom fixtures for robotic operations?", a: "Yes. Our engineering division works with clinics and larger production labs to create customized clamping brackets suited for multi-unit automated robotic lines." }
  ];



  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3.5rem' }}>
      
      {/* Header section */}
      <section className="section section-bg" style={{ paddingBottom: '4.5rem', paddingTop: '2.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge">Get in Touch</span>
          <h1 className="heading-1" style={{ marginBottom: '1.25rem' }}>
            Connect with <span>Our Global Team</span>
          </h1>
          <p className="text-lg" style={{ maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
            Whether you have technical questions about our trim solutions, software integrations, or want to explore partnership portfolios, we are here to support.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-2 reveal" style={{ alignItems: 'flex-start', gap: '4.5rem' }}>
            
            {/* Contact Information & Dealers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              


              {/* Dealers */}
              <div>
                <h2 className="heading-2" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '2.1rem' }}>
                  <Globe size={28} style={{ color: 'var(--accent)' }} /> Authorized <span>Dealers</span>
                </h2>
                
                <div className="glass-card" style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  background: 'rgba(244, 246, 250, 0.4)',
                  border: '1px dashed rgba(9, 13, 22, 0.1)',
                  borderRadius: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Globe size={32} style={{ color: 'var(--text-muted)', opacity: 0.5, marginBottom: '0.5rem' }} />
                  <h4 style={{ fontWeight: '600', fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                    Dealers List Coming Soon
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, fontWeight: '300', maxWidth: '320px', lineHeight: '1.6' }}>
                    We are currently expanding our global distribution network. Please contact our main support desk for sales inquiry routings.
                  </p>
                </div>
              </div>

            </div>

            {/* Contact Form Container */}
            <div 
              className="glass-card" 
              style={{ 
                background: '#ffffff', 
                boxShadow: 'var(--shadow-lg)', 
                border: '1px solid var(--border-color)',
                padding: '3rem 2.5rem',
                flexGrow: 1
              }}
            >
              <div className="form-step-indicator">
                <div className={`form-step-dot ${formStep === 1 ? 'active' : ''}`}></div>
                <div className={`form-step-dot ${formStep === 2 ? 'active' : ''}`}></div>
              </div>

              <h2 className="heading-2" style={{ marginBottom: '0.5rem', fontSize: '2.1rem' }}>
                Inquiry <span>Portal</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: '300', fontSize: '1rem', lineHeight: '1.6' }}>
                {formStep === 1 
                  ? "Configure your clinical layout so we can route you to the correct engineering specialist." 
                  : "Provide your professional contact coordinates to finalize the inquiry request."}
              </p>
              
              <form onSubmit={formStep === 1 ? handleNextStep : handleSubmit}>
                {formStep === 1 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label">Facility Classification</label>
                      <select 
                        name="labType" 
                        value={formData.labType} 
                        onChange={handleChange} 
                        className="form-input" 
                        style={{ background: 'rgba(250, 249, 246, 0.5)' }}
                      >
                        <option value="lab">Commercial Dental Laboratory</option>
                        <option value="clinic">In-Office Orthodontic Clinic</option>
                        <option value="other">Institutional / Research Partner</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Daily Aligner Output</label>
                      <select 
                        name="dailyVolume" 
                        value={formData.dailyVolume} 
                        onChange={handleChange} 
                        className="form-input"
                        style={{ background: 'rgba(250, 249, 246, 0.5)' }}
                      >
                        <option value="under50">Less than 50 aligners / day</option>
                        <option value="50to150">50 to 150 aligners / day</option>
                        <option value="over150">More than 150 aligners / day</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ width: '100%', padding: '1.1rem', marginTop: '1rem' }}
                    >
                      Next Step: Contact Coordinates
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div className="grid-2" style={{ gap: '1.25rem', gridTemplateColumns: '1fr 1fr' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className="form-input" 
                          required 
                          placeholder="Dr. John Doe" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company / Lab</label>
                        <input 
                          type="text" 
                          name="company" 
                          value={formData.company} 
                          onChange={handleChange} 
                          className="form-input" 
                          placeholder="Apex Ortho Lab" 
                        />
                      </div>
                    </div>

                    <div className="grid-2" style={{ gap: '1.25rem', gridTemplateColumns: '1fr 1fr' }}>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className="form-input" 
                          required 
                          placeholder="doctor@ortho.com" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="form-input" 
                          required 
                          placeholder="+1 (555) 000-0000" 
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                      <label className="form-label">Message Details</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        className="form-textarea" 
                        required 
                        placeholder="Detail any specific software setups or custom fixture specifications..."
                      ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="btn btn-outline" 
                        style={{ flex: 1, padding: '1.1rem' }}
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ flex: 2, padding: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}
                      >
                        <Send size={18} />
                        Send to Gmail
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Collapsible FAQ Section */}
      <section className="section section-bg" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
            <span className="badge">Integration FAQ</span>
            <h2 className="heading-2">
              Frequently Asked <span>Questions</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="reveal">
            {faqData.map((faq, idx) => {
              const isActive = faqActive === idx;
              return (
                <div key={idx} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button 
                    onClick={() => toggleFaq(idx)} 
                    className="faq-header"
                  >
                    <span>{faq.q}</span>
                    {isActive ? <ChevronUp size={18} style={{ color: 'var(--primary)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                  </button>
                  <div className="faq-content">
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Contact;
