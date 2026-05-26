import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Smartphone, 
  ShoppingCart, 
  Zap, 
  Search, 
  Target, 
  ShieldCheck, 
  Layout, 
  ArrowRight,
  ArrowLeft,
  Clock,
  ArrowUpRight,
  Paintbrush,
  Sparkles,
  TrendingUp,
  Cpu,
  User,
  Phone,
  Briefcase,
  HelpCircle,
  Check
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/Button';

// --- BACKGROUND COMPONENT (Premium Atmospheric Space) ---
const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, vx: number, vy: number, size: number, color: string }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = window.innerWidth < 768 ? 40 : 100;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          color: Math.random() > 0.8 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(255, 255, 255, 0.3)'
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ambient Glows
      const spotGlow = (x: number, y: number, radius: number, color1: string, color2: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, color1);
        g.addColorStop(1, color2);
        ctx.fillStyle = g;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      spotGlow(canvas.width * 0.8, canvas.height * 0.2, 800, 'rgba(34, 211, 238, 0.03)', 'rgba(0,0,0,0)');
      spotGlow(canvas.width * 0.2, canvas.height * 0.8, 600, 'rgba(50, 50, 150, 0.05)', 'rgba(0,0,0,0)');

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist/100)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

// --- GOOGLE ANALYTICS TRACKING HELPER ---
const trackGAEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'Offer_25k_Wizard',
      ...params
    });
    console.log(`[GA Event Tracked] ${eventName}`, params);
  } else {
    console.log(`[GA Event Skipped - gtag not found] ${eventName}`, params);
  }
};

