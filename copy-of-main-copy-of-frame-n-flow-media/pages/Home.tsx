import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
// import { SERVICES, PROCESS_STEPS } from '../constants';
import { CheckCircle2, FileSearch, Music, Sparkles, TrendingUp, ArrowRight, Laptop, Play, Camera, Aperture, PlayCircle, X, Search, Plus, Bot, Code } from 'lucide-react';

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

// --- DOODLE COMPONENTS ---
const StarDoodle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="white"
    className={className}
    animate={{
      rotate: [0, 15, -15, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </motion.svg>
);

const LightningDoodle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.5"
    className={className}
    animate={{
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
);

// --- BACKGROUND GRID COMPONENT (Pure Black + Light Grid) ---
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
    {/* Light Grey Grid Lines, Low Opacity, Static */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

// --- MICRO-INTERACTION UTILS ---
const playHoverCue = () => {
  // Desktop check: No audio on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;

  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    // Soft, low-mid tone for subtle feedback
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

    // Very low volume
    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Fail silently if audio context is blocked or not supported
  }
};

// --- ANIMATED CARD COMPONENTS ---

const LaptopCard = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Laptop Frame */}
      <div className="w-4/5 aspect-video bg-[#0a0a0a] rounded-t-xl border-4 border-white/10 border-b-0 relative p-2 shadow-2xl">
        {/* Screen Content */}
        <div className="w-full h-full bg-[#050505] rounded-t overflow-hidden relative flex flex-col">
          {/* Header Bar */}
          <div className="h-4 bg-white/5 w-full flex items-center px-2 space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
          {/* Flowing Data Stream - Cyan */}
          <div className="flex-1 relative overflow-hidden p-2 font-mono text-[8px] text-accent/70 leading-tight">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 p-2 opacity-80"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap mb-1">
                  <span className="text-white/30">&gt;</span> scan_target: <span className="text-white">competitor_{i}</span><br />
                  <span className="text-white/30">&gt;</span> traffic_source: <span className="text-accent">detected</span><br />
                  <span className="text-white/30">&gt;</span> gap_analysis: <span className="text-accent">calculating...</span>
                </div>
              ))}
            </motion.div>

            {/* Floating Stickers inside screen */}
            <motion.div
              className="absolute top-1/4 left-1/4 bg-accent text-black px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.5)] font-bold border border-white/20"
              animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              GAP FOUND
            </motion.div>
          </div>
        </div>
      </div>
      {/* Laptop Base */}
      <div className="w-[90%] h-3 bg-[#1a1a1a] rounded-b-xl mb-4 shadow-xl border-t border-white/10" />

      <h3 className="text-xl font-bold text-white mt-2 relative z-10">Research</h3>
    </div>
  );
};

const MusicCard = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Audio Waves Circular */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-accent/30 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Visualizer Bars */}
        <div className="flex items-end justify-center space-x-1 h-12 relative z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-white rounded-t-sm shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              animate={{
                height: ["20%", "100%", "40%", "80%", "30%"],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Note */}
      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{ y: [0, -10, 0], opacity: [0, 1, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Music size={20} className="text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mt-4 relative z-10">Sonic Branding</h3>
    </div>
  );
};

const VisualsCard = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Camera Aperture / Generative Grid */}
      <div className="relative w-32 h-32 flex items-center justify-center bg-black/40 rounded-xl border border-white/10 overflow-hidden mb-4">
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-30">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-white/10 bg-accent/5"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Central Lens/Eye */}
        <motion.div
          className="relative z-10 w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Aperture size={32} className="text-white" />
        </motion.div>

        {/* Scanning Laser */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-white shadow-[0_0_15px_white] z-20"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Tag */}
      <motion.div
        className="bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-accent"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        -90% COST
      </motion.div>

      <h3 className="text-xl font-bold text-white mt-4 relative z-10">AI Visuals</h3>
    </div>
  );
};

