import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Zap, Layers, DollarSign, Play, CheckCircle2, Cpu, Aperture, Repeat, Music, Mic, Headphones, Radio, Volume2, Globe, Database, Smartphone, Code, Plus } from 'lucide-react';
import SEO from '../components/SEO';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const RevealText: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <div className={`overflow-hidden relative ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

interface WorkProps {
  tab?: 'visuals' | 'dev' | 'selection';
}

const Work: React.FC<WorkProps> = ({ tab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'visuals' | 'dev' | 'selection'>(tab || 'selection');
  const [visualMode, setVisualMode] = useState<'kinetic' | 'static'>('kinetic');

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    } else {
      const state = location.state as { activeTab?: 'visuals' | 'dev' } | null;
      if (state?.activeTab) {
        setActiveTab(state.activeTab);
      } else {
        setActiveTab('selection');
      }
    }
  }, [location, tab]);

  let seoTitle = "Our Work | Frame n Flow Media - Marketing & Web Portfolio";
  let seoDescription = "Browse our collection of marketing systems and custom web development projects designed for premium brands.";
  let seoCanonical = "/work";
  let seoSchema: any = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Frame n Flow Media Portfolio Pillars",
    "description": "Explore our portfolio of marketing systems and custom website development.",
    "url": "https://framenflowmedia.in/work"
  };

  if (activeTab === 'dev') {
    seoTitle = "Website Development Projects | Bangalore Web Dev Portfolio";
    seoDescription = "Explore our custom-built Next.js and React websites. High-performance web development projects in Bangalore engineered for conversions and SEO.";
    seoCanonical = "/work/website-development";
    seoSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Website Development Portfolio Bangalore",
      "description": "Premium React & Next.js websites built in Bangalore.",
      "url": "https://framenflowmedia.in/work/website-development"
    };
  } else if (activeTab === 'visuals') {
    seoTitle = "Complete Marketing Systems Portfolio | Frame n Flow Media";
    seoDescription = "Explore our high-converting campaigns, photorealistic AI product visuals, and automated growth paths.";
    seoCanonical = "/work/ai-visuals";
    seoSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Complete Marketing Systems Portfolio",
      "description": "High-converting campaigns, photorealistic AI product visuals, and automated growth paths.",
      "url": "https://framenflowmedia.in/work/ai-visuals"
    };
  }

  // KINETIC SEQUENCES (VIDEOS)
  const kineticPortfolio = [
    {
      url: "https://www.instagram.com/reel/DUlsQNhEgjR/embed",
      title: "Cinematic Motion",
      description: "High-fidelity motion graphics for premium brand storytelling."
    },
    {
      url: "https://www.instagram.com/reel/DUWGfzHjMle/embed",
      title: "Dynamic Flow",
      description: "Seamless visual transitions designed to capture audience attention."
    },
    {
      url: "https://www.instagram.com/reel/DUgOmapClt6/embed",
      title: "Visual Synthesis",
      description: "AI-driven video generation tailored for social media engagement."
    },
    {
      url: "https://www.instagram.com/reel/DUBr01riV4x/embed",
      title: "Abstract Energy",
      description: "Energetic visual loops that convey brand dynamism and power."
    },
    {
      url: "https://www.instagram.com/reel/DN2Gtyy6lQb/embed",
      title: "Luxury Product Showcase",
      description: "Highlighting exquisite details with photorealistic light and physics simulations."
    },
    {
      url: "https://www.instagram.com/reel/DSkyKTyE-mM/embed",
      title: "Digital Fashion",
      description: "Dynamic fabric simulation and model animation for high-end editorial campaigns."
    },
    {
      url: "https://www.instagram.com/reel/DS9jkQuEodb/embed",
      title: "Brand Anthem",
      description: "Evocative visual storytelling designed to build emotional resonance."
    },
    {
      url: "https://www.instagram.com/reel/DSZ07pqErV7/embed",
      title: "Immersive Environments",
      description: "Transporting audiences to brand-aligned worlds through generative set design."
    },
    {
      url: "https://www.instagram.com/reel/DNuYV9KQlac/embed",
      title: "AI Production",
      description: "End-to-end commercial generation reducing production time from weeks to days."
    },
    {
      url: "https://www.instagram.com/reel/DT9gDAEEys1/embed",
      title: "Social Engagement",
      description: "Hyper-visual loops engineered to stop the scroll and maximize retention."
    },
    {
      url: "https://www.instagram.com/reel/DTvUUoUDAtO/embed",
      title: "High-Velocity Edit",
      description: "Seamless transitions and pacing for impactful promotional content."
    },
    {
      url: "https://www.instagram.com/reel/DTTJ9Krkg3-/embed",
      title: "Concept Visualization",
      description: "Bringing abstract creative concepts to life with stunning clarity."
    },
  ];

  // STATIC ARTIFACTS (IMAGES)
  const staticPortfolio = [
    {
      url: "https://www.instagram.com/p/DUlr23iiWxT/embed",
      title: "Editorial Composition",
      description: "Studio-grade lighting and composition in a digital environment."
    },
    {
      url: "https://www.instagram.com/p/DUBro5HAU7F/embed",
      title: "Product Focus",
      description: "Clean, distraction-free product presentation with perfect lighting."
    },
    {
      url: "https://www.instagram.com/p/DUBsCmCDyc2/embed",
      title: "Texture Study",
      description: "Detailed exploration of digital materials and surfaces."
    },
    {
      url: "https://www.instagram.com/p/DUWGwtlEdtH/embed",
      title: "Atmospheric Depth",
      description: "Creating a sense of space and mood through synthesized imagery."
    },
    {
      url: "https://www.instagram.com/p/DT3F0HKFAR_/embed",
      title: "Editorial Portraiture",
      description: "Striking, high-fidelity character generation for campaigns."
    },
    {
      url: "https://www.instagram.com/p/DSSR-htjbNd/embed",
      title: "Atmospheric Settings",
      description: "Mood-driven environments perfect for immersive brand backdrops."
    },
    {
      url: "https://www.instagram.com/p/DTOA45oEgWC/embed",
      title: "Virtual Architecture",
      description: "Design concepts and spatial visualization beyond physical limitations."
    },
    {
      url: "https://www.instagram.com/p/DT2tw6fiS27/embed",
      title: "Visual Effects Art",
      description: "Eye-catching textures and artistic distortions for social feeds."
    },
    {
      url: "https://www.instagram.com/p/DSkx0HICCeh/embed",
      title: "Surreal Product Staging",
      description: "Placing products in imaginative, attention-grabbing contexts."
    },
    {
      url: "https://www.instagram.com/p/DT2Z2CDEsmu/embed",
      title: "Color Exploration",
      description: "Defining unique brand palettes through AI-generated mood boards."
    },
    {
      url: "https://www.instagram.com/p/DSrpBZjiKG1/embed",
      title: "Graphic Textures",
      description: "Unique background elements and patterns for web and digital design."
    },
    {
      url: "https://www.instagram.com/p/DT74ht3FBA9/embed",
      title: "Minimalist Design",
      description: "Clean, focused visuals that utilize negative space effectively."
    },
    {
      url: "https://www.instagram.com/p/DSSO7zKDTgN/embed",
      title: "Cinematic Stills",
      description: "Keyframes involving high-dynamic-range composition to tell a story."
    },
  ];



  const devPortfolio = [
    {
      url: "https://www.thegraftonvault.com",
      title: "The Grafton Vault",
      thumbnail: "https://thegraftonvault.com/temp/main_logo_bg.png",
      description: "A premium digital vault experience. High-security backend architecture with a luxurious, motion-rich frontend interface."
    },
    {
      url: "https://imbs.org.in/",
      title: "IMBS",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://imbs.org.in/",
      description: "Institute of Management and Business Studies. A premium, high-converting educational portal featuring interactive course selectors and GSAP animations."
    },
    {
      url: "https://sakurastudio.in/",
      title: "Sakura Studio",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://sakurastudio.in/",
      description: "A premium e-commerce fashion destination specializing in trend-forward women's apparel. Built with conversion-focused UX and seamless Shopify integrations."
    },
    {
      url: "https://nihirafinserv.com/",
      title: "Nihira Finserv",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://nihirafinserv.com/",
      description: "A premium wealth management and financial advisory platform. Engineered for seamless navigation, dynamic calculator tools, and highly optimized lead capture workflows."
    },
    {
      url: "https://connvel.in",
      title: "Connvel",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://connvel.in/",
      description: "Next-gen networking platform. Real-time data synchronization, AI-enhanced user matching, and a fluid, app-like web experience."
    },
    {
      url: "https://jacobotennis.netlify.app/",
      title: "Jacobo Hernandez Tennis",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://jacobotennis.netlify.app/",
      description: "Elite high-performance tennis coaching platform. Features a premium, dynamic interface tailored for professional athlete development and mentorship."
    },
    {
      url: "https://realestatehyd.netlify.app/",
      title: "Real Grow Realtors",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://realestatehyd.netlify.app/",
      description: "A premium real estate platform for luxury properties in Hyderabad. Features high-end property listings, interactive maps, and a seamless lead generation system."
    },
    {
      url: "https://dosaxpress.netlify.app/",
      title: "Dosa Xpress",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://dosaxpress.netlify.app/",
      description: "A modern, vibrant landing page for an Indian fast-casual restaurant, featuring high-quality food photography and seamless ordering flow."
    },
    {
      url: "https://mniconcrete.netlify.app/",
      title: "MNI Concrete",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://mniconcrete.netlify.app/",
      description: "Professional landing page for concrete and construction services, showcasing industrial expertise with a clean, trustworthy aesthetic."
    },
    {
      url: "https://amazonppclearn.com/",
      title: "Amazon PPC Learn",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://amazonppclearn.com/",
      description: "A comprehensive learning platform for Amazon PPC mastery. Features a clean, educational-focused UI with optimized performance for large-scale video content and interactive modules."
    },
    {
      url: "https://aiautomationbiz.netlify.app/",
      title: "AI Automation Biz",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://aiautomationbiz.netlify.app/",
      description: "Futuristic and high-tech platform for AI automation services, featuring sleek UI elements and data-driven workflow visualizations."
    },
    {
      url: "https://framenflowmedia.in",
      title: "Frame n Flow Media",
      thumbnail: "https://image.thum.io/get/width/600/crop/800/https://framenflowmedia.in/",
      description: "Our own digital HQ. A testament to performance optimization, SEO dominance, and immersive storytelling."
    }
  ];

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden pb-20">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={seoCanonical}
        schema={seoSchema}
      />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      {/* HEADER & TOGGLE SECTION */}
      <div className="container mx-auto px-6 mb-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <RevealText>
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Our Portfolio</span>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-tight">
              Selected Works
            </h1>
          </RevealText>

          {activeTab !== 'selection' && (
            <div className="flex flex-wrap justify-center gap-4 mt-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
              <button
                onClick={() => navigate('/work/ai-visuals')}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'visuals' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Aperture size={18} />
                Complete Marketing Systems
              </button>
              <button
                onClick={() => navigate('/work/website-development')}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'dev' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Code size={18} />
                Web & App Dev
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ==================== SELECTION SUBPAGE ==================== */}
        {activeTab === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-4 relative z-20 flex flex-col items-center"
          >
            <div className="absolute inset-x-0 -top-40 h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-center mb-8 leading-tight max-w-4xl"
            >
              Explore our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Portfolio Pillars</span>
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">

              {/* VISUALS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => navigate('/work/ai-visuals')}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />

                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Aperture size={28} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Complete Marketing Systems</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    High-converting campaigns, photorealistic AI assets, and automated acquisition paths that turn traffic into customers.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-accent font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  View Works <span className="ml-2">→</span>
                </div>
              </motion.div>

              {/* DEV CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => navigate('/work/website-development')}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors" />

                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Web & App Dev</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Premium custom websites and applications engineered for high conversion, local SEO dominance, and visual speed.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-green-400 font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  View Works <span className="ml-2">→</span>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}

        {/* ==================== VISUALS SUBPAGE ==================== */}
        {activeTab === 'visuals' && (
          <motion.div
            key="visuals"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* VISUALS HERO TEXT */}
            <div className="container mx-auto px-6 mb-12 text-center">
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                Studio quality without the studio. Our generative workflows create visuals that are indistinguishable from reality, yet impossible to film.
              </p>

              {/* MODE SWITCHER (Minimalist Glow Style) */}
              <div className="flex items-center justify-center gap-1 mb-8">
                <div className="inline-flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1.5 relative shadow-inner">
                  <button
                    onClick={() => setVisualMode('kinetic')}
                    className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${visualMode === 'kinetic' ? 'text-black bg-accent shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                  >
                    <Play size={14} className={visualMode === 'kinetic' ? 'fill-current' : ''} />
                    Motion
                  </button>
                  <button
                    onClick={() => setVisualMode('static')}
                    className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${visualMode === 'static' ? 'text-black bg-accent shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                  >
                    <Aperture size={14} />
                    Stills
                  </button>
                </div>
              </div>
            </div>

            {/* VISUALS CONTENT GRID */}
            <div className="container mx-auto px-6 mb-32 relative z-10">
              <AnimatePresence mode="wait">
                {visualMode === 'kinetic' ? (
                  <motion.div
                    key="kinetic-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {kineticPortfolio.map((item, index) => (
                      <FadeIn key={`vid-${index}`} delay={index * 0.1} className="flex flex-col h-full">
                        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group h-full flex flex-col hover:border-accent/40 transition-all duration-300">
                          <div className="relative w-full aspect-[9/16] md:aspect-[4/5] bg-black">
                            <iframe
                              src={`${item.url}/captioned/`}
                              className="absolute inset-0 w-full h-full object-cover"
                              frameBorder="0"
                              scrolling="no"
                              allowTransparency={true}
                              title={item.title}
                            ></iframe>
                          </div>
                          <div className="p-6 border-t border-white/5 bg-surfaceHighlight flex-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-300">
                              <Play size={24} className="text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-white/50">{item.description}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="static-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {staticPortfolio.map((item, index) => (
                      <FadeIn key={`img-${index}`} delay={index * 0.1} className="flex flex-col h-full">
                        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group h-full flex flex-col hover:border-accent/40 transition-all duration-300">
                          <div className="relative w-full aspect-[4/5] bg-black">
                            <iframe
                              src={`${item.url}/captioned/`}
                              className="absolute inset-0 w-full h-full object-cover"
                              frameBorder="0"
                              scrolling="no"
                              allowTransparency={true}
                              title={item.title}
                            ></iframe>
                          </div>
                          <div className="p-6 border-t border-white/5 bg-surfaceHighlight flex-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-300">
                              <Aperture size={24} className="text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-white/50">{item.description}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VISUALS CONTENT: THE AI ADVANTAGE */}
            <div className="bg-surfaceHighlight border-y border-white/5 py-24 relative overflow-hidden">

              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16">
                  <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Why We Switched to AI.</h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed">
                      Traditional production is slow, expensive, and rigid. AI production is instant, infinite, and hyper-efficient.
                    </p>
                  </FadeIn>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <FadeIn delay={0.1}>
                    <div className="bg-background/50 p-8 rounded-2xl border border-white/10 h-full hover:border-accent/30 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6"><DollarSign size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-4">90% Cost Reduction</h3>
                      <p className="text-white/50 leading-relaxed mb-4">No equipment rental. No studio booking. No travel costs. No large crews.</p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <div className="bg-background/50 p-8 rounded-2xl border border-white/10 h-full hover:border-accent/30 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6"><Zap size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-4">Production at Light Speed</h3>
                      <p className="text-white/50 leading-relaxed mb-4">Rapid A/B testing. Instant re-shoots. Change backgrounds in seconds.</p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.3}>
                    <div className="bg-background/50 p-8 rounded-2xl border border-white/10 h-full hover:border-accent/30 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6"><Layers size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-4">Physics-Defying Creativity</h3>
                      <p className="text-white/50 leading-relaxed mb-4">Showcase products in environments impossible to film in real life.</p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </motion.div>
        )}



        {/* ==================== DEV SUBPAGE ==================== */}
        {activeTab === 'dev' && (
          <motion.div
            key="dev"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* DEV HERO TEXT */}
            <div className="container mx-auto px-6 mb-16 text-center">
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                We engineer digital growth engines. By merging high-end aesthetics with potent AI backends, we create web experiences that convert.
              </p>
            </div>

            {/* DEV GRID */}
            <div className="container mx-auto px-6 mb-32 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {devPortfolio.map((item, index) => (
                  <FadeIn key={index} delay={index * 0.1} className="flex flex-col h-full">
                    <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group h-full flex flex-col hover:border-accent/40 transition-all duration-300">
                      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-shadow duration-500">
                        {/* Browser Top Bar Mockup */}
                        <div className="absolute top-0 left-0 right-0 h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-1.5 z-20">
                          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>

                        {/* Website Preview */}
                        <div className="absolute inset-0 pt-6 bg-gradient-to-br from-[#141414] to-[#080808]">
                          {/* Elegant visual placeholder underneath the image */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#141414] to-[#080808] z-0">
                            <Globe size={40} className="text-accent/20 mb-2 group-hover:text-accent/40 transition-colors duration-300" />
                            <span className="text-[10px] text-white/30 tracking-widest uppercase font-mono">
                              {item.url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0]}
                            </span>
                          </div>

                          {item.thumbnail ? (
                            <img 
                              src={item.thumbnail} 
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 relative z-10"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <img 
                              src={`https://image.thum.io/get/width/600/crop/800/${item.url}`} 
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 relative z-10"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>

                        {/* Visit Overlay */}
                        <div
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-30 backsplash-blur-sm"
                          onClick={() => window.open(item.url, '_blank')}
                        >
                          <div className="flex items-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Globe size={18} />
                            Visit Live Site
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border-t border-white/5 bg-surfaceHighlight flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <Code size={14} />
                          </div>
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* DEV FEATURES: MAGICAL TECHY SPECS */}
            <div className="bg-[#050505] border-y border-white/5 py-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16">
                  <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">The Full Stack Advantage.</h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed">
                      Beauty is nothing without brains. We build systems that are as intelligent as they are beautiful.
                    </p>
                  </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FadeIn delay={0.1}>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#0f0f0f] transition-colors group">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Cpu size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">AI-Native Integration</h3>
                      <p className="text-white/50 leading-relaxed">
                        We don't just bolt on AI; we weave it into the core. From LLM-powered search to predictive user flows and personalized content generation, your site thinks for itself.
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#0f0f0f] transition-colors group">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Zap size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Hyper-Automation</h3>
                      <p className="text-white/50 leading-relaxed">
                        Your website should work while you sleep. We automate lead qualification, CRM entry, and follow-up sequences, turning traffic into revenue without manual input.
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.3}>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#0f0f0f] transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Database size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Robust Data Architecture</h3>
                      <p className="text-white/50 leading-relaxed">
                        Built on scalable cloud infrastructure with Supabase or Firebase. We ensure zero-downtime, sub-second latency, and bank-grade security for your users' data.
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.4}>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#0f0f0f] transition-colors group">
                      <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Layers size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Killer Aesthetics</h3>
                      <p className="text-white/50 leading-relaxed">
                        First impressions are visual. We deploy Framer Motion, WebGL, and custom GSAP animations to create a "wow" factor that establishes immediate authority.
                      </p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>

            {/* BANGALORE WEBSITE DEVELOPMENT PORTFOLIO GEO-FAQ SECTION */}
            <LocalFAQ
              title="Frequently Asked Questions"
              subtitle="Common questions about our website engineering case studies and performance in Bangalore."
              faqs={BANGALORE_PORTFOLIO_FAQS}
            />

          </motion.div>
        )}
      </AnimatePresence>

      {/* CALL TO ACTION */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-accent/5 border border-accent/20 rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to upgrade your brand's impact?</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Whether it's visuals that stop the scroll or sounds that stick in the mind, we build it.
          </p>
          <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>
            Book a Demo
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Work;

// --- LOCALIZED PORTFOLIO FAQ DATA ---
const BANGALORE_PORTFOLIO_FAQS = [
  {
    question: "How do your Bangalore web development case studies prove conversion success?",
    answer: "Every project in our portfolio—from premium financial portals like Nihira Finserv to ultra-secure architectures like The Grafton Vault—is engineered to solve concrete business bottlenecks. By implementing custom-coded Next.js/React frontends, we regularly improve client page load speeds by 300% and lead-form conversion rates by over 40%."
  },
  {
    question: "Can I view the core speed and SEO metrics for your Bangalore web projects?",
    answer: "Absolutely. All our web architectures are built to pass Google's strict Core Web Vitals. We optimize for high Largest Contentful Paint (LCP) and low Interaction to Next Paint (INP). We embed structured JSON-LD schema so search bots and AI engines can instantly index and recommend our client websites."
  },
  {
    question: "Do you offer post-launch maintenance for businesses in Bangalore?",
    answer: "Yes. We offer enterprise-grade maintenance packages that cover continuous security scans, speed updates, content changes, and uptime tracking, so Bangalore businesses can focus on scaling their operations while we manage their web stability."
  }
];

// --- LOCAL ACCORDION FAQ COMPONENT ---
const LocalFAQ: React.FC<{
  title: string;
  subtitle: string;
  faqs: { question: string; answer: string }[];
}> = ({ title, subtitle, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20 bg-transparent border-t border-white/5 relative overflow-hidden w-full text-left">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{title}</h2>
          <p className="text-lg text-white/50 font-light">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-bold pr-8 transition-colors ${openIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-white border-white text-black rotate-45'
                      : 'border-white/20 text-white/50 group-hover:border-white group-hover:text-white'
                  }`}
                >
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
                    <div className="px-6 pb-6 text-white/60 font-light leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};