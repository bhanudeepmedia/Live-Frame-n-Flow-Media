import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { Zap, Layers, DollarSign, Play, CheckCircle2, Cpu, Aperture, Repeat, Music, Mic, Headphones, Radio, Volume2 } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'visuals' | 'sonic'>('visuals');

  const visualPortfolio = [
    { 
      url: "https://www.instagram.com/reel/DN2Gtyy6lQb/embed", 
      title: "Luxury Product Reveal", 
      description: "Hyper-realistic lighting and texture simulation for jewelry." 
    },
    { 
      url: "https://www.instagram.com/reel/DSkyKTyE-mM/embed", 
      title: "Dynamic Fashion Motion", 
      description: "AI-driven fabric physics and model animation." 
    },
    { 
      url: "https://www.instagram.com/p/DSSO7zKDTgN/embed", 
      title: "Visual Brand Narrative", 
      description: "Static to motion transformation for high-impact social posts." 
    },
    { 
      url: "https://www.instagram.com/reel/DSZ07pqErV7/embed", 
      title: "Cinematic Environment", 
      description: "Generative backgrounds with seamless product integration." 
    },
    { 
      url: "https://www.instagram.com/reel/DNuYV9KQlac/embed", 
      title: "Commercial Spot", 
      description: "Full AI video workflow from script to final render." 
    },
  ];

  const sonicPortfolio = [
    { 
      url: "https://www.instagram.com/reel/DSUP84oEgyY/embed", 
      title: "Frame n Flow Signature", 
      description: "Original sonic identity composed for brand authority and recall." 
    },
    // Placeholder to show grid layout capability if more are added later
    /* { 
       url: "", 
       title: "Coming Soon", 
       description: "More sonic identities in production." 
    } */
  ];

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden pb-20">
      
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
           
           {/* TAB TOGGLE */}
           <div className="flex flex-wrap justify-center gap-4 mt-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setActiveTab('visuals')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'visuals' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Aperture size={18} />
                AI Studio Visuals
              </button>
              <button 
                onClick={() => setActiveTab('sonic')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'sonic' ? 'bg-accent text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Music size={18} />
                Sonic Branding
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
            <div className="container mx-auto px-6 mb-16 text-center">
                 <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                   Studio quality without the studio. We use proprietary generative AI workflows to create commercials and assets indistinguishable from million-dollar productions.
                 </p>
            </div>

            {/* VISUALS GRID */}
            <div className="container mx-auto px-6 mb-32 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visualPortfolio.map((item, index) => (
                     <FadeIn key={index} delay={index * 0.1} className="flex flex-col h-full">
                        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group h-full flex flex-col">
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
                           <div className="p-6 border-t border-white/5 bg-surfaceHighlight flex-1">
                              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                              <p className="text-sm text-white/50">{item.description}</p>
                           </div>
                        </div>
                     </FadeIn>
                  ))}
               </div>
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