import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, ChevronRight, Disc } from 'lucide-react';

const Trim = () => {
  const steps = [
    {
      title: "Model prep",
      desc: "Export models and clear aligner from your existing aligner design software.",
      image: "/step_1.png"
    },
    {
      title: "TrimBase",
      desc: "Upload it in TrimBase and create fixtures for all models.",
      image: "/step_2.png"
    },
    {
      title: "3D Print",
      desc: "Print the models with fixture in your 3D printer.",
      image: "/step_3.png"
    },
    {
      title: "Thermoform",
      desc: "Vacuum form the printed models.",
      image: "/step_4.png"
    },
    {
      title: "Trim Aligner",
      desc: "Place models on the machine and use trimCAM to generate NC code and trim the aligners.",
      image: "/step_5.png"
    }
  ];

  // Active step state for the 5-step interactive workflow
  const [activeStep, setActiveStep] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  // States for system Intro image slider (auto-rotating mockup window)
  const introImages = ["/intro_slide_1.png", "/intro_slide_2.png", "/intro_slide_3.png", "/intro_slide_4.png"];
  const [introImageIndex, setIntroImageIndex] = useState(0);
  const [introFadeState, setIntroFadeState] = useState('fade-in');

  // States for system Specifications image slider (auto-rotating spec section)
  const specImages = ["/teeth_model_1.png", "/teeth_model_2.png", "/teeth_model_3.png"];
  const [specImageIndex, setSpecImageIndex] = useState(0);
  const [specFadeState, setSpecFadeState] = useState('fade-in');

  // States for Time Savings Calculator
  const [calcVolume, setCalcVolume] = useState(10);
  const [manualTrimTime, setManualTrimTime] = useState(4);
  const trimTime = 1.2;

  // Computations
  const annualWorkingDays = 250;
  const timeSavedPerAligner = Math.max(0, manualTrimTime - trimTime);
  const timeSavedPerDayMinutes = calcVolume * timeSavedPerAligner;
  const timeSavedPerYearMinutes = timeSavedPerDayMinutes * annualWorkingDays;

  const handleStepChange = (index) => {
    setFadeState('fade-out');
    setTimeout(() => {
      setActiveStep(index);
      setFadeState('fade-in');
    }, 200);
  };

  // Auto-switch steps every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextStep = (activeStep + 1) % steps.length;
      handleStepChange(nextStep);
    }, 2000);
    return () => clearInterval(timer);
  }, [activeStep]);

  // Auto-switch mockup system images every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIntroFadeState('fade-out');
      setTimeout(() => {
        setIntroImageIndex((prev) => (prev + 1) % introImages.length);
        setIntroFadeState('fade-in');
      }, 200);
    }, 2000);
    return () => clearInterval(timer);
  }, [introImages.length]);

  // Auto-switch specifications images every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSpecFadeState('fade-out');
      setTimeout(() => {
        setSpecImageIndex((prev) => (prev + 1) % specImages.length);
        setSpecFadeState('fade-in');
      }, 200);
    }, 2000);
    return () => clearInterval(timer);
  }, [specImages.length]);

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

  return (
    <div className="animate-fade-in" style={{ overflow: 'hidden' }}>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="grid-2 hero-grid">
            
            {/* Left side text & specs */}
            <div className="hero-content reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                
                <h1 className="heading-1" style={{ marginBottom: '1.25rem', fontWeight: '400', fontSize: '3rem' }}>
                  The final manual step in <span>Aligner Manufacturing</span> is now automated and accessible to everyone
                </h1>
                
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <a href="#workflow" className="btn btn-primary">
                    Explore Workflow
                  </a>
                  <Link to="/buynow#download-specs" className="btn btn-outline">
                    <PlayCircle size={18} />
                    Specifications
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Video Player */}
            <div className="reveal" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="image-frame" style={{
                width: '100%',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-color)',
                aspectRatio: '4/3',
                background: '#090d16',
                position: 'relative'
              }}>
                <video 
                  autoPlay
                  muted
                  playsInline
                  controls 
                  poster="/clear_aligner_product.png"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                  <source src="/trim_in_action_super_fast.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="grid-2 reveal intro-grid">
            <div>
              {/* macOS style Window mockup container (Light/White Theme) */}
              <div style={{
                position: 'relative',
                height: '100%',
                minHeight: '560px', // Increased height
                borderRadius: '1.5rem',
                backgroundColor: '#ffffff', // White background
                border: '1px solid rgba(9, 13, 22, 0.08)',
                boxShadow: '0 25px 50px -12px rgba(9, 13, 22, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                {/* Header (Light Theme) */}
                <div style={{
                  height: '42px',
                  background: '#f4f6fa',
                  borderBottom: '1px solid rgba(9, 13, 22, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.25rem',
                  justifyContent: 'space-between',
                  flexShrink: 0
                }}>
                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#566270', letterSpacing: '0.05em', fontWeight: '600' }}>
                    Trim Automation System
                  </div>
                  <div style={{ width: '45px' }}></div>
                </div>

                {/* Viewport content */}
                <div style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  position: 'relative'
                }}>
                  <img 
                    src={introImages[introImageIndex]} 
                    alt="Trim Automated Trimmer"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '480px', // Increased image size
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '0.5rem',
                      display: 'block',
                      opacity: introFadeState === 'fade-in' ? 1 : 0,
                      transform: introFadeState === 'fade-in' ? 'scale(1)' : 'scale(0.98)',
                      transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out'
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              
              <h2 className="heading-2">
                Automating the <span>Final Frontier</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                For years, aligner manufacturing has advanced through automation in design, treatment planning, and thermoforming — yet the final trimming process remained heavily manual, time-consuming, and operator-dependent. 
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                While automated aligner trimmers already exist, most systems are extremely expensive, closed ecosystems that are often limited to specific aligner design software platforms — making them impractical for many in-house aligner manufacturers.