const WebsiteOffer25k: React.FC = () => {
  const WHATSAPP_PHONE = "917995533838";

  // Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    websiteType: '',
    canInvest: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    businessName: '',
    websiteType: '',
    canInvest: ''
  });

  // Track initial landing page view
  useEffect(() => {
    trackGAEvent('offer_25k_landing_view');
  }, []);

  // Sync current step transitions with Google Analytics
  const handleStepGA = (nextStep: number) => {
    trackGAEvent(`step_${step}_completed`, {
      current_step: step,
      next_step: nextStep,
      form_progress: `${Math.round((step / 5) * 100)}%`
    });
  };

  const handleNextStep = () => {
    // Validation
    if (step === 1) {
      if (!formData.name.trim()) {
        setErrors(prev => ({ ...prev, name: 'Please enter your name.' }));
        return;
      }
      setErrors(prev => ({ ...prev, name: '' }));
    }
    if (step === 2) {
      const cleanedPhone = formData.phone.replace(/\D/g, '');
      if (cleanedPhone.length < 10) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid 10-digit WhatsApp number.' }));
        return;
      }
      setErrors(prev => ({ ...prev, phone: '' }));
    }
    if (step === 3) {
      if (!formData.businessName.trim()) {
        setErrors(prev => ({ ...prev, businessName: 'Please enter your business name.' }));
        return;
      }
      setErrors(prev => ({ ...prev, businessName: '' }));
    }

    handleStepGA(step + 1);
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const selectWebsiteType = (type: string) => {
    setFormData(prev => ({ ...prev, websiteType: type }));
    trackGAEvent('website_type_selected', { type });
    // Slick auto-advance
    trackGAEvent('step_4_completed', { current_step: 4, next_step: 5 });
    setStep(5);
  };

  const selectInvestment = (commitment: string) => {
    setFormData(prev => ({ ...prev, canInvest: commitment }));
    trackGAEvent('investment_commitment_checked', { ready: commitment });
    
    if (commitment === 'No') {
      // Go to Rejection screen (Step 7)
      setStep(7);
      trackGAEvent('form_rejection_shown');
    } else {
      // Advance to final redirect page (Step 6)
      setStep(6);
      triggerWhatsAppRedirect({ ...formData, canInvest: commitment });
    }
  };

  const triggerWhatsAppRedirect = (dataToSubmit: typeof formData) => {
    // Generate text message
    const message = `Hi Frame n Flow Media, I'm interested in the ₹25,000 Premium Website Offer. Here are my details:
- Name: ${dataToSubmit.name}
- WhatsApp: ${dataToSubmit.phone}
- Business Name: ${dataToSubmit.businessName}
- Website Focus: ${dataToSubmit.websiteType}
- Ready to Invest ₹25,000: ${dataToSubmit.canInvest}`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    trackGAEvent('form_submitted_whatsapp_redirect', {
      name: dataToSubmit.name,
      business: dataToSubmit.businessName,
      type: dataToSubmit.websiteType,
      ready_to_invest: dataToSubmit.canInvest
    });

    // Auto redirect after a short transition delay
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 1500);
  };

  const features = [
    { icon: <Paintbrush className="text-accent" />, title: "Standard Website", desc: "For high-ticket local services, luxury portfolios, & elite brand positioning. Structured to close leads instantly." },
    { icon: <ShoppingCart className="text-accent" />, title: "E-Commerce Engine", desc: "Catalog setups, shop pages, and checkout pipelines optimized for domestic conversion." },
    { icon: <Cpu className="text-accent" />, title: "Custom React Build", desc: "Tailored visual assets, modular components, and ultra-high-speed navigation. Zero lag." },
    { icon: <Search className="text-accent" />, title: "SEO Foundation", desc: "Semantic HTML architecture mapped to regional keywords. Google-ready from day one." },
    { icon: <Target className="text-accent" />, title: "Google Analytics (GA4)", desc: "Full event mapping. Track every click, view, scroll, and lead submission dynamically." },
    { icon: <Zap className="text-accent" />, title: "Vitesse Speed optimization", desc: "Lightning fast loads. Every millisecond saved directly retains scrolling prospects." },
    { icon: <ShieldCheck className="text-accent" />, title: "1 Year Performance Hosting", desc: "High-throughput server environment. Fully secure, lightning-fast SSL active 24/7." },
    { icon: <Layout className="text-accent" />, title: "Free Custom Domain", desc: "Your standard brand footprint (.in, .com, or similar) included for the first full year." },
  ];

  const storySteps = [
    { 
      number: "01", 
      title: "Strategic Discovery", 
      desc: "50% commitment. We book a strategy session to outline your competitor landscape, brand typography, and monetization objectives.", 
      icon: <Sparkles className="text-accent" />
    },
    { 
      number: "02", 
      title: "Custom Prototyping", 
      desc: "We engineer the UI/UX architecture from the ground up, utilizing premium glassmorphic tokens and responsive layouts.", 
      icon: <Target className="text-accent" />
    },
    { 
      number: "03", 
      title: "Analytics & SEO Rigging", 
      desc: "We install Google Analytics 4, configure custom events, script conversion triggers, and tune semantic tags for Google indexation.", 
      icon: <Zap className="text-accent" />
    },
    { 
      number: "04", 
      title: "Live Deployment", 
      desc: "Final 50% balance cleared. We configure domain redirects, trigger SSL certificates, and push your high-performance asset live.", 
      icon: <TrendingUp className="text-accent" />
    }
  ];

  const targetBusinesses = [
    "Interior Designers & Architectural Firms",
    "Real Estate Developers & Builders",
    "Upscale Boutiques & Clothing Labels",
    "Personal Brands, Consultants & Coaches",
    "High-Ticket Local Service Companies",
    "Premium Cafés & Hospitality Hubs"
  ];

  return (
    <div className="w-full bg-[#0a0a0a] text-white selection:bg-accent selection:text-background overflow-hidden relative">
      <SpaceBackground />
      <SEO 
        title="Premium Business Website at ₹25,000 | Frame n Flow Media"
        description="Standard, E-commerce, or Custom Coded website for ₹25,000. Google Analytics active, high-end SEO, and 1 year free domain & hosting included. The premium India special offer."
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "₹25,000 Premium Website Offer",
          "offers": {
            "@type": "Offer",
            "price": "25000",
            "priceCurrency": "INR"
          }
        }}
      />

      {/* MINIMAL HEADER */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-start items-center">
        <NavLink to="/" className="group flex items-center space-x-2">
          <img src="/logo.png" alt="Frame n Flow Logo" className="h-12 md:h-16 w-auto transition-transform group-hover:scale-105" />
        </NavLink>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-start items-center px-6 pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto max-w-[1200px] relative z-10">
          
          {/* Simple Headline - Centered above the Questionnaire */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter leading-tight">
                An Ultra-Premium <span className="text-accent">₹25,000 Website</span>
              </h1>
              <p className="text-base md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                Standard, E-commerce, or Custom Coded. Includes active Google Analytics, advanced local SEO, and 1 year free domain & hosting.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            {/* Typeform-like Interactive Wizard */}
            <FadeIn delay={0.2} className="relative group">
              <div className="absolute -inset-10 bg-accent/5 rounded-[4rem] blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
              
              <div className="relative rounded-[2.5rem] p-6 md:p-10 bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden">
                
                {/* Step Header */}
                {step <= 5 && (
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-6 text-xs font-mono uppercase text-white/40">
                      <span>Interactive Wizard</span>
                      <span className="text-accent font-bold">Step {step} of 5</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-10">
                      <motion.div 
                        className="h-full bg-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step / 5) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                )}

                {/* Form Body - Step Animations */}
                <div className="flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <User className="text-accent" size={24} />
                          <h2 className="text-2xl md:text-3xl font-display font-bold">What is your name?</h2>
                        </div>
                        <p className="text-sm text-white/50 mb-4 font-light">Let's start by getting to know you.</p>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleNextStep(); }}
                            className="w-full bg-white/5 border-b border-white/20 focus:border-accent outline-none text-xl p-3 px-1 transition-all duration-300 font-light"
                            autoFocus
                          />
                          {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Phone className="text-accent" size={24} />
                          <h2 className="text-2xl md:text-3xl font-display font-bold">What is your WhatsApp number?</h2>
                        </div>
                        <p className="text-sm text-white/50 mb-4 font-light">We will use this to connect and send your preview link.</p>
                        <div className="flex gap-3">
                          <span className="bg-white/5 border-b border-white/20 text-white/50 text-xl p-3 font-light">+91</span>
                          <input 
                            type="tel" 
                            placeholder="10-digit number"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleNextStep(); }}
                            className="flex-grow bg-white/5 border-b border-white/20 focus:border-accent outline-none text-xl p-3 transition-all duration-300 font-light"
                            autoFocus
                          />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Briefcase className="text-accent" size={24} />
                          <h2 className="text-2xl md:text-3xl font-display font-bold">What is your business name?</h2>
                        </div>
                        <p className="text-sm text-white/50 mb-4 font-light">Specify the name of the company we are building for.</p>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter business name"
                            value={formData.businessName}
                            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleNextStep(); }}
                            className="w-full bg-white/5 border-b border-white/20 focus:border-accent outline-none text-xl p-3 px-1 transition-all duration-300 font-light"
                            autoFocus
                          />
                          {errors.businessName && <p className="text-red-400 text-xs mt-2">{errors.businessName}</p>}
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <HelpCircle className="text-accent" size={24} />
                          <h2 className="text-2xl md:text-3xl font-display font-bold">Select website type</h2>
                        </div>
                        <p className="text-sm text-white/50 mb-6 font-light">What type of business are you scaling?</p>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: 'Service Business', label: 'Standard / Service Business', desc: 'Portfolios, agency sites, lead systems' },
                            { id: 'E-commerce', label: 'E-commerce Webstore', desc: 'Product catalogs, checkouts, store features' },
                            { id: 'Custom Coded', label: 'Custom Coded React App', desc: 'High-speed tailored layout & animations' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => selectWebsiteType(opt.id)}
                              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 text-left transition-all hover:bg-white/10 group flex justify-between items-center"
                            >
                              <div>
                                <h4 className="font-bold text-white group-hover:text-accent transition-colors">{opt.label}</h4>
                                <p className="text-xs text-white/40">{opt.desc}</p>
                              </div>
                              <ArrowRight size={16} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <CheckCircle2 className="text-accent" size={24} />
                          <h2 className="text-2xl md:text-3xl font-display font-bold">Budget Commitment</h2>
                        </div>
                        <p className="text-sm text-white/50 mb-6 font-light">
                          Are you ready to invest ₹25,000 for your website project?
                        </p>
                        
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => selectInvestment('Yes')}
                            className="w-full p-4 rounded-xl bg-accent text-black font-bold text-center text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-pulse"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => selectInvestment('Is there any other package with lower amount?')}
                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent text-white font-medium text-left px-6 text-sm uppercase tracking-wider hover:bg-white/10 transition-all"
                          >
                            Is there any other package with lower amount?
                          </button>
                          <button
                            onClick={() => selectInvestment('No')}
                            className="w-full p-4 rounded-xl border border-white/20 hover:border-white text-white font-medium text-center text-sm uppercase tracking-wider hover:bg-white/5 transition-all"
                          >
                            No
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 6 && (
                      <motion.div
                        key="step6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8 text-center"
                      >
                        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                          <Check className="text-accent w-8 h-8 animate-pulse" />
                        </div>
                        
                        <div>
                          <h2 className="text-3xl font-display font-bold mb-4">Generating Handoff</h2>
                          <p className="text-white/60 font-light leading-relaxed max-w-sm mx-auto text-sm">
                            Thank you, <span className="text-white font-medium">{formData.name}</span>. We are formatting your project details and redirecting you to WhatsApp to connect with Bhanu Deep.
                          </p>
                        </div>
                        
                        <a 
                          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hi, I'm interested in the ₹25,000 Premium Website Offer.\nName: ${formData.name}\nWhatsApp: ${formData.phone}\nBusiness: ${formData.businessName}\nType: ${formData.websiteType}\nInvest Ready: ${formData.canInvest}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest transition-all"
                        >
                          <span>Click here if not redirected</span>
                          <ArrowUpRight size={14} className="text-accent" />
                        </a>
                      </motion.div>
                    )}

                    {step === 7 && (
                      <motion.div
                        key="step7"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 text-center"
                      >
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-400 border border-red-500/20">
                          <CheckCircle2 size={32} />
                        </div>
                        
                        <div>
                          <h2 className="text-2xl font-display font-bold mb-4">Collaboration Status</h2>
                          <p className="text-white/60 font-light leading-relaxed max-w-sm mx-auto text-sm">
                            We appreciate your honesty. Frame n Flow Media only engineers high-performance digital infrastructure for brands ready to invest in serious scale. Currently, we cannot collaborate on this project. Feel free to return anytime when you are ready to invest and ready for the collaboration.
                          </p>
                        </div>

                        <button 
                          onClick={() => {
                            setStep(1);
                            setFormData({
                              name: '',
                              phone: '',
                              businessName: '',
                              websiteType: '',
                              canInvest: ''
                            });
                          }}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest transition-all"
                        >
                          Restart Form
                        </button>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Form Footer Buttons */}
                {step > 1 && step <= 5 && (
                  <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-8">
                    <button
                      onClick={handlePrevStep}
                      className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                    
                    {step < 4 && (
                      <button
                        onClick={handleNextStep}
                        className="flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/10 hover:border-accent rounded-full text-xs font-mono uppercase tracking-widest transition-all"
                      >
                        <span>Continue</span>
                        <ArrowRight size={14} className="text-accent" />
                      </button>
                    )}
                  </div>
                )}
                
                {step === 1 && (
                  <div className="flex justify-end items-center pt-8 border-t border-white/5 mt-8">
                    <button
                      onClick={handleNextStep}
                      className="flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/10 hover:border-accent rounded-full text-xs font-mono uppercase tracking-widest transition-all"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} className="text-accent" />
                    </button>
                  </div>
                )}

              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* DELIVERABLES SECTION */}
      <section id="what-you-get" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-full bg-accent/5 blur-[150px] -z-10 translate-x-1/2" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <FadeIn className="text-left">
              <h2 className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold mb-4">No Half-Measures</h2>
              <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight">The ₹25k Standard of Power</h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/40 max-w-sm text-lg font-light leading-snug">
                Every component is hand-crafted and loaded with performance triggers. Fully responsive, trackable, and geared for growth.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500 group h-full relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform group-hover:scale-150 group-hover:rotate-12">
                     {feature.icon}
                  </div>
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / NARRATIVE SECTION */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-accent/[0.03] -z-10 blur-[120px]" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <FadeIn className="text-center mb-24">
            <h2 className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold mb-6 italic">The Pipeline to Launch</h2>
            <h3 className="text-4xl md:text-8xl font-display font-bold tracking-tighter">10 Days to Live Digital Domination</h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
            {storySteps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.1} className="bg-[#0a0a0a] p-12 hover:bg-white/[0.03] transition-all duration-700 relative group border border-transparent hover:border-accent/20">
                <div className="text-[120px] font-display font-black text-white/[0.02] absolute top-4 left-6 pointer-events-none group-hover:text-accent/[0.05] transition-colors leading-none">
                  {step.number}
                </div>
                <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center mb-12 border border-accent/20 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                   {step.icon}
                </div>
                <h4 className="text-2xl font-bold mb-6 text-white group-hover:text-accent transition-colors">{step.title}</h4>
                <p className="text-white/40 text-base font-light leading-relaxed group-hover:text-white/60 transition-all font-sans">
                  {step.desc}
                </p>
                
                {index < storySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-[148px] -right-[20px] z-20 text-white/10 group-hover:text-accent/50 transition-colors">
                     <ArrowRight size={40} strokeWidth={1} />
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>



      {/* FINAL CALL TO ACTION */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
           <FadeIn className="mb-20">
              <h2 className="text-4xl md:text-8xl font-display font-black mb-10 tracking-tighter leading-none">
                 Ready to Elevate Your <br /> <span className="text-accent">Digital Footprint?</span>
              </h2>
              <p className="text-white/40 text-xl font-light mb-16 max-w-2xl mx-auto">
                 Don't settle for basic templates. Level up your branding and start converting high-value domestic prospects now.
              </p>
              <Button 
                className="!py-6 !px-16 text-lg"
                onClick={() => {
                  setStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  trackGAEvent('cta_bottom_clicked');
                }}
              >
                Claim This Special Offer
              </Button>
           </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default WebsiteOffer25k;
