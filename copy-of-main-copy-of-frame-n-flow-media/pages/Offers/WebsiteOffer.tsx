import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  Users,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Briefcase6
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

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const WebsiteOffer: React.FC = () => {
  const WHATSAPP_URL = "https://wa.me/919963844853?text=Hi,%20I'm%20interested%20in%20the%20₹10,000%20Website%20Offer.";

  const features = [
    { icon: <Paintbrush className="text-accent" />, title: "Full Website Design", desc: "High-end UI/UX architecture specifically built to convert Indian domestic market traffic into sales." },
    { icon: <Smartphone className="text-accent" />, title: "Mobile Dominance", desc: "Extreme speed and pixel-perfect responsiveness on every mobile device. Built for scrolling users." },
    { icon: <ShoppingCart className="text-accent" />, title: "E-commerce Ready", desc: "Professional catalog or product display built-in, ready to scale whenever your business needs." },
    { icon: <Zap className="text-accent" />, title: "Vitesse Performance", desc: "Lightning fast page loads. We eliminate lag to ensure every visitor stays on your brand." },
    { icon: <Search className="text-accent" />, title: "Strategic SEO", desc: "Engineered with semantic HTML and local India signals to ensure Google loves your new home." },
    { icon: <Target className="text-accent" />, title: "Conversion Systems", desc: "Not just a pretty site — we install 'Revenue Engines' that turn clicks into qualified enquiries." },
    { icon: <ShieldCheck className="text-accent" />, title: "Next-Gen Security", desc: "Standard-setting security protocols ensuring your business and customer data stay protected 24/7." },
    { icon: <Layout className="text-accent" />, title: "Luxury Minimal UI", desc: "Clean, consistent, and premium aesthetic tokens that position you as a market leader instantly." },
  ];

  const storySteps = [
    { 
      number: "01", 
      title: "The Strategy Shift", 
      desc: "We start with a 50% commitment. We don't just 'make a site' — we jump on a call to map your business DNA, color theory, and target psychology.", 
      icon: <Sparkles className="text-accent" />
    },
    { 
      number: "02", 
      title: "High-Fidelity Execution", 
      desc: "Our design team brings the strategy to life. We build your 'Digital Assets' from the ground up — optimized for performance and premium feeling.", 
      icon: <Target className="text-accent" />
    },
    { 
      number: "03", 
      title: "The Refinement Cycle", 
      desc: "You preview the build. We include one focused revision cycle to polish every pixel before the grand launch. Precision is non-negotiable.", 
      icon: <Zap className="text-accent" />
    },
    { 
      number: "04", 
      title: "Global Deployment", 
      desc: "Final 50% balance cleared. We push the switch. Your business goes live to the world in 7–10 working days. Dominance achieved.", 
      icon: <TrendingUp className="text-accent" />
    }
  ];

  const targetBusinesses = [
    "Interior Designers & Architects",
    "Real Estate Developers & Builders",
    "Restaurants, Cafés & Hospitality",
    "Luxury Clothing & Fashion Labels",
    "Personal Brands & Enterprise Coaches",
    "Premium Local Service Businesses"
  ];

  return (
    <div className="w-full bg-[#0a0a0a] text-white selection:bg-accent selection:text-background overflow-hidden relative">
      <SpaceBackground />
      <SEO 
        title="Premium Business Website at ₹10,000 | Frame n Flow Media"
        description="Transform your business with a luxury minimal website for just ₹10,000. Built for ROI, mobile-optimized, and delivered in 10 days. The India Domestic Special."
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "₹10,000 Premium Website Offer",
          "offers": {
            "@type": "Offer",
            "price": "10000",
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

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto max-w-[1800px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="text-left">
              <FadeIn>
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8 backdrop-blur-xl">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent font-bold">India Domestic Special Offer</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-[0.95]">
                  A <span className="text-white relative">₹10,000 Website <span className="absolute bottom-0 left-0 w-full h-[6px] bg-accent/20 -z-10" /></span> <br /> That Looks Like It Cost ₹50k
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-xl font-light leading-relaxed">
                  Engineered for ROI and luxury branding. We don't just code websites — we build <span className="text-white font-medium">high-fidelity revenue engines</span> for the next generation of Indian entrepreneurs.
                </p>
              </FadeIn>

              <FadeIn delay={0.3} className="flex flex-col md:flex-row items-center gap-6">
                <Button 
                  className="w-full md:w-auto !py-5 !px-12 text-sm uppercase tracking-widest font-black shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                  onClick={() => window.open(WHATSAPP_URL, '_blank')}
                >
                  Claim This Offer
                </Button>
                <button 
                  className="group flex items-center space-x-3 text-white/40 hover:text-white transition-all font-mono text-xs uppercase tracking-widest"
                  onClick={() => document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="w-8 h-px bg-white/20 group-hover:w-12 transition-all mr-2" />
                  View Deliverables
                </button>
              </FadeIn>

              <FadeIn delay={0.4} className="mt-16 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-surface flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-white/40">
                   <span className="font-bold text-white uppercase tracking-widest">Trust Index High</span> <br />
                   Scaling multiple brands across India
                </div>
              </FadeIn>
            </div>

            {/* Premium Mockup Visual */}
            <FadeIn delay={0.5} className="relative group">
              <div className="absolute -inset-10 bg-accent/20 rounded-[5rem] blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className="relative rounded-[2rem] p-3 bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden translate-y-4 hover:translate-y-0 transition-transform duration-700">
                <div className="absolute top-4 left-6 flex space-x-2 z-10">
                   <div className="w-2 h-2 rounded-full bg-red-500/50" />
                   <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                   <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <img 
                  src="/offers/premium-mockup.png" 
                  alt="Ultra Premium Website Mockup" 
                  className="w-full rounded-xl object-cover shadow-2xl"
                />
              </div>

              {/* Floaties */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 p-6 bg-accent border border-white/20 rounded-2xl shadow-2xl text-black font-black text-xl hidden md:block"
              >
                ₹10,000/-
              </motion.div>
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 p-5 bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl hidden md:block"
              >
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/50 mb-1">Status</div>
                <div className="text-xs font-bold font-mono text-accent uppercase">Live Domination</div>
              </motion.div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 2. WHAT YOU ACTUALLY GET - UPDATED GRID */}
      <section id="what-you-get" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-full bg-accent/5 blur-[150px] -z-10 translate-x-1/2" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <FadeIn className="text-left">
              <h2 className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold mb-4">The Standard of Excellence</h2>
              <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight">This Isn't Basic. It's Built.</h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/40 max-w-sm text-lg font-light leading-snug">
                Every element is precision-engineered for performance. No templates. No generic waste.
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

      {/* 3. NARRATIVE "HOW IT WORKS" - THE STORY SECTION */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-accent/[0.03] -z-10 blur-[120px]" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <FadeIn className="text-center mb-24">
            <h2 className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold mb-6 italic">The Journey to Dominance</h2>
            <h3 className="text-4xl md:text-8xl font-display font-bold tracking-tighter">Your Roadmap to High-ROI Growth</h3>
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
                
                {/* Horizontal progress indicator on desktop */}
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

      {/* 4. PRICING & 5. DELIVERY */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-[10vw] font-display font-black leading-none opacity-[0.03] absolute top-10 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none -z-10">THE OFFER</h2>
            <h3 className="text-4xl md:text-7xl font-display font-bold">Unapologetic Value.</h3>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-blue-500/20 to-accent/20 rounded-[3rem] blur-[30px] opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <div className="relative p-12 md:p-24 rounded-[3rem] bg-[#0a0a0a] border border-white/10 backdrop-blur-md overflow-hidden flex flex-col items-center">
                
                <h4 className="text-accent font-mono text-sm uppercase tracking-[0.4em] mb-8 font-bold">One-Time Investment</h4>
                <div className="text-7xl md:text-[9rem] font-display font-black mb-4 tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">
                  ₹10,000
                </div>
                <div className="w-20 h-1 bg-accent/20 mb-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16 text-left w-full max-w-lg mb-16">
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 size={24} className="text-accent" />
                    <span className="text-lg font-light text-white/80">Premium Development</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 size={24} className="text-accent" />
                    <span className="text-lg font-light text-white/80">7–10 Day Delivery</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 size={24} className="text-accent" />
                    <span className="text-lg font-light text-white/80">1 Year Hosting</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 size={24} className="text-accent" />
                    <span className="text-lg font-light text-white/80">Free Domain</span>
                  </div>
                </div>

                <Button 
                  fullWidth 
                  className="!py-6 !text-xl uppercase tracking-widest font-black"
                  onClick={() => window.open(WHATSAPP_URL, '_blank')}
                >
                  Start My Domination
                </Button>
                
                <p className="mt-8 text-white/20 text-[10px] uppercase font-mono tracking-widest italic font-bold">
                   Built specifically for domestic scale-up brands
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. WHO THIS IS FOR - RECOVERY GRID */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <FadeIn>
               <h2 className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold mb-6">Designed For Growth</h2>
               <h3 className="text-3xl md:text-7xl font-display font-bold mb-8 leading-tight">If Credibility is a Gap, We Close It.</h3>
               <p className="text-xl text-white/50 font-light mb-12 leading-relaxed">
                 Operating without a high-end digital anchor is lost revenue. We specialize in building trust at first sight for elite Indian service and product brands.
               </p>
               <div className="flex flex-wrap gap-4">
                 <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-bold">
                    <Sparkles size={16} />
                    <span>Luxury Positioning</span>
                 </div>
                 <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-bold">
                    <Zap size={16} />
                    <span>High Conversion</span>
                 </div>
               </div>
             </FadeIn>

             <div className="grid grid-cols-1 gap-3">
               {targetBusinesses.map((item, index) => (
                 <FadeIn key={index} delay={index * 0.1}>
                   <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/40 flex items-center justify-between transition-all duration-500 overflow-hidden relative">
                      <div className="absolute inset-0 bg-accent/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                      <span className="text-xl font-medium text-white/80 relative z-10 transition-colors group-hover:text-white">{item}</span>
                      <ArrowUpRight size={20} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all relative z-10" />
                   </div>
                 </FadeIn>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* 7. CTA - FINAL */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
           <FadeIn className="mb-20">
              <h2 className="text-4xl md:text-8xl font-display font-black mb-10 tracking-tighter leading-none">
                 Ready to Level Up Your <span className="text-accent">Digital Presence?</span>
              </h2>
              <p className="text-white/40 text-xl font-light mb-16 max-w-2xl mx-auto">
                 Don't let your brand look basic. Move to a premium identity and start competing at the highest level of your industry.
              </p>
              <Button 
                className="!py-6 !px-16 text-lg"
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
              >
                Let's Build It
              </Button>
           </FadeIn>
        </div>
      </section>

      {/* 8. FOOTER LINK */}
      <section className="pb-32 border-t border-white/5 pt-16">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.4em] italic mb-6">*Domain and hosting availability conditions apply</p>
            <NavLink 
              to="/offers/website-10k/terms" 
              className="group inline-flex items-center space-x-3 text-white/30 hover:text-white transition-all bg-white/5 px-6 py-3 rounded-full border border-white/5 hover:border-white/20"
            >
              <span className="text-xs font-bold uppercase tracking-widest font-mono">View Offer Terms</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-accent" />
            </NavLink>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default WebsiteOffer;
