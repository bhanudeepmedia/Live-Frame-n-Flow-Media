import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { Zap, Layers, DollarSign, Play, CheckCircle2, Cpu, Aperture, Repeat, Music, Mic, Headphones, Radio, Volume2, Globe, Database, Smartphone, Code } from 'lucide-react';
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

const Work: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visuals' | 'sonic' | 'dev'>('visuals');
  const [visualMode, setVisualMode] = useState<'kinetic' | 'static'>('kinetic');

  // KINETIC SEQUENCES (VIDEOS)
  const kineticPortfolio = [
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

  const sonicPortfolio = [
    {
      url: "https://www.instagram.com/reel/DSUP84oEgyY/embed",
      title: "Frame n Flow Signature",
      description: "Original sonic identity composed for brand authority and recall."
    },
    {
      url: "https://www.instagram.com/reel/DTp2jKbk1k6/embed",
      title: "Sonic Brand integration",
      description: "Seamless audio integration designed to amplify brand presence across social platforms."
    }
  ];

  const devPortfolio = [
    {
      url: "https://www.thegraftonvault.com",
      title: "The Grafton Vault",
      description: "A premium digital vault experience. High-security backend architecture with a luxurious, motion-rich frontend interface."
    },
    {
      url: "https://connvel.in",
      title: "Connvel",
      description: "Next-gen networking platform. Real-time data synchronization, AI-enhanced user matching, and a fluid, app-like web experience."
    },
    {
      url: "https://framenflowmedia.in",
      title: "Frame n Flow Media",
      description: "Our own digital HQ. A testament to performance optimization, SEO dominance, and immersive storytelling."
    }
  ];

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden pb-20">
      <SEO
        title="Our Work | Frame n Flow Media - AI Visuals & Strategy Portfolio"
        description="Explore our portfolio of AI product visuals, sonic branding, and high-performance marketing campaigns. See how we help brands dominate."
        canonical="/work"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Frame n Flow Media Portfolio",
          "description": "A collection of AI visuals, sonic branding, and web development projects.",
          "url": "https://framenflowmedia.in/work",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "CreativeWork",
                "position": 1,
                "name": "Luxury Product Showcase",
                "description": "Photorealistic light and physics simulations for luxury products."
              },
              {
                "@type": "CreativeWork",
                "position": 2,
                "name": "Digital Fashion",
                "description": "Dynamic fabric simulation and model animation."
              },
              {
                "@type": "CreativeWork",
                "position": 3,
                "name": "Sonic Branding Signature",
                "description": "Original sonic identity composed for brand authority."
              }
            ]
          }
        }}
      />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      {/* HEADER & TOGGLE SECTION */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <RevealText>
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Our Portfolio</span>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-tight">
              Selected Works
            </h1>
          </RevealText>

          <div className="flex flex-wrap justify-center gap-4 mt-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('visuals')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'visuals' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <Aperture size={18} />
              AI Studio Visuals
            </button>
            <button
              onClick={() => setActiveTab('sonic')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'sonic' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <Music size={18} />
              Sonic Branding
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'dev' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <Code size={18} />
              Web & App Dev
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">

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

        {/* ==================== SONIC SUBPAGE ==================== */}
        {activeTab === 'sonic' && (
          <motion.div
            key="sonic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* SONIC HERO TEXT */}
            <div className="container mx-auto px-6 mb-16 text-center">
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                Brand identity isn't just what you see—it's what you hear. We curate dedicated original songs and sonic signatures that trigger instant brand recall.
              </p>
            </div>

            {/* SONIC GRID */}
            <div className="container mx-auto px-6 mb-32 relative z-10">
              {/* Center the single item if there's only one, otherwise grid */}
              <div className={`grid grid-cols-1 ${sonicPortfolio.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'justify-center'} gap-8`}>
                {sonicPortfolio.map((item, index) => (
                  <FadeIn key={index} delay={index * 0.1} className={`flex flex-col h-full ${sonicPortfolio.length === 1 ? 'max-w-md mx-auto w-full' : ''}`}>
                    <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group h-full flex flex-col">
                      <div className="relative w-full aspect-[9/16] bg-black">
                        <iframe
                          src={`${item.url}/captioned/`}
                          className="absolute inset-0 w-full h-full object-cover"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency={true}
                          title={item.title}
                        ></iframe>
                      </div>
                      <div className="p-6 border-t border-white/5 bg-surfaceHighlight flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <Volume2 size={14} />
                          </div>
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        </div>
                        <p className="text-sm text-white/50">{item.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* SONIC CONTENT: THE PSYCHOLOGY OF SOUND */}
            <div className="bg-surfaceHighlight border-y border-white/5 py-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16">
                  <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">The Sound of Authority.</h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed">
                      Music bypasses the logical brain and hits the emotional core directly. A custom sonic identity makes your brand felt before it is understood.
                    </p>
                  </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <FadeIn delay={0.1}>
                    <div className="bg-background/50 p-8 rounded-2xl border border-white/10 h-full hover:border-accent/30 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6"><Headphones size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-4">Original Composition</h3>
                      <p className="text-white/50 leading-relaxed mb-4">
                        No stock music. No generic beats. We compose original scores that map specifically to your brand's archetype and energy.
                      </p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <div className="bg-background/50 p-8 rounded-2xl border border-white/10 h-full hover:border-accent/30 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6"><Radio size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-4">Neuro-Audio Engineering</h3>
                      <p className="text-white/50 leading-relaxed mb-4">
                        We use tempo, key, and instrumentation designed to maximize attention retention on social platforms like Reels and TikTok.
                      </p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.3}>
                    <div className="bg-background/50 p-8 rounded-2xl border border-white/10 h-full hover:border-accent/30 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6"><Mic size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-4">Voice & Tone</h3>
                      <p className="text-white/50 leading-relaxed mb-4">
                        Beyond music, we curate the vocal texture of your brand. AI voice models or human talent that perfectly align with your message.
                      </p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>

            {/* SONIC PROCESS */}
            <div className="container mx-auto px-6 py-24">
              <div className="max-w-4xl mx-auto">
                <FadeIn className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">The Sonic Workflow.</h2>
                  <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
                </FadeIn>

                <div className="space-y-6">
                  <FadeIn delay={0.1}>
                    <div className="flex items-start gap-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-colors">
                      <div className="text-4xl font-display font-bold text-white/10">01</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Auditory Audit</h3>
                        <p className="text-white/50">We analyze your competitors and your current brand assets to identify the "white space" in the market's soundscape.</p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <div className="flex items-start gap-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-colors">
                      <div className="text-4xl font-display font-bold text-white/10">02</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Composition & Synthesis</h3>
                        <p className="text-white/50">Our composers and AI engineers build the track layers—melody, rhythm, and texture—to create a distinct sonic logo and full-length track.</p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.3}>
                    <div className="flex items-start gap-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-colors">
                      <div className="text-4xl font-display font-bold text-white/10">03</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Cross-Platform Integration</h3>
                        <p className="text-white/50">We master the audio specifically for mobile devices (vertical video) and provide variations for Intros, Outros, and Background loops.</p>
                      </div>
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
                        <div className="absolute inset-0 pt-6">
                          <iframe
                            src={item.url}
                            className="w-full h-[200%] border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500 origin-top transform scale-50"
                            style={{ pointerEvents: 'none', width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left' }}
                            title={item.title}
                          />
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