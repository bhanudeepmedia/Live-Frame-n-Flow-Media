import React from 'react';
import { motion } from 'framer-motion';
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
  MessageCircle,
  Clock,
  ArrowUpRight,
  Paintbrush,
  Users
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/Button';

// Reuse FadeIn component pattern from Home
const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const WebsiteOffer: React.FC = () => {
  const WHATSAPP_URL = "https://wa.me/919963844853?text=Hi,%20I'm%20interested%20in%20the%20₹10,000%20Website%20Offer.";

  const features = [
    { icon: <Paintbrush className="text-accent" />, title: "Full Website Design", desc: "Premium UI/UX designed to match your brand identity across all pages." },
    { icon: <Smartphone className="text-accent" />, title: "Mobile Optimized", desc: "Your website will look and function perfectly on every screen size." },
    { icon: <ShoppingCart className="text-accent" />, title: "E-commerce Ready", desc: "Built-in capability to showcase and sell products if your business needs it." },
    { icon: <Zap className="text-accent" />, title: "Fast Loading Speed", desc: "Optimized performance to ensure your visitors don't bounce." },
    { icon: <Search className="text-accent" />, title: "SEO-Ready Structure", desc: "Proper heading hierarchy and meta tags to help you rank on search engines." },
    { icon: <Target className="text-accent" />, title: "Lead Generation Focus", desc: "Strategically placed CTAs to turn visitors into paying customers." },
    { icon: <ShieldCheck className="text-accent" />, title: "Secure & Scalable", desc: "Built with modern technologies that grow as your business grows." },
    { icon: <Layout className="text-accent" />, title: "Modern Design System", desc: "Clean, consistent, and premium aesthetic that builds instant trust." },
  ];

  const targetBusinesses = [
    "Interior Designers",
    "Architects",
    "Real Estate Developers",
    "Restaurants & Cafés",
    "Clothing & Fashion Brands",
    "Personal Brands & Coaches",
    "Local Service Businesses"
  ];

  const processSteps = [
    "50% upfront payment to start",
    "Strategy call for design, color & theme",
    "Website development begins",
    "Preview & feedback (1 revision included)",
    "Final delivery",
    "50% balance payment",
    "Website goes live"
  ];

  return (
    <div className="w-full bg-[#0a0a0a] text-white selection:bg-accent selection:text-background overflow-hidden">
      <SEO 
        title="Premium Business Website at ₹10,000 | Frame n Flow Media"
        description="Get a high-converting, luxury minimal business website for just ₹10,000. Mobile-optimized, SEO-ready, and delivered in 7-10 days. Limited time offer for Indian businesses."
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "₹10,000 Premium Website Offer",
          "description": "High-converting landing page design and development for Indian businesses.",
          "offers": {
            "@type": "Offer",
            "price": "10000",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "areaServed": "IN"
          }
        }}
      />

      {/* MINIMAL HEADER */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-start items-center">
        <NavLink to="/" className="group flex items-center space-x-2">
          <img src="/logo.png" alt="Frame n Flow Logo" className="h-12 md:h-16 w-auto transition-transform group-hover:scale-105" />
        </NavLink>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 pb-20">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">Limited Time Offer — India Exclusive</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-[1.1]">
              A <span className="text-accent underline decoration-white/10 underline-offset-8">₹10,000 Website</span> That <br className="hidden md:block" /> Looks Like It Cost ₹50,000
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Premium, fully functional websites designed for modern Indian businesses. Built for performance, conversions, and brand presence — not just design.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              className="w-full md:w-auto !py-4 !px-10 text-sm"
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
            >
              Get Your Website Now
            </Button>
            <button 
              className="w-full md:w-auto px-10 py-4 text-sm font-bold text-white/50 hover:text-white transition-colors"
              onClick={() => document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View What You Get
            </button>
          </FadeIn>

          {/* Laptop Mockup Visual */}
          <FadeIn delay={0.5} className="mt-20">
            <div className="relative mx-auto max-w-4xl group">
              <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative bg-[#1a1a1a] rounded-2xl p-2 border border-white/10 shadow-2xl transform-gpu transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="bg-[#050505] rounded-xl overflow-hidden aspect-video border border-white/5">
                   <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                    alt="Premium Website Design" 
                    className="w-full h-full object-cover opacity-80"
                   />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. WHAT YOU ACTUALLY GET */}
      <section id="what-you-get" className="py-24 border-t border-white/5 bg-transparent relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">This Isn't a Basic Website</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Everything your business needs to look credible online.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 border border-accent/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR */}
      <section className="py-24 bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Built for Businesses That Want to Grow</h2>
              <p className="text-xl text-white/50 mb-10 font-light max-w-xl">
                If your business needs credibility, you need this. We specialize in high-fidelity creative execution for brands that want to scale.
              </p>
              <Button onClick={() => window.open(WHATSAPP_URL, '_blank')} className="px-8">Get Started Now</Button>
            </FadeIn>

            <div className="grid grid-cols-1 gap-4">
              {targetBusinesses.map((item, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                    <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    <span className="text-lg font-medium text-white/80">{item}</span>
                  </div>
                </FadeIn>
              ))}
              <FadeIn delay={0.8}>
                <p className="text-accent text-sm font-mono mt-4 uppercase tracking-widest">Dominance Always.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OFFER BREAKDOWN & 5. DELIVERY SPEED */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Simple Pricing. No Confusion.</h2>
          </FadeIn>

          <FadeIn>
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/10 rounded-3xl blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-10 md:p-16 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-sm overflow-hidden text-center">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Target size={120} className="text-white" />
                </div>
                
                <h3 className="text-accent font-mono text-sm uppercase tracking-widest mb-4">India Domestic Special</h3>
                <div className="text-6xl md:text-8xl font-display font-black mb-6">
                  ₹10,000
                </div>
                <p className="text-white/40 mb-10 text-lg uppercase tracking-widest">One-Time Development Cost</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-left max-w-md mx-auto mb-10">
                  <div className="flex items-center space-x-3 text-white/70">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span>Website Development</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span>7–10 Working Days</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span>1 Year Free Hosting</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span>Free .com / .in Domain*</span>
                  </div>
                </div>

                <Button fullWidth className="!py-5 !text-lg" onClick={() => window.open(WHATSAPP_URL, '_blank')}>
                  Secure This Offer
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Delivery Speed Section */}
          <FadeIn className="mt-24 text-center">
            <div className="inline-block p-1 rounded-2xl bg-white/5 mb-8">
              <div className="px-6 py-2 bg-accent/20 border border-accent/30 rounded-[0.9rem] flex items-center space-x-3">
                <Clock size={18} className="text-accent" />
                <span className="text-accent font-bold uppercase tracking-widest text-xs">Lightning Fast Delivery</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Not Months. Just Days.</h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Your website goes live in just <span className="text-white font-bold tracking-tight px-2 py-1 bg-white/5 border border-white/10 rounded">7–10 working days</span> after final approval.
            </p>
            
            {/* Minimal Progress/Timeline Bar */}
            <div className="max-w-xl mx-auto h-2 bg-white/5 rounded-full relative overflow-hidden">
               <motion.div 
                className="absolute top-0 left-0 h-full bg-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
               />
            </div>
            <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest font-mono text-white/30 max-w-xl mx-auto">
              <span>Day 0: Start</span>
              <span className="text-accent/50 animate-pulse">Designing</span>
              <span>Day 10: Live</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section className="py-24 border-y border-white/5 bg-transparent relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How It Works</h2>
            <p className="text-white/50 text-lg">A structured execution for your digital presence.</p>
          </FadeIn>

          <div className="relative">
            {/* Connector Line (Vertical on mobile, Horizontal on desktop) */}
            <div className="absolute left-[19px] lg:left-0 top-0 w-px lg:w-full lg:h-px h-full bg-white/10 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex lg:flex-col items-start lg:items-center space-x-6 lg:space-x-0 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-accent flex items-center justify-center font-display font-bold text-sm text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      {index + 1}
                    </div>
                    <p className="mt-4 lg:mt-6 text-sm md:text-base font-medium text-white/80 lg:text-center leading-snug">
                      {step}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREMIUM POSITIONING */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-10">Why This Isn't 'Cheap' — It's Smart</h2>
          </FadeIn>

          <FadeIn delay={0.2} className="p-10 md:p-16 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left">
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-12">
              Most businesses either overpay or delay going online. 
              This offer is built to give you a <span className="text-white font-bold">premium digital presence without unnecessary cost.</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="text-accent font-bold text-2xl uppercase tracking-tighter">ROI</div>
                <p className="text-sm text-white/40 leading-relaxed">Designed for ROI and built with real business understanding.</p>
              </div>
              <div className="space-y-4">
                <div className="text-accent font-bold text-2xl uppercase tracking-tighter">Strategy</div>
                <p className="text-sm text-white/40 leading-relaxed">No template dumping — structured execution that works.</p>
              </div>
              <div className="space-y-4">
                <div className="text-accent font-bold text-2xl uppercase tracking-tighter">Integrity</div>
                <p className="text-sm text-white/40 leading-relaxed">High-fidelity execution by a real strategy-first agency.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. STRONG CTA */}
      <section className="py-24 bg-accent relative overflow-hidden mx-6 md:mx-12 rounded-[2rem] md:rounded-[3rem] mb-24 cursor-default group">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[size:1000px_1000px] animate-shimmer pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-6xl font-display font-black text-black mb-8 leading-none">
              Your Business Deserves <br /> a Proper Website
            </h2>
            <p className="text-black/70 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
              If you're still operating without a strong online presence, you're losing opportunities daily.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
              className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg flex items-center space-x-4 shadow-2xl hover:bg-black/90 transition-all border border-white/10"
            >
              <MessageCircle size={24} />
              <span>Message Us on WhatsApp</span>
            </motion.button>
            <p className="mt-6 text-black/50 font-mono text-[10px] uppercase tracking-widest font-bold">Quick response. Direct consultation.</p>
          </FadeIn>
        </div>

        {/* Floating Icons for Decoration */}
        <div className="absolute top-1/4 left-10 pointer-events-none opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-500">
           <Users size={80} className="text-black" />
        </div>
        <div className="absolute bottom-1/4 right-10 pointer-events-none opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
           <Layout size={80} className="text-black" />
        </div>
      </section>

      {/* 9. T&C LINK */}
      <section className="pb-24 border-t border-white/5 pt-12">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest italic mb-4">*Terms & Conditions Apply</p>
            <NavLink 
              to="/offers/website-10k/terms" 
              className="group inline-flex items-center space-x-2 text-white/50 hover:text-accent transition-colors"
            >
              <span className="text-sm font-medium">View Full Terms & Conditions</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </NavLink>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default WebsiteOffer;