TRIM breaks these barriers with a completely open workflow approach.

Use the aligner design software of your choice — our team works with you to optimize the trimming workflow for your specific production setup through custom fixture designs, workflow adaptation, and software integration support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 5-Step Process Flow Section (Replaces Video Placeholder) */}
      <section id="workflow" className="section section-contrast" style={{ position: 'relative' }}>
        {/* Decorative subtle texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 80% 20%, rgba(26, 86, 219, 0.08), transparent 50%)', pointerEvents: 'none' }}></div>
        
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }} className="reveal">
            
            <h2 className="heading-2" style={{ 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.4rem',
              flexWrap: 'wrap',
              marginBottom: '1.25rem'
            }}>
              <img 
                src="/image.png" 
                alt="Trim" 
                style={{ 
                  height: '3.9rem', 
                  objectFit: 'contain',
                  transform: 'translateY(1px)'
                }} 
              />
              <span style={{ fontSize: '2.1rem' }}>Workflow</span>
            </h2>
            <p className="text-lg" style={{ color: '#a3b0ac', maxWidth: '650px', margin: '0 auto' }}>
               Standard workflow for aligner  design softwares without built-in robotic trimming module
            </p>
          </div>

          <div className="grid-2 reveal" style={{ gap: '4rem', alignItems: 'stretch' }}>
            
            {/* Left Column: Interactive Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <div
                    key={idx}
                    onClick={() => handleStepChange(idx)}
                    style={{
                      padding: '1.5rem 1.75rem',
                      borderRadius: '1.25rem',
                      border: `1px solid ${isActive ? 'var(--accent)' : 'rgba(229, 231, 235, 0.08)'}`,
                      background: isActive ? 'rgba(26, 86, 219, 0.06)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = 'rgba(26, 86, 219, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.08)';
                    }}
                  >
                    {/* Index Indicator */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                      color: isActive ? 'var(--bg-contrast)' : '#d1d8d5',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease-in-out'
                    }}>
                      {idx + 1}
                    </div>

                    {/* Step Title */}
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ color: isActive ? '#ffffff' : '#d1d8d5', fontSize: '1.1rem', fontWeight: '600', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {step.title}
                        {isActive && <Disc size={14} className="animate-spin" style={{ color: 'var(--accent)', animation: 'spin 4s linear infinite' }} />}
                      </h4>
                    </div>

                    <ChevronRight size={18} style={{ color: isActive ? 'var(--accent)' : '#5E6460', transform: isActive ? 'translateX(3px)' : 'none', transition: 'all 0.3s' }} />
                  </div>
                );
              })}
            </div>

            {/* Right Column: Serialized Image Panel with Pop-Out Details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div 
                className="image-frame" 
                style={{ 
                  borderColor: 'rgba(229, 231, 235, 0.15)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                  background: 'rgba(9, 13, 22, 0.6)',
                  padding: '1.25rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                  minHeight: '420px'
                }}
              >
                {/* Step Image */}
                <div style={{ overflow: 'hidden', borderRadius: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0f0d' }}>
                  <img
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '320px',
                      objectFit: 'contain',
                      opacity: fadeState === 'fade-in' ? 1 : 0,
                      transform: fadeState === 'fade-in' ? 'scale(1)' : 'scale(0.98)',
                      transition: 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Pop-Out Explanatory Content Overlay Card */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  opacity: fadeState === 'fade-in' ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em' }}>
                    Process Step Details
                  </span>
                  <p style={{ color: '#d1d8d5', fontSize: '0.95rem', lineHeight: '1.6', marginTop: '0.35rem', fontWeight: '300' }}>
                    {steps[activeStep].desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Technical Specifications Grid */}
      <section id="specs" className="section">
        <div className="container">

          
          {/* Engineering Close-Up Details */}
          <div className="grid-2 reveal" style={{ alignItems: 'center' }}>
            <div className="image-frame" style={{ maxHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img 
                src={specImages[specImageIndex]} 
                alt="Close-up Trimming Detail" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'cover',
                  display: 'block',
                  opacity: specFadeState === 'fade-in' ? 1 : 0,
                  transform: specFadeState === 'fade-in' ? 'scale(1)' : 'scale(0.98)',
                  transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out'
                }} 
              />
            </div>
            
            <div style={{ paddingLeft: '1.5rem' }}>
             
              <h3 className="heading-3" style={{ fontSize: '1.8rem', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                START ENGINEERING YOUR TRIMLINE
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.8', fontWeight: '300' }}>
                 Trimline geometry is often treated as a cosmetic or manufacturing parameter. In reality, trimline geometry is one of the most influential biomechanical variables in the entire aligner system.
              </p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></div>
                  Start using customized localized geometry
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, paddingLeft: '1.5rem' }}>
                  {[
                    'Directional stiffness tuning',
                    'Selective retention',
                    'Controlled flexibility'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem', fontWeight: '400', color: 'var(--text-muted)' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(26, 86, 219, 0.5)', flexShrink: 0 }}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Savings & Time Savings Calculator */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }} className="reveal">
            <h2 className="heading-2">
              Calculate Your <span>Time Savings</span>
            </h2>
            <p className="text-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Drag the sliders below to estimate the daily and annual time saved by automating your trimming queue.
            </p>
          </div>

          <div className="grid-2 reveal" style={{ gap: '4rem', alignItems: 'stretch' }}>
            {/* Calculator Sliders */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', background: '#ffffff' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '600' }}>
                  <label htmlFor="volume-slider" style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Daily Aligner Volume</label>
                  <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{calcVolume} aligners</span>
                </div>
                <input 
                  id="volume-slider"
                  type="range" 
                  min="1" 
                  max="500" 
                  step="1"
                  value={calcVolume} 
                  onChange={(e) => setCalcVolume(parseInt(e.target.value))} 
                  className="range-slider" 
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  <span>1</span>
                  <span>500</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '600' }}>
                  <label htmlFor="manual-time-slider" style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Time taken per aligner for manual trimming</label>
                  <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{manualTrimTime} min</span>
                </div>
                <input 
                  id="manual-time-slider"
                  type="range" 
                  min="1" 
                  max="15" 
                  step="0.5"
                  value={manualTrimTime} 
                  onChange={(e) => setManualTrimTime(parseFloat(e.target.value))} 
                  className="range-slider" 
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  <span>1 min</span>
                  <span>15 min</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Time taken per aligner by TRIM</span>
                  <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{trimTime} min</span>
                </div>
              </div>
            </div>

            {/* Calculations Result */}
            <div className="glass-card" style={{ background: 'var(--bg-contrast)', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
              <h3 className="heading-3" style={{ color: '#ffffff', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem', margin: 0 }}>
                Estimated Time Savings
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#b3c0c8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time saved / day</span>
                  <h4 style={{ fontSize: '2rem', color: 'var(--primary-light)', fontWeight: '800', margin: '0.25rem 0 0 0' }}>
                    {timeSavedPerDayMinutes < 60 ? `${timeSavedPerDayMinutes} min` : `${Math.floor(timeSavedPerDayMinutes / 60)} hr ${timeSavedPerDayMinutes % 60} min`}
                  </h4>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#b3c0c8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time saved per year</span>
                  <h4 style={{ fontSize: '2rem', color: 'var(--primary-light)', fontWeight: '800', margin: '0.25rem 0 0 0' }}>
                    {(timeSavedPerYearMinutes / 60).toLocaleString(undefined, { maximumFractionDigits: 1 })} hours
                  </h4>
                  <p style={{ color: '#a3b0ac', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                    Equivalent to ~{Math.round(timeSavedPerYearMinutes / 60 / 8)} full 8-hour working days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Trim;
