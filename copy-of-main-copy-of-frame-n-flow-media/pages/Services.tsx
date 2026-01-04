import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Target, Cpu, TrendingUp, Monitor, PenTool, Camera, ShieldCheck, Filter, Search, ShoppingCart, Code, PlayCircle, Users, MessageSquare } from 'lucide-react';

// --- ANIMATION COMPONENTS ---

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
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
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }} // Cubic bezier for premium feel
    >
      {children}
    </motion.div>
  </div>
);

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-block px-1 mx-0.5">
    <motion.span 
      className="absolute inset-0 bg-accent/20 -skew-x-6 rounded-sm"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
      style={{ originX: 0 }}
    />
    <span className="relative z-10 font-medium text-white">{children}</span>
  </span>
);

// --- ANIMATED VISUALS (MOBILE OPTIMIZED) ---

const FunnelVisual = () => (
  <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4 md:p-8">
    <div className="absolute inset-0 bg-noise opacity-10" />
    <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
      
      {/* Top Funnel */}
      <motion.div 
        className="w-full h-12 md:h-16 bg-white/10 rounded-t-lg mb-1 flex items-center justify-center border border-white/5 relative overflow-hidden"
        initial={{ width: "100%" }}
      >
        <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest relative z-10">Total Market</span>
        <motion.div 
          className="absolute inset-0 bg-accent/5"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Middle Funnel */}
      <motion.div 
        className="w-[85%] md:w-[80%] h-12 md:h-16 bg-white/10 mb-1 flex items-center justify-center border border-white/5 relative overflow-hidden clip-path-trapezoid"
      >
        <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest relative z-10">Target Segment</span>
         {/* Particles falling through */}
         {Array.from({length: 5}).map((_,i) => (
             <motion.div 
                key={i}
                className="absolute top-0 w-1 h-1 bg-accent rounded-full"
                style={{ left: `${20 + i * 15}%` }}
                animate={{ y: [0, 60], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
             />
         ))}
      </motion.div>

      {/* Bottom Funnel */}
      <div className="w-[70%] md:w-[60%] h-12 md:h-16 bg-accent/10 mb-4 flex items-center justify-center border border-accent/20 relative rounded-b-lg">
        <span className="text-[10px] md:text-xs text-accent font-bold uppercase tracking-widest">Qualified Leads</span>
      </div>

      {/* Data Points - Stack on very small screens, row on others */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
         <motion.div className="px-2 py-1 rounded bg-[#0f172a] border border-white/10 text-[9px] md:text-[10px] text-white/40 font-mono" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            Demographics
         </motion.div>
         <motion.div className="px-2 py-1 rounded bg-[#0f172a] border border-white/10 text-[9px] md:text-[10px] text-white/40 font-mono" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
            Behavior
         </motion.div>
         <motion.div className="px-2 py-1 rounded bg-[#0f172a] border border-white/10 text-[9px] md:text-[10px] text-white/40 font-mono" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
            Intent
         </motion.div>
      </div>
    </div>
  </div>
);

const ProductGenVisual = () => (
  <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row">
    {/* Left: Wireframe / Config - Hidden on very small mobile to save space or reduced */}
    <div className="w-full md:w-1/3 h-1/4 md:h-full border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 bg-[#050505] items-center md:items-stretch">
        <div className="hidden md:block h-4 w-1/2 bg-white/10 rounded" />
        <div className="space-y-2 flex-1 md:flex-none">
            <div className="h-1.5 md:h-2 w-full bg-white/5 rounded" />
            <div className="h-1.5 md:h-2 w-3/4 bg-white/5 rounded" />
            <div className="h-1.5 md:h-2 w-full bg-white/5 rounded" />
        </div>
        <div className="mt-0 md:mt-auto min-w-[100px] md:min-w-0">
            <div className="text-[8px] md:text-[10px] text-accent font-mono mb-2">GENERATING_ASSET...</div>
            <motion.div className="h-1 bg-accent/20 rounded overflow-hidden">
                <motion.div className="h-full bg-accent" animate={{ width: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity }} />
            </motion.div>
        </div>
    </div>

    {/* Right: The Product Image */}
    <div className="flex-1 h-3/4 md:h-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            {/* Placeholder for Product - Luxury Jewelry */}
            <div className="relative w-full h-full">
                <img 
                   src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop" 
                   alt="Luxury Diamond Ring" 
                   className="w-full h-full object-cover shadow-2xl transition-all duration-1000 opacity-80"
                />
                
                {/* AI Generation Effect: Scanning Line */}
                <motion.div 
                    className="absolute inset-0 bg-[#0a0a0a] z-10"
                    animate={{ clipPath: ["inset(0 0 0 0)", "inset(0 0 0 100%)", "inset(0 0 0 0)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                     <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
                        {Array.from({length: 144}).map((_, i) => (
                             <div key={i} className="border border-white/20" />
                        ))}
                     </div>
                </motion.div>

                {/* Bright Scan Line */}
                 <motion.div 
                    className="absolute inset-y-0 w-1 bg-accent shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </div>
        
        {/* Floating Tag */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded text-[10px] md:text-xs text-white z-30">
            <span className="text-accent">AI_RENDERED</span>: Diamond_Ring_V2
        </div>
    </div>
  </div>
);

const GuaranteeVisual = () => (
  <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-gradient-to-br from-green-900/10 to-transparent">
      
      {/* Background Chart */}
      <div className="absolute inset-0 flex items-end justify-between px-4 md:px-8 pb-0 opacity-20 pointer-events-none">
          {[20, 40, 30, 50, 45, 70, 60, 90, 80, 100].map((h, i) => (
              <motion.div 
                key={i} 
                className="w-full mx-0.5 md:mx-1 bg-accent rounded-t" 
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
          ))}
      </div>

      {/* Central Badge */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-accent text-black rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)] mb-4">
              <ShieldCheck size={32} className="md:hidden" />
              <ShieldCheck size={48} className="hidden md:block" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1">100% REFUND</h3>
          <p className="text-[10px] md:text-sm text-accent tracking-widest uppercase font-bold">Guarantee</p>
      </motion.div>
      
      <motion.div 
        className="mt-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] md:text-xs text-white/60 text-center"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
          No Leads = No Pay.
      </motion.div>
  </div>
);

const WebDevVisual = () => (
  <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row">
     {/* Code Editor Side - STRICT BRAND COLORS */}
     <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#050505] p-4 font-mono text-[9px] md:text-[10px] text-white/70 leading-relaxed border-b md:border-b-0 md:border-r border-white/10 flex flex-col order-2 md:order-1">
        <div className="flex space-x-1.5 mb-2 md:mb-4">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        <div className="opacity-90 flex-1 overflow-hidden">
            <span className="text-accent">const</span> <span className="text-white">Storefront</span> = () ={'>'} {'{'}<br/>
            &nbsp;&nbsp;<span className="text-accent">return</span> (<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-white/80">Container</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/60">salesData</span>={'{'}<span className="text-accent">live</span>{'}'}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/60">theme</span>={'{'}<span className="text-accent">"dark"</span>{'}'}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{'/>'}<br/>
            &nbsp;&nbsp;);<br/>
            {'}'};
        </div>
        <motion.div 
            className="mt-2 md:mt-4 p-2 bg-white/5 rounded border-l-2 border-accent text-accent/80 whitespace-nowrap overflow-hidden text-ellipsis"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            > Deploying to Edge...
        </motion.div>
     </div>

     {/* Preview Side - Dark Mode UI */}
     <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#0f172a] relative overflow-hidden flex flex-col order-1 md:order-2">
        {/* Mock Browser Header */}
        <div className="w-full h-6 md:h-8 bg-[#1e293b] flex items-center px-4 border-b border-white/5">
            <div className="h-1.5 md:h-2 w-12 md:w-16 bg-white/10 rounded-full" />
        </div>
        {/* Mock Content */}
        <div className="p-4 grid grid-cols-2 gap-3">
            <div className="aspect-square bg-white/5 rounded border border-white/5" />
            <div className="aspect-square bg-white/5 rounded border border-white/5" />
            <div className="aspect-square bg-white/5 rounded border border-white/5" />
            <div className="col-span-2 h-6 md:h-8 bg-accent/20 rounded border border-accent/20 mt-2 flex items-center justify-center">
                 <span className="text-[8px] text-accent font-bold tracking-wider">CHECKOUT</span>
            </div>
        </div>
        
        {/* Floating Success Indicator */}
        <motion.div 
            className="absolute bottom-4 right-4 bg-accent text-black px-2 md:px-3 py-1 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] text-[10px] md:text-xs font-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
        >
            Conversion +200%
        </motion.div>
     </div>
  </div>
);

const StorytellingVisual = () => (
    <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4 md:p-8">
        <div className="absolute inset-0 bg-noise opacity-10" />
        
        <div className="relative z-10 w-full max-w-md flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
            {/* Storyteller Node */}
            <motion.div 
                className="relative z-20 flex flex-col items-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                     <PlayCircle size={24} className="text-accent md:w-7 md:h-7" />
                 </div>
                 <div className="px-2 md:px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest border border-white/5">Brand Narrative</div>
            </motion.div>

            {/* Connection Lines - Vertical on Mobile, Horizontal on Desktop */}
            <div className="relative w-px h-12 md:w-auto md:h-px md:absolute md:top-8 md:left-16 md:right-16 bg-white/10 flex-shrink-0">
                 <motion.div 
                    className="w-full h-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    animate={{ 
                        scaleY: [0, 1, 0], // Mobile
                        scaleX: [0, 1, 0] // Desktop override handled below
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                 />
                 {/* Desktop specific animation override via style/class is tricky in strict TSX logic without media query hooks, but let's approximate with a responsive utility div */}
                 <div className="hidden md:block absolute inset-0 bg-accent shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse" />
            </div>

            {/* Audience Nodes */}
            <div className="flex flex-row md:flex-col gap-4">
                 {[1, 2, 3].map((i) => (
                     <motion.div 
                        key={i}
                        className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                     >
                         <div className="w-2 h-2 rounded-full bg-white/30 hidden md:block" />
                         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                             <Users size={12} className="text-white/50" />
                         </div>
                         <div className="w-2 md:w-24 h-8 md:h-2 bg-white/5 rounded-full overflow-hidden hidden md:block">
                             <motion.div 
                                className="h-full bg-white/20"
                                animate={{ width: ["0%", "100%"] }}
                                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                             />
                         </div>
                     </motion.div>
                 ))}
            </div>
        </div>

        {/* Message Bubbles Floating */}
        <motion.div 
            className="absolute top-4 right-4 md:top-10 md:left-1/3 bg-white/5 border border-white/10 px-2 py-1 rounded text-[8px] md:text-[10px] text-white/40"
            animate={{ y: [-5, 0, -5], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            Emotional Connection
        </motion.div>
    </div>
);

const OnsiteVisual = () => (
    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center relative group">
        {/* Viewfinder Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-4 md:p-6 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                 <div className="flex flex-col space-y-1">
                     <div className="text-red-500 font-bold animate-pulse text-[10px] md:text-xs tracking-widest flex items-center">
                         <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-2" /> REC
                     </div>
                     <div className="text-white/70 font-mono text-[9px] md:text-[10px]">00:14:23:09</div>
                 </div>
                 <div className="flex space-x-2">
                     <div className="px-1.5 py-0.5 border border-white/30 text-[9px] md:text-[10px] text-white/70 rounded">4K</div>
                     <div className="px-1.5 py-0.5 border border-white/30 text-[9px] md:text-[10px] text-white/70 rounded">RAW</div>
                 </div>
            </div>

            {/* Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border border-white/30 opacity-50 relative">
                     <div className="absolute top-1/2 -left-2 w-8 h-px bg-white/30" />
                     <div className="absolute left-1/2 -top-2 h-8 w-px bg-white/30" />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-end">
                <div className="flex space-x-2 md:space-x-4 text-[9px] md:text-[10px] font-mono text-white/50">
                    <span>ISO 800</span>
                    <span className="hidden md:inline">f/2.8</span>
                    <span>1/50</span>
                </div>
                <div className="flex space-x-1">
                     {[1,2,3,4].map(i => <div key={i} className="w-1 h-2 md:h-3 bg-green-500/80 rounded-sm" />)}
                </div>
            </div>
        </div>

        {/* Moving Background Image */}
        <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-30 text-center border border-white/20 bg-black/60 backdrop-blur-md p-4 md:p-6 rounded-2xl mx-4 md:mx-0">
             <Camera size={24} className="text-accent mx-auto mb-2 md:w-8 md:h-8" />
             <h3 className="text-lg md:text-xl font-bold text-white mb-1">ONSITE PRODUCTION</h3>
             <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60">India Exclusive</div>
        </div>
    </div>
);

const Services: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden pb-20">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-16 md:mb-24 relative">
        <motion.div 
          className="max-w-4xl"
        >
          <RevealText>
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Our Expertise</span>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-tight">
              Complete Marketing <br/> Infrastructure.
            </h1>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed">
              We don't offer disparate services. We offer a cohesive ecosystem designed to move your business from obscurity to authority.
            </p>
          </RevealText>
        </motion.div>
      </div>

      {/* SERVICE SECTIONS */}
      <div className="space-y-24 md:space-y-32 container mx-auto px-6">

        {/* 1. BUSINESS INTELLIGENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           <FadeIn>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 border border-white/10">
                 <Filter size={24} className="md:w-7 md:h-7" />
              </div>
              <RevealText>
                 <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Business Intelligence & Research</h2>
              </RevealText>
              <div className="space-y-6 text-lg text-white/60 font-light">
                 <RevealText delay={0.1}>
                   <p>
                     Before we write a single headline, we map the territory. We use proprietary AI tools to analyze your competitors' ad spend, keyword strategies, and funnel leaks.
                   </p>
                 </RevealText>
                 <RevealText delay={0.2}>
                   <p>
                     We build detailed <strong className="text-white">customer avatars</strong> based on real behavioral data, not assumptions. This ensures every dollar spent targets a high-intent buyer.
                   </p>
                 </RevealText>
              </div>
           </FadeIn>
           <FadeIn delay={0.2} className="relative">
              <FunnelVisual />
           </FadeIn>
        </div>

        {/* 3. AI PRODUCT VISUALS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:flex-row-reverse">
           <FadeIn delay={0.2} className="lg:order-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 border border-white/10">
                 <Cpu size={24} className="md:w-7 md:h-7" />
              </div>
              <RevealText>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">AI Product Visuals</h2>
              </RevealText>
              <div className="space-y-6 text-lg text-white/60 font-light">
                 <RevealText delay={0.1}>
                   <p className="font-medium text-white">Jewelry. Furniture. Cosmetics. Tech.</p>
                 </RevealText>
                 <RevealText delay={0.2}>
                    <p>
                        Stop spending <Highlight>$10,000+ on physical photoshoots</Highlight>. We train AI models on your specific product SKUs to generate infinite high-fidelity lifestyle imagery.
                    </p>
                 </RevealText>
                 <RevealText delay={0.3}>
                    <p>
                        Need your diamond ring on a model's hand or floating in a zero-gravity void? Done. Instantly and photorealistically.
                    </p>
                 </RevealText>
              </div>
           </FadeIn>
           <FadeIn className="lg:order-1">
              <ProductGenVisual />
           </FadeIn>
        </div>

        {/* 4. GROWTH & GUARANTEE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           <FadeIn>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 border border-white/10">
                 <TrendingUp size={24} className="md:w-7 md:h-7" />
              </div>
              <RevealText>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Growth & Lead Systems</h2>
              </RevealText>
              <div className="space-y-6 text-lg text-white/60 font-light">
                 <RevealText delay={0.1}>
                   <p>
                     We build automated acquisition systems that run 24/7. From cold outreach to warm retargeting, we manage the entire lifecycle.
                   </p>
                 </RevealText>
                 <FadeIn delay={0.3}>
                   <div className="p-6 bg-accent/5 border border-accent/20 rounded-xl mt-4">
                       <h4 className="text-accent font-bold text-lg mb-2">Our Performance Promise</h4>
                       <p className="text-white">
                          We are so confident in our systems that we offer a <Highlight>100% Refund Guarantee</Highlight>. If we don't generate qualified leads for your business, we refund our service fee. No questions asked.
                       </p>
                   </div>
                 </FadeIn>
              </div>
           </FadeIn>
           <FadeIn delay={0.2}>
              <GuaranteeVisual />
           </FadeIn>
        </div>

        {/* 5. WEB DEVELOPMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:flex-row-reverse">
           <FadeIn delay={0.2} className="lg:order-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 border border-white/10">
                 <Code size={24} className="md:w-7 md:h-7" />
              </div>
              <RevealText>
                 <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Web Design & Development</h2>
              </RevealText>
              <div className="space-y-6 text-lg text-white/60 font-light">
                 <RevealText delay={0.1}>
                   <p>
                      Your website is your 24/7 salesperson. We build lightning-fast, conversion-optimized sites using modern <Highlight>dark-mode aesthetics</Highlight> and fluid interactions.
                   </p>
                 </RevealText>
                 <RevealText delay={0.2}>
                   <ul className="space-y-2">
                       <li className="flex items-center space-x-2 text-white">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"/> <span><strong>E-Commerce Brands</strong> (Shopify, Custom)</span>
                       </li>
                       <li className="flex items-center space-x-2 text-white">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"/> <span><strong>Service Providers</strong> (Consultants, Agencies, SaaS)</span>
                       </li>
                   </ul>
                 </RevealText>
              </div>
           </FadeIn>
           <FadeIn className="lg:order-1">
              <WebDevVisual />
           </FadeIn>
        </div>

        {/* 6. BRAND STRATEGY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           <FadeIn>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 border border-white/10">
                 <PenTool size={24} className="md:w-7 md:h-7" />
              </div>
              <RevealText>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Brand Strategy & Narrative</h2>
              </RevealText>
              <div className="space-y-6 text-lg text-white/60 font-light">
                 <RevealText delay={0.1}>
                    <p>
                      A logo is not a brand. A brand is a story that your audience tells themselves about you. We craft that narrative.
                    </p>
                 </RevealText>
                 <RevealText delay={0.2}>
                    <p>
                      We move beyond static documents to create a living brand strategy that resonates emotionally. We map the journey from stranger to loyal advocate through the power of <Highlight>storytelling</Highlight>.
                    </p>
                 </RevealText>
              </div>
           </FadeIn>
           <FadeIn delay={0.2}>
              <StorytellingVisual />
           </FadeIn>
        </div>

        {/* 7. ONSITE SHOOTS */}
        <div className="bg-surfaceHighlight rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                    <RevealText>
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Onsite Production</h2>
                    </RevealText>
                    <RevealText delay={0.1}>
                        <p className="text-white/60 mb-6">
                            For brands requiring physical presence, we offer premium onsite videography and photography teams. We handle scripting, directing, shooting, and editing.
                        </p>
                    </RevealText>
                    <FadeIn delay={0.3}>
                        <div className="inline-block bg-white/10 px-4 py-2 rounded text-sm text-white font-bold border border-white/10">
                            📍 Available exclusively in India
                        </div>
                    </FadeIn>
                 </div>
                 <OnsiteVisual />
             </div>
        </div>

      </div>
      
      <div className="mt-32 text-center">
        <Button onClick={() => window.location.href='https://calendly.com/bhanudeep-workprofile/30min'}>Start Your Project</Button>
      </div>

    </div>
  );
};

export default Services;