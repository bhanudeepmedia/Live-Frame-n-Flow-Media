import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { FileSearch, Music, Sparkles, TrendingUp, ShieldCheck, Search, Activity, Layers, BarChart } from 'lucide-react';

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

// --- ANIMATED VISUAL COMPONENTS (Mobile Optimized) ---

const AuditInterface = () => (
  <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
    {/* Header */}
    <div className="h-6 md:h-8 bg-white/5 border-b border-white/10 flex items-center px-4 space-x-2">
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/50" />
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/50" />
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/50" />
      <div className="flex-1 text-center text-[8px] md:text-[10px] font-mono text-white/30">AUDIT_PROTOCOL_V4.exe</div>
    </div>
    
    {/* Body */}
    <div className="flex-1 p-4 md:p-6 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Radar/Scan Animation */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 border border-white/10 rounded-full flex items-center justify-center">
            <motion.div 
                className="absolute inset-0 border-t border-accent/50 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-20 h-20 md:w-32 md:h-32 border border-white/5 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                 <Search className="text-accent w-6 h-6 md:w-8 md:h-8" />
            </div>
            {/* Blips */}
            <motion.div 
                className="absolute top-6 right-6 md:top-10 md:right-10 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
             <motion.div 
                className="absolute bottom-8 left-6 md:bottom-12 md:left-8 w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
        </div>

        {/* Floating Data Cards - Scaled for Mobile */}
        <motion.div 
            className="absolute top-8 left-4 md:top-12 md:left-8 bg-[#0f172a] border border-accent/30 p-2 md:p-3 rounded shadow-lg w-24 md:w-32"
            animate={{ x: [-5, 0, -5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            <div className="h-0.5 md:h-1 w-8 md:w-12 bg-accent/50 rounded mb-1 md:mb-2" />
            <div className="h-0.5 md:h-1 w-12 md:w-20 bg-white/20 rounded" />
            <div className="mt-1 md:mt-2 text-[8px] md:text-[10px] text-accent font-mono">GAP DETECTED</div>
        </motion.div>
        
        <motion.div 
            className="absolute bottom-8 right-4 md:bottom-12 md:right-8 bg-[#0f172a] border border-white/10 p-2 md:p-3 rounded shadow-lg w-28 md:w-40"
            animate={{ x: [5, 0, 5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
             <div className="flex items-end space-x-1 h-4 md:h-6 mb-1">
                 <div className="w-1 bg-white/20 h-[40%]" />
                 <div className="w-1 bg-white/20 h-[60%]" />
                 <div className="w-1 bg-accent h-[90%]" />
                 <div className="w-1 bg-white/20 h-[50%]" />
             </div>
             <div className="text-[8px] md:text-[10px] text-white/50 font-mono">COMPETITOR_ANALYSIS</div>
        </motion.div>
    </div>
  </div>
);

const SonicInterface = () => (
    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Background Waves */}
        <div className="absolute inset-0 flex items-center justify-center space-x-0.5 md:space-x-1 opacity-20">
            {Array.from({length: 30}).map((_, i) => (
                <motion.div 
                    key={i}
                    className="w-0.5 md:w-1 bg-white rounded-full"
                    animate={{ height: ["10%", "80%", "10%"] }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.05,
                        repeatType: "mirror"
                    }}
                    style={{ height: `${Math.random() * 40 + 10}%`}}
                />
            ))}
        </div>

        {/* Central Pulse */}
        <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <motion.div 
                className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }} // Beat speed
            />
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-full backdrop-blur-md flex items-center justify-center shadow-inner">
                <Music size={24} className="text-accent md:w-8 md:h-8" />
            </div>
            
            {/* Orbital Rings */}
            <motion.div 
                className="absolute inset-[-15px] md:inset-[-20px] border border-white/10 rounded-full border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
             <motion.div 
                className="absolute inset-[-30px] md:inset-[-40px] border border-white/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
        </div>
        
        {/* Text Overlay */}
        <div className="absolute bottom-4 md:bottom-6 w-full text-center">
            <motion.div 
                className="inline-block px-2 py-1 md:px-3 bg-accent/10 rounded-full border border-accent/20 text-accent text-[10px] md:text-xs font-mono tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                GENERATING_AUDIO_WAVE...
            </motion.div>
        </div>
    </div>
);

const RenderingInterface = () => (
    <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
        {/* Viewport UI */}
        <div className="absolute top-4 left-4 flex flex-col space-y-1 md:space-y-2 z-20">
            <div className="text-[8px] md:text-[10px] font-mono text-accent">CAM_01 [REC]</div>
            <div className="text-[8px] md:text-[10px] font-mono text-white/50">ISO 800</div>
            <div className="text-[8px] md:text-[10px] font-mono text-white/50">f/2.8</div>
        </div>

        {/* Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-[90%] h-[90%] border border-white/10 relative">
                <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-accent" />
                
                {/* Center Cross */}
                <div className="absolute top-1/2 left-1/2 w-3 h-px bg-white/30 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 w-px h-3 bg-white/30 -translate-y-1/2" />
            </div>
        </div>

        {/* Content Being "Rendered" */}
        <div className="relative flex-1 bg-gradient-to-b from-gray-900 to-black overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
            
            {/* Scanning Line */}
            <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Timeline UI */}
        <div className="h-8 md:h-12 bg-[#050505] border-t border-white/10 flex items-center px-4 space-x-1">
             {Array.from({length: 15}).map((_, i) => (
                 <div key={i} className={`h-full w-full ${i % 3 === 0 ? 'bg-accent/20' : 'bg-white/5'} rounded-sm`} />
             ))}
        </div>
    </div>
);

const RevenueInterface = () => (
    <div className="w-full h-56 md:h-80 relative bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col p-4 md:p-6">
        <div className="absolute inset-0 bg-noise opacity-10" />
        
        {/* Header Stats */}
        <div className="flex justify-between items-start mb-4 md:mb-8 relative z-10">
            <div>
                <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-1">Total Revenue</div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold font-display text-white"
                >
                    $1,240,050
                </motion.div>
            </div>
            <div className="text-right">
                <div className="flex items-center text-green-400 text-xs md:text-sm font-bold bg-green-400/10 px-2 py-1 rounded">
                    <TrendingUp size={12} className="mr-1 md:w-3.5 md:h-3.5" /> +127%
                </div>
            </div>
        </div>

        {/* Graph Area */}
        <div className="flex-1 flex items-end justify-between space-x-1.5 md:space-x-2 relative z-10">
            {[30, 45, 35, 60, 50, 75, 65, 90].map((height, i) => (
                <motion.div 
                    key={i}
                    className="w-full bg-white/10 rounded-t relative group"
                    initial={{ height: "0%" }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                >
                    {/* Hover Tooltip Effect - Hidden on mobile, visible on desktop hover */}
                    <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ${height}K
                    </div>
                    {/* Accent Color for last bars */}
                    {i > 5 && <div className="absolute inset-0 bg-accent/50 rounded-t" />}
                </motion.div>
            ))}
        </div>
        
        {/* Overlay Grid */}
        <div className="absolute inset-0 pointer-events-none border-t border-white/5" style={{ top: '50%' }} />
        <div className="absolute inset-0 pointer-events-none border-t border-white/5" style={{ top: '75%' }} />
    </div>
);


const Approach: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20 overflow-x-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/5 rounded-full blur-[80px] md:blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/5 rounded-full blur-[80px] md:blur-[100px]" />
         <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      {/* HEADER */}
      <div className="container mx-auto px-6 mb-16 md:mb-24 relative z-10">
        <motion.div
            className="max-w-4xl"
        >
            <RevealText>
                <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">The Ecosystem</span>
            </RevealText>
            <RevealText delay={0.1}>
                <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 md:mb-8 leading-tight">
                The AI-Integrated <br/> Marketing Approach.
                </h1>
            </RevealText>
            <RevealText delay={0.2}>
                <p className="text-lg md:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
                We don't just use tools; we build a complete intelligence infrastructure for your brand. 
                From sonic identity to sales execution, every step is engineered for dominance.
                </p>
            </RevealText>
        </motion.div>
      </div>

      {/* DETAILED STEPS */}
      <div className="container mx-auto px-6 space-y-20 md:space-y-32 relative z-10">
        
        {/* STEP 1: AUDIT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <FadeIn>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <FileSearch size={24} className="md:w-7 md:h-7" />
                </div>
                <RevealText>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">1. Deep-Dive Brand Audit</h2>
                </RevealText>
                <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
                    <RevealText delay={0.1}>
                        <p>
                            <strong className="text-white">Research before visuals.</strong> Our special AI expert team conducts a forensic analysis of your current market position. We don't guess what works; we extract the data.
                        </p>
                    </RevealText>
                    <RevealText delay={0.2}>
                        <p>
                            For <span className="text-white border-b border-accent/50">Existing Brands</span>, we identify exactly where your website leaks revenue and where your marketing funnel is broken.
                        </p>
                    </RevealText>
                    <RevealText delay={0.3}>
                        <p>
                            For <span className="text-white border-b border-accent/50">Startups</span>, we provide a clear "Attack Plan" on how to capture market share from established competitors.
                        </p>
                    </RevealText>
                </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
                <AuditInterface />
            </FadeIn>
        </div>

        {/* STEP 2: SONIC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center lg:flex-row-reverse">
             <FadeIn delay={0.2} className="relative lg:order-2">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <Music size={24} className="md:w-7 md:h-7" />
                </div>
                <RevealText>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">2. Full Sensory Brand Design</h2>
                </RevealText>
                <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
                    <RevealText delay={0.1}>
                        <p>
                            Brand designing is not just about colors, typography, or fonts. It is about "Presence."
                        </p>
                    </RevealText>
                    <RevealText delay={0.2}>
                        <p>
                            We create <strong className="text-white">specially generated music</strong> solely for your brand. It is not a random piece of stock audio. Whether it's an advertisement, an Instagram Reel, or a Meta Ad, the audio is engineered by our AI music specialists to trigger specific emotional responses.
                        </p>
                    </RevealText>
                </div>
            </FadeIn>
            <FadeIn className="lg:order-1">
                 <SonicInterface />
            </FadeIn>
        </div>

        {/* STEP 3: VISUALS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <FadeIn>
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <Sparkles size={24} className="md:w-7 md:h-7" />
                </div>
                <RevealText>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">3. Studio-Quality AI Visuals</h2>
                </RevealText>
                <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
                    <RevealText delay={0.1}>
                        <p>
                            <strong className="text-white">Cost-Cutting Revolution.</strong> Traditional photography and videography shoots cost thousands of dollars in equipment, crew, and logistics.
                        </p>
                    </RevealText>
                    <RevealText delay={0.2}>
                        <p>
                            We utilize advanced AI specialists to generate studio-level photos, videos, and creative assets for <strong className="text-white">less than 10% of the traditional cost</strong>.
                        </p>
                    </RevealText>
                    <RevealText delay={0.3}>
                        <p>
                            You get the high-gloss aesthetic of a Fortune 500 company without the budget burn.
                        </p>
                    </RevealText>
                </div>
            </FadeIn>
            <FadeIn delay={0.2}>
               <RenderingInterface />
            </FadeIn>
        </div>

        {/* STEP 4: REVENUE ENGINE & REFUND */}
        <div className="bg-surfaceHighlight rounded-3xl p-6 md:p-16 border border-white/5 relative overflow-hidden group">
             {/* Hover Glow */}
             <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                 <div className="order-2 lg:order-1">
                    <FadeIn>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-accent text-black rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_30px_rgba(136,180,182,0.4)]">
                            <TrendingUp size={32} className="md:w-10 md:h-10" />
                        </div>
                        
                        <RevealText>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">The Revenue Engine</h2>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <p className="text-lg text-white/70 font-light mb-8 leading-relaxed">
                                A strong social presence connects to strong performance marketing. Strong performance marketing converts into sales. <br className="hidden md:block"/>
                                We don't deal in vanity metrics like "likes" or "views". We deal in revenue.
                            </p>
                        </RevealText>

                        <div className="inline-flex items-center gap-4 bg-background/50 border border-accent/30 p-4 md:p-6 rounded-2xl backdrop-blur-md mb-8 w-full md:w-auto">
                            <ShieldCheck className="text-accent flex-shrink-0" size={24} />
                            <div className="text-left">
                                <h3 className="text-white font-bold text-base md:text-lg">Our Iron-Clad Guarantee</h3>
                                <p className="text-white/70 text-sm">
                                    Qualified leads or <span className="text-accent font-bold">100% Refund</span>.
                                </p>
                            </div>
                        </div>

                        <Button onClick={() => window.location.href='https://calendly.com/bhanudeep-workprofile/30min'}>Start Your Engine</Button>
                    </FadeIn>
                 </div>
                 
                 <div className="relative order-1 lg:order-2">
                    <RevenueInterface />
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default Approach;