const RevenueCard = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-4">
      <div className="w-full max-w-[240px] bg-[#0a0a0a] rounded-lg p-4 border border-white/10 shadow-2xl mb-4 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />

        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="text-[10px] text-white/50 uppercase tracking-widest">Leads</div>
          <motion.div
            className="text-accent text-sm font-bold bg-accent/10 px-2 py-0.5 rounded border border-accent/20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LIVE
          </motion.div>
        </div>

        {/* Graph */}
        <div className="flex items-end justify-between space-x-2 h-20 relative z-10">
          <motion.div className="w-full bg-white/10 rounded-t-sm" initial={{ height: "20%" }} animate={{ height: "30%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }} />
          <motion.div className="w-full bg-white/10 rounded-t-sm" initial={{ height: "35%" }} animate={{ height: "45%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.2 }} />
          <motion.div className="w-full bg-white/10 rounded-t-sm" initial={{ height: "25%" }} animate={{ height: "40%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.4 }} />
          <motion.div className="w-full bg-accent/80 rounded-t-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]" initial={{ height: "60%" }} animate={{ height: "90%" }} transition={{ duration: 1, repeat: Infinity, repeatType: "mirror", delay: 0.6 }} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white relative z-10">Growth</h3>
    </div>
  );
};

// --- AUDIT POPUP COMPONENT ---
const AuditPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -50, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-4 left-4 z-[100] w-[calc(100vw-2rem)] md:w-80 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
    >
      {/* Header / Visual Area */}
      <div className="relative h-32 bg-black/50 overflow-hidden border-b border-white/10 group">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/50 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur rounded-full p-1.5 z-30 transition-all duration-300 border border-white/5 hover:border-white/20"
        >
          <X size={14} />
        </button>

        {/* High End Graphics - Radar Scan */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />

        {/* Scanning Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-40 h-40 border border-white/5 rounded-full flex items-center justify-center">
            <motion.div
              className="absolute inset-0 border-t border-accent/60 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-b border-white/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Search className="text-accent w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Data Overlay */}
        <div className="absolute bottom-3 left-3 flex flex-col space-y-0.5">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[8px] font-mono text-white/50 uppercase tracking-wider">Live Scan</span>
          </div>
          <div className="text-[8px] font-mono text-accent">Competitor_Data_Found</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-surface/50 backdrop-blur-md">
        <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight">
          Free Marketing Audit
        </h3>
        <p className="text-xs text-white/60 mb-4 leading-relaxed font-light">
          Identify your funnel leaks and growth gaps. Data-driven and completely free.
        </p>
        <Button
          onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}
          className="w-full text-xs py-3 h-auto"
        >
          Get Free Audit
        </Button>
      </div>
    </motion.div>
  );
};

// --- FAQ DATA & COMPONENT ---
const FAQ_DATA = [
  {
    question: "How does the 100% Refund Guarantee work?",
    answer: "It's simple. If we don't hit the qualified lead targets defined in our service agreement within the first 90 days, we refund our entire management fee. We bear the risk, not you."
  },
  {
    question: "Why use AI visuals instead of traditional photography?",
    answer: "Speed and Cost. Traditional shoots require renting studios, hiring models, and expensive equipment, costing $10k+. AI generates higher-quality, physics-defying assets for a fraction of the price, in days instead of weeks."
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Yes. We have specific 'Growth Engines' designed for startups that need aggressive market entry. We focus on low-cost acquisition and high-velocity testing for new brands."
  },
  {
    question: "Who owns the creative assets you produce?",
    answer: "You do. Unlike many agencies that hold IP hostage, everything we create—from strategy docs to final video renders—is 100% your property upon delivery."
  },
  {
    question: "What is the typical turnaround time?",
    answer: "For the 'Audit & Strategy' phase, 7 days. For AI Visuals, 3-5 days per asset batch. For Performance Marketing campaigns, we typically go live within 10 days of onboarding."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <FadeIn className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-white/50 font-light">Common questions about our models, pricing, and timeline.</p>
        </FadeIn>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'bg-white/5 border-accent/30' : 'bg-transparent border-white/10 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-bold pr-8 transition-colors ${openIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === index ? 'bg-accent border-accent text-black rotate-45' : 'border-white/20 text-white/50 group-hover:border-white group-hover:text-white'}`}>
                    <Plus size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-white/60 font-light leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


import SEO from '../components/SEO';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showAuditPopup, setShowAuditPopup] = useState(false);

  // Trigger popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuditPopup(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const CLIENT_LOCATIONS = ["Ireland", "Cyprus", "United States", "India"];

  const TESTIMONIALS = [
    { name: "Philio", location: "Cyprus", text: "Bhanu Deep is exceptional!!" },
    { name: "Ian", location: "Ireland", text: "I'm very happy with the work, The page looks great." },
    { name: "Santosh", location: "India", text: "Excellent Result for the Investment" },
    { name: "Mark", location: "USA", text: "Frame n Flow Media is a game changer" },
  ];

  return (
    <div className="w-full overflow-hidden" ref={scrollRef}>
      <SEO
        title="Frame n Flow Media | Best Marketing Agency in USA, UK, India & Europe"
        description="Frame n Flow Media is a Strategy-First AI Marketing Agency serving USA, UK, India & Europe. We combine Business Intelligence & AI Visuals to drive qualified leads. 100% Refund Guarantee."
        schema={{
          "@context": "https://schema.org",
          "@type": ["Organization", "Corporation"],
          "name": "Frame n Flow Media",
          "alternateName": "Frame n Flow",
          "legalName": "Frame n Flow Media",
          "url": "https://framenflowmedia.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://framenflowmedia.in/logo.png",
            "width": "512",
            "height": "512"
          },
          "image": "https://framenflowmedia.in/logo.png",
          "description": "AI-Integrated Marketing Agency specializing in Business Intelligence, Generative AI Visuals, and Automated Growth Systems.",
          "foundingDate": "2025",
          "founder": {
            "@type": "Person",
            "name": "Bhanu Deep",
            "jobTitle": "Founder & Chief Strategist",
            "url": "https://framenflowmedia.in/founder-bhanudeep"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "India"
          },
          "areaServed": [
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "United Kingdom" },
            { "@type": "Country", "name": "India" },
            { "@type": "Continent", "name": "Europe" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Marketing Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Market Research & Intelligence" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Visual Production" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automated Growth Systems" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web & App Development" } }
            ]
          },
          "priceRange": "$$$",
          "sameAs": [
            "https://www.instagram.com/framenflowmedia/",
            "https://www.linkedin.com/company/frame-n-flow-media/?viewAsMember=true",
            "https://www.youtube.com/@framenflowmedia",
            "https://www.facebook.com/profile.php?id=61585218869613"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": ["English"]
          },
          "knowsAbout": [
            "Marketing Strategy",
            "Business Intelligence",
            "Performance Marketing",
            "AI Product Visuals",
            "Growth Systems"
          ]
        }}
      />

      {/* POPUP MODAL */}
      <AnimatePresence>
        {showAuditPopup && <AuditPopup onClose={() => setShowAuditPopup(false)} />}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-0 md:px-6 pt-20 overflow-hidden perspective-1000 bg-black">

        {/* HERO BACKGROUND - Pure Black with subtle grid only */}
        <BackgroundGrid />

        {/* Floating Doodles - Kept as content elements, but removed background noise/blobs */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <StarDoodle className="absolute bottom-[20%] right-[5%] md:bottom-[15%] md:right-[5%] w-4 h-4 md:w-6 md:h-6 text-white/30" delay={1.5} />
          <LightningDoodle className="absolute top-[25%] right-[10%] md:top-[15%] md:right-[5%] w-8 h-8 md:w-12 md:h-12 text-white/10" delay={1} />
        </div>

        <div className="container mx-auto relative z-10 flex flex-col items-center mix-blend-difference">

          {/* --- MOBILE LAYOUT (Stack: Highlighed Headline -> Grid -> Text -> Button) --- */}
          <div className="md:hidden w-full flex flex-col items-center mt-12 mb-12 relative z-10 overflow-hidden">

            {/* Scrolling Highlight 1: "Get qualified leads" - REDUCED SIZE */}
            <div className="w-screen relative py-8 overflow-hidden px-6">
              {/* Background Scroller Tape - Stretches full width with breathing space on edges */}
              <motion.div
                className="absolute inset-y-0 left-4 right-4 bg-accent flex items-center shadow-[0_0_35px_rgba(34,211,238,0.4)] rounded-2xl overflow-hidden"
              >
                <motion.div
                  className="flex whitespace-nowrap text-black font-black text-[100px] opacity-[0.1] pointer-events-none select-none"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {Array(10).fill("MARKETING • ").join("")}
                </motion.div>
              </motion.div>

              {/* Fixed Centered Text Layer - STRETCHED BOLD LOOK - SIZE ADJUSTED TO FIT BOX */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex justify-center w-full px-4"
              >
                <h2 className="text-black text-[8.5vw] font-display font-black whitespace-nowrap tracking-tighter uppercase leading-none">
                  AI-powered marketing
                </h2>
              </motion.div>
            </div>

            {/* Scrolling Highlight 2: "or 100% refund" - REDUCED SIZE */}
            <div className="w-screen relative py-6 mt-4 overflow-hidden px-6">
              {/* Background Scroller Tape (Opposite direction) - Breathing space on edges */}
              <motion.div
                className="absolute inset-y-0 left-4 right-4 bg-white/10 flex items-center backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden"
              >
                <motion.div
                  className="flex whitespace-nowrap text-white font-black text-[70px] opacity-[0.05] pointer-events-none select-none"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {Array(10).fill("SALES • ").join("")}
                </motion.div>
              </motion.div>

              {/* Fixed Centered Text Layer - STRETCHED BOLD LOOK - SIZE ADJUSTED TO FIT BOX */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 flex justify-center w-full px-4"
              >
                <h3 className="text-white text-[7vw] font-display font-black whitespace-nowrap tracking-tight uppercase leading-none">
                  built to drive real sales.
                </h3>
              </motion.div>
            </div>

            {/* Clients Grid - Placed below scrolling headlines - Lively Floating Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -3, 0] // Subtle liveliness
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.6 },
                scale: { duration: 0.5, delay: 0.6 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" } // Continuous float
              }}
              className="grid grid-cols-2 gap-3 w-full max-w-[340px] px-6 mt-14"
            >
              {/* Product Based - Static */}
              <div className="relative bg-white text-black text-xs font-bold py-3 px-2 rounded-xl flex items-center justify-center border border-white/20 z-30">
                📦 Product-Based
              </div>

              {/* Service Based - Static */}
              <div className="relative bg-white/20 border border-white/10 text-white text-xs font-bold py-3 px-2 rounded-xl flex items-center justify-center z-20">
                🤝 Service-Based
              </div>

              {/* Startups - Static */}
              <div className="relative bg-white/20 border border-white/30 text-white text-xs font-bold py-3 px-2 rounded-xl flex items-center justify-center z-20">
                🚀 Startups
              </div>

              {/* Realtors - Static */}
              <div className="relative bg-white text-black text-xs font-bold py-3 px-2 rounded-xl flex items-center justify-center z-20">
                🏠 Realtors
              </div>
            </motion.div>
          </div>

          {/* --- DESKTOP LAYOUT (Refactored - Horizontal Row) --- */}
          <div className="hidden md:flex flex-col items-center w-full max-w-7xl z-10">

            {/* Main Headline Group */}
            <div className="text-center mb-10">
              {/* Line 1 - Interactive */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="mb-4"
              >
                <motion.h1
                  initial={{ rotate: 0 }}
                  whileHover={{
                    scale: 1.02,
                    rotate: [-1, -0.5, -1.5, -1],
                    boxShadow: "0 0 50px rgba(34,211,238,0.4)"
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onHoverStart={playHoverCue}
                  className="relative inline-block bg-accent/80 text-black text-5xl md:text-7xl lg:text-8xl font-display font-bold px-10 py-4 whitespace-nowrap border border-accent/20 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.3)] cursor-pointer"
                >
                  AI-powered marketing
                </motion.h1>
              </motion.div>

              {/* Line 2 - Interactive */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
                className="mt-6"
              >
                <motion.span
                  initial={{ rotate: 1 }}
                  whileHover={{
                    scale: 1.02,
                    rotate: [1, 1.5, 0.5, 1],
                    backgroundColor: "rgba(255,255,255,0.08)"
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onHoverStart={playHoverCue}
                  className="relative inline-block bg-white/5 text-white text-3xl md:text-5xl lg:text-7xl font-display font-bold px-8 py-4 whitespace-nowrap border border-white/10 backdrop-blur-md rounded-2xl cursor-pointer"
                >
                  built to drive real sales.
                </motion.span>
              </motion.div>
            </div>

            {/* Categories Row - Horizontal Line Below Headline */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8 mb-12 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Product Based Button - Interactive */}
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.02, x: [0, 2, -2, 0] }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={playHoverCue}
                  className="bg-white text-black text-base font-bold px-8 py-4 rounded-xl border border-white/20 tracking-wider flex items-center cursor-pointer shadow-lg"
                >
                  📦 Product-Based
                </motion.div>
              </div>

              {/* Service Based Button - Interactive */}
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.02, x: [0, 2, -2, 0] }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={playHoverCue}
                  className="bg-white/20 border border-white/20 text-white text-base font-bold px-8 py-4 rounded-xl tracking-wider flex items-center cursor-pointer hover:bg-white/30"
                >
                  🤝 Service-Based
                </motion.div>
              </div>

              {/* Startups Button - Interactive */}
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.02, x: [0, 2, -2, 0] }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={playHoverCue}
                  className="bg-white/20 border border-white/40 text-white text-base font-bold px-8 py-4 rounded-xl tracking-wider flex items-center cursor-pointer hover:bg-white/30"
                >
                  🚀 Startups
                </motion.div>
              </div>

              {/* Realtors Button - Interactive */}
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.02, x: [0, 2, -2, 0] }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={playHoverCue}
                  className="bg-white text-black text-base font-bold px-8 py-4 rounded-xl tracking-wider flex items-center cursor-pointer shadow-lg"
                >
                  🏠 Realtors
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Shared Subtext & CTA - Positioned after layouts */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base md:text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed mb-10 md:mb-12 px-6 mt-8 md:mt-4 text-center z-10"
          >
            An AI-powered multimedia marketing agency. We don't just post content; we engineer <span className="text-white font-bold decoration-white underline underline-offset-4">market dominance</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, type: "spring" }}
            className="flex justify-center z-10"
          >
            <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>Book a Strategy Call</Button>
          </motion.div>
        </div>
      </section>

      {/* CLIENT LOCATIONS MARQUEE */}
      <section className="py-8 bg-black border-y border-white/5 overflow-hidden relative z-20">
        <div className="container mx-auto px-6 text-center mb-6">
          <span className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
            Working with Clients across
          </span>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
          <motion.div
            className="flex whitespace-nowrap items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                {CLIENT_LOCATIONS.map((loc, idx) => (
                  <div key={idx} className="flex items-center mx-6 md:mx-10">
                    <span className="text-lg md:text-2xl font-display font-semibold text-white/60">
                      {loc}
                    </span>
                    <div className="w-1 h-1 bg-white/20 rounded-full ml-12 md:ml-20" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS MARQUEE */}
      <section className="py-8 bg-[#e5e5e5] border-b border-white/5 overflow-hidden relative z-20">
        <div className="relative flex w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="flex items-center mx-10 md:mx-16">
                    <div className="flex flex-col text-left">
                      <span className="text-lg md:text-2xl font-display font-bold text-black">"{t.text}"</span>
                      <span className="text-xs font-mono text-black/70 mt-1 uppercase tracking-wider">— {t.name} ({t.location})</span>
                    </div>
                    {/* Divider */}
                    <div className="w-2 h-2 rounded-full bg-accent ml-10 md:ml-16" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* APPROACH SECTION (Renamed from Ecosystem) */}
      <section className="py-12 md:py-20 bg-surface relative overflow-visible">
        {/* Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="mb-10 text-center flex flex-col items-center">
            <FadeIn>
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-2 block">How It Works</span>
              <h2 className="text-3xl md:text-6xl font-display font-bold leading-tight">
                The Approach
              </h2>
            </FadeIn>
          </div>

          {/* Staggered Animated Cards Container - 4 Columns on Large */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* CARD 1: RESEARCH (Black -> Electric Blue) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative w-full aspect-[4/5]"
            >
              {/* Box Gradient: Black to Blue */}
              <div className="relative h-full bg-gradient-to-b from-black to-accent border border-white/10 rounded-3xl p-2 overflow-hidden flex flex-col shadow-xl">

                {/* Visual Content - Dark Window */}
                <div className="flex-1 rounded-2xl bg-[#0a0a0a] m-2 relative overflow-hidden flex items-center justify-center border border-white/10">
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
                  <LaptopCard />
                </div>

                {/* Text Content - Sits on Blue Bottom (Text Black) */}
                <div className="p-6 text-center">
                  <div className="w-8 h-8 bg-black/20 text-black border border-black/10 rounded-full flex items-center justify-center mx-auto mb-4 font-mono text-sm">1</div>
                  <p className="text-black font-medium text-xs leading-relaxed">
                    We scan competitors to find exactly where to attack.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: AUDIO (Electric Blue -> White) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative w-full aspect-[4/5] md:translate-y-12 lg:translate-y-0"
            >
              {/* Box Gradient: Blue to White */}
              <div className="relative h-full bg-gradient-to-b from-accent to-white border border-white/10 rounded-3xl p-2 overflow-hidden flex flex-col shadow-xl">

                {/* Visual Content - Dark Window */}
                <div className="flex-1 rounded-2xl bg-[#0a0a0a] m-2 relative overflow-hidden flex items-center justify-center border border-black/10">
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
                  <MusicCard />
                </div>

                {/* Text Content - Sits on White Bottom (Text Black) */}
                <div className="p-6 text-center">
                  <div className="w-8 h-8 bg-black/10 text-black border border-black/5 rounded-full flex items-center justify-center mx-auto mb-4 font-mono text-sm">2</div>
                  <p className="text-black font-medium text-xs leading-relaxed">
                    Custom AI beats generated for your brand's vibe.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: VISUALS (White -> Black) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative w-full aspect-[4/5]"
            >
              {/* Box Gradient: White to Black */}
              <div className="relative h-full bg-gradient-to-b from-white to-black border border-white/10 rounded-3xl p-2 overflow-hidden flex flex-col shadow-xl">

                {/* Visual Content - Dark Window */}
                <div className="flex-1 rounded-2xl bg-[#0a0a0a] m-2 relative overflow-hidden flex items-center justify-center border border-black/10">
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
                  <VisualsCard />
                </div>

                {/* Text Content - Sits on Black Bottom (Text White) */}
                <div className="p-6 text-center">
                  <div className="w-8 h-8 bg-white/10 text-white border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-mono text-sm">3</div>
                  <p className="text-white text-xs leading-relaxed">
                    Studio-quality assets. <br /><span className="font-bold">90% Cost Reduction.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: REVENUE (Blue -> White -> Black) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative w-full aspect-[4/5] md:translate-y-12 lg:translate-y-0"
            >
              {/* Box Gradient: Tricolor */}
              <div className="relative h-full bg-gradient-to-br from-accent via-white to-black border border-white/10 rounded-3xl p-2 overflow-hidden flex flex-col shadow-xl">

                {/* Visual Content - Dark Window */}
                <div className="flex-1 rounded-2xl bg-[#0a0a0a] m-2 relative overflow-hidden flex items-center justify-center border border-black/10">
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
                  <RevenueCard />
                </div>

                {/* Text Content - Sits on Black Bottom (Text White) */}
                <div className="p-6 text-center">
                  <div className="w-8 h-8 bg-white/10 text-white border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-mono text-sm">4</div>
                  <p className="text-white text-xs leading-relaxed">
                    Qualified Leads or <br /><span className="text-accent font-bold">100% Refund</span>.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="mt-10 text-center">
            <NavLink to="/approach">
              <Button variant="outline" className="group border-accent/50 text-accent hover:bg-accent hover:text-black">
                See Full Approach
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - DUAL PATHWAYS */}
      <section className="py-12 md:py-24 px-6 relative overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto relative z-10 max-w-6xl">
          <FadeIn className="mb-14 text-center">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Choose Your Path</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How We Scale Brands</h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">
              We combine creative dominance with operational intelligence. Select your growth engine.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* PATH 1: MARKETING */}
            <FadeIn className="group relative h-full">
              <div
                onClick={() => navigate('/services', { state: { activeTab: 'marketing' } })}
                className="h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden relative transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] cursor-pointer flex flex-col"
              >
                {/* Image/Visual Top */}
                <div className="h-64 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs text-white font-bold flex items-center gap-2">
                    <Camera size={14} className="text-accent" />
                    Creative Infrastructure
                  </div>
                </div>

                {/* Content Bottom */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors">Marketing</h3>
                  <p className="text-white/60 leading-relaxed mb-8 flex-1">
                    Dominant visuals, high-converting websites, and data-driven ad campaigns. The "Frontend" of your success.
                  </p>

                  <div className="flex items-center gap-4 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                    Explore Services <ArrowRight size={16} className="text-accent" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* PATH 2: WEB/APP DEV */}
            <FadeIn delay={0.1} className="group relative h-full">
              <div
                onClick={() => navigate('/services', { state: { activeTab: 'webdev' } })}
                className="h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden relative transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer flex flex-col"
              >
                {/* Image/Visual Top */}
                <div className="h-64 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                  <div className="absolute top-6 left-6 bg-emerald-500/10 backdrop-blur border border-emerald-500/20 px-3 py-1 rounded-full text-xs text-emerald-300 font-bold flex items-center gap-2">
                    <Code size={14} />
                    Digital Infrastructure
                  </div>
                </div>

                {/* Content Bottom */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Web & App Dev</h3>
                  <p className="text-white/60 leading-relaxed mb-8 flex-1">
                    Lightning-fast websites and custom apps built on modern infrastructure. SEO-optimized and AI-ready.
                  </p>

                  <div className="flex items-center gap-4 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                    View Architecture <ArrowRight size={16} className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* PATH 2: AUTOMATION */}
            <FadeIn delay={0.2} className="group relative h-full">
              <div
                onClick={() => navigate('/services', { state: { activeTab: 'automation' } })}
                className="h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden relative transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer flex flex-col"
              >
                {/* Image/Visual Top */}
                <div className="h-64 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                  <div className="absolute top-6 left-6 bg-purple-500/10 backdrop-blur border border-purple-500/20 px-3 py-1 rounded-full text-xs text-purple-300 font-bold flex items-center gap-2">
                    <Bot size={14} />
                    AI Systems
                  </div>
                </div>

                {/* Content Bottom */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Automation</h3>
                  <p className="text-white/60 leading-relaxed mb-8 flex-1">
                    Intelligent chatbots, CRM agents, and 24/7 lead nurturing. The "Backend" engine of your growth.
                  </p>

                  <div className="flex items-center gap-4 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                    Explore AI Tools <ArrowRight size={16} className="text-purple-400" />
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-12 md:py-20 bg-surfaceHighlight relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1 relative">
              <FadeIn>
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-black/50 border border-white/5">
                  {/* Founder Image with Fallback */}
                  <img
                    src="/bhanudeep.png?v=new"
                    alt="Bhanu Deep - Founder"
                    className="w-full h-full object-cover object-top transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-xl font-bold text-white">Bhanu Deep</p>
                    <p className="text-sm text-accent">Founder & Lead Strategist</p>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 md:pl-12">
              <FadeIn delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                  "We don't sell content.<br />
                  We sell market dominance."
                </h2>
                <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
                  In a world of noise, clarity is the ultimate competitive advantage.
                  Frame n Flow Media was built to bridge the gap between creative chaos and business logic.
                </p>
                <NavLink to="/founder-bhanudeep">
                  <Button variant="outline">Read Full Bio</Button>
                </NavLink>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* CTA SECTION */}
      <section className="py-20 flex items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
        <div className="max-w-3xl relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to engineer your growth?</h2>
            <p className="text-xl text-white/50 mb-12 font-light">
              No sales pitches. Just a strategy session to see if we're a fit.
            </p>
            <Button
              onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}
              className="mx-auto"
              style={{ minWidth: '200px' }}
            >
              Start the Conversation
            </Button>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};

export default Home;