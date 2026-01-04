import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { TrendingUp, BarChart3, Target, Activity, Zap, Layers, ArrowRight, ShieldCheck, MousePointer2, Smartphone } from 'lucide-react';

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

// --- VISUALIZATIONS ---

const StabilizationGraph = () => (
  <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden flex flex-col p-6 shadow-2xl">
    <div className="absolute inset-0 bg-noise opacity-10" />
    <div className="flex justify-between items-center mb-6 relative z-10">
      <div className="text-xs font-mono text-white/50 uppercase tracking-widest">Lead Cost Volatility</div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] text-white/70 font-mono">LIVE_DATA_SCAN</span>
      </div>
    </div>
    
    <div className="flex-1 relative z-10 flex items-end">
       {/* Y-Axis Grid */}
       <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-t border-white/20 w-full" />
          <div className="border-t border-white/20 w-full" />
          <div className="border-t border-white/20 w-full" />
       </div>

       {/* The Graph Line */}
       <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
          {/* Volatile Phase */}
          <motion.path 
            d="M0,40 Q10,10 20,45 T40,20"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          {/* Stabilized Phase */}
          <motion.path 
            d="M40,20 C50,35 60,32 100,30"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          {/* Data Points */}
          <motion.circle cx="40" cy="20" r="1.5" fill="white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} />
          <motion.circle cx="100" cy="30" r="1.5" fill="#22d3ee" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2 }} />
       </svg>
    </div>

    <div className="flex justify-between mt-2 text-[10px] font-mono text-white/40 relative z-10">
       <span>Initial Phase</span>
       <span className="text-white">Calibration</span>
       <span>Stabilization</span>
    </div>
    
    {/* Floating Tag */}
    <motion.div 
      className="absolute top-1/2 left-[40%] bg-surface border border-white/20 px-2 py-1 rounded text-[10px] text-white z-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
    >
      Algorithm Maturity
    </motion.div>
  </div>
);

const TrustVisual = () => (
  <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden p-6 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
    
    <div className="grid grid-cols-2 gap-8 w-full max-w-md relative z-10">
        {/* Low Trust Side */}
        <div className="flex flex-col items-center opacity-40">
            <div className="w-16 h-24 border border-white/20 bg-white/5 rounded mb-4 flex items-center justify-center">
                <span className="text-xs text-white/30">Stock Assets</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="w-[20%] h-full bg-red-500" />
            </div>
            <span className="text-[10px] mt-2 text-white/50">Low Engagement</span>
        </div>

        {/* High Trust Side */}
        <div className="flex flex-col items-center">
             <div className="w-16 h-24 border border-accent/50 bg-accent/10 rounded mb-4 flex items-center justify-center relative shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Zap size={16} className="text-accent" />
                <div className="absolute -top-2 -right-2 bg-accent text-black text-[8px] font-bold px-1.5 py-0.5 rounded">AI</div>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-accent" 
                   initial={{ width: 0 }}
                   whileInView={{ width: "85%" }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </div>
            <span className="text-[10px] mt-2 text-accent font-bold">Premium Authority</span>
        </div>
    </div>
    
    <div className="absolute bottom-6 text-center w-full">
        <p className="text-xs text-white/60">"Premium visuals significantly optimize CPL"</p>
    </div>
  </div>
);

const PlatformComparison = () => (
    <div className="grid grid-cols-2 gap-4 w-full">
        <div className="bg-[#121212] border border-accent/30 p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-3">
                 <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white"><Smartphone size={16} /></div>
                 <span className="font-bold text-white text-sm">Social Discovery</span>
            </div>
            <div className="space-y-2">
                 <div className="flex justify-between text-[10px] text-white/60"><span>Market Reach</span> <span className="text-accent">Vast</span></div>
                 <div className="w-full bg-white/10 h-1 rounded-full"><div className="w-[90%] h-full bg-accent rounded-full"/></div>
                 
                 <div className="flex justify-between text-[10px] text-white/60 mt-2"><span>Customer Acquisition</span> <span className="text-green-400">Efficient</span></div>
                 <div className="w-full bg-white/10 h-1 rounded-full"><div className="w-[30%] h-full bg-green-400 rounded-full"/></div>
            </div>
            <p className="mt-3 text-[10px] text-white/50 leading-tight">Best for disrupting patterns and creating demand.</p>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-xl relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 mb-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">S</div>
                 <span className="font-bold text-white text-sm">Search Intent</span>
            </div>
             <div className="space-y-2">
                 <div className="flex justify-between text-[10px] text-white/60"><span>Buyer Intent</span> <span className="text-white">Targeted</span></div>
                 <div className="w-full bg-white/10 h-1 rounded-full"><div className="w-[80%] h-full bg-white rounded-full"/></div>
                 
                 <div className="flex justify-between text-[10px] text-white/60 mt-2"><span>Acquisition Cost</span> <span className="text-red-400">Competitive</span></div>
                 <div className="w-full bg-white/10 h-1 rounded-full"><div className="w-[70%] h-full bg-red-400 rounded-full"/></div>
            </div>
             <p className="mt-3 text-[10px] text-white/50 leading-tight">Best when demand already exists.</p>
        </div>
    </div>
);

const Insights: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden pb-20">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      {/* HEADER */}
      <div className="container mx-auto px-6 mb-20 relative z-10">
        <motion.div className="max-w-4xl mx-auto text-center">
           <RevealText className="flex justify-center">
             <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
                <Activity size={14} /> Intelligence Report
             </span>
           </RevealText>
           <RevealText delay={0.1}>
             <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
               Market Dynamics & <br/> Sales Intelligence
             </h1>
           </RevealText>
           <RevealText delay={0.2}>
             <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
               Proprietary patterns extracted from active market data. We focus on the structural mechanics that drive scalable growth.
             </p>
           </RevealText>
        </motion.div>
      </div>

      {/* CONTENT GRID */}
      <div className="container mx-auto px-6 max-w-5xl space-y-24 relative z-10">

        {/* INSIGHT 1: STABILIZATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-display font-bold text-white/10">01</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Lead Cost Stabilization</h2>
                </div>
                <div className="h-0.5 w-12 bg-accent mb-6" />
                <p className="text-white/70 mb-6 leading-relaxed">
                    Growth is a process of calibration. The initial phase is dedicated to data learning. Through machine learning, the algorithm identifies high-intent users, and costs stabilize as the system matures.
                </p>
                <div className="bg-surfaceHighlight p-4 rounded-lg border border-white/5">
                    <h4 className="text-xs uppercase text-white/50 mb-2 font-bold tracking-wider">Acquisition Metrics</h4>
                    <div className="flex justify-between items-center text-white font-mono text-sm">
                        <span>Target Performance:</span>
                        <span className="text-accent">Optimized Range</span>
                    </div>
                </div>
            </FadeIn>
            <FadeIn delay={0.2}>
                <StabilizationGraph />
            </FadeIn>
        </div>

        {/* INSIGHT 2: VOLUME VS SALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <FadeIn delay={0.2} className="md:order-2">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-display font-bold text-white/10">02</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">The Follow-Up Gap</h2>
                </div>
                <div className="h-0.5 w-12 bg-accent mb-6" />
                <p className="text-white/70 mb-6 leading-relaxed">
                    Ads build awareness. <strong>Sales build businesses.</strong> High-performance campaigns ensure a consistent lead flow, but revenue realization depends on a structured sales infrastructure.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/60">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <span>Delayed Response: Suboptimal Conversion</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>Rapid Response: Substantial Conversion Increase</span>
                    </li>
                </ul>
            </FadeIn>
            <FadeIn className="md:order-1">
                <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-full max-w-xs space-y-1">
                        <motion.div initial={{ width: "100%" }} className="h-12 bg-white/10 rounded-t flex items-center justify-center text-xs text-white/50">LEAD CAPTURE</motion.div>
                        <motion.div initial={{ width: "100%" }} animate={{ width: "60%" }} className="h-12 bg-white/20 mx-auto flex items-center justify-center text-xs text-white/70">NURTURING</motion.div>
                        <motion.div initial={{ width: "100%" }} animate={{ width: "30%" }} className="h-16 bg-accent mx-auto rounded-b flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.5)]">REVENUE</motion.div>
                    </div>
                </div>
            </FadeIn>
        </div>

        {/* INSIGHT 3: CREATIVE QUALITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn>
                 <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-display font-bold text-white/10">03</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Visual Trust Equity</h2>
                </div>
                <div className="h-0.5 w-12 bg-accent mb-6" />
                <p className="text-white/70 mb-6 leading-relaxed">
                    Authority is perceived through aesthetic quality. Campaigns utilizing premium AI-generated visuals consistently experience higher-quality intent and lower acquisition costs.
                </p>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent">
                        <Layers size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white">The Authority Multiplier</h4>
                        <p className="text-sm text-white/50 mt-1">
                            Transitioning from generic assets to brand-aligned premium visuals provides a substantial reduction in lead costs.
                        </p>
                    </div>
                </div>
            </FadeIn>
            <FadeIn delay={0.2}>
                <TrustVisual />
            </FadeIn>
        </div>

        {/* INSIGHT 4: DEMAND GENERATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
             <FadeIn delay={0.2} className="md:order-2">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-display font-bold text-white/10">04</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Strategic Placement</h2>
                </div>
                <div className="h-0.5 w-12 bg-accent mb-6" />
                <p className="text-white/70 mb-6 leading-relaxed">
                    Social-first platforms excel at disruptive discovery and pattern interruption. They are ideal for creating new demand and establishing market authority.
                </p>
                <p className="text-white/70 leading-relaxed">
                    Search-focused ecosystems capture existing demand and require highly optimized conversion paths and pre-established trust.
                </p>
            </FadeIn>
            <FadeIn className="md:order-1">
                <PlatformComparison />
            </FadeIn>
        </div>

        {/* INSIGHT 5 & 6: ROI & EXPECTATIONS */}
        <FadeIn className="bg-surfaceHighlight rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl font-display font-bold text-white/10">05</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Growth Trajectory</h2>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            ROI is a compounding factor of consistent execution and algorithm maturation.
                        </p>
                        <ul className="space-y-4 font-light text-white/60">
                            <li className="flex gap-4">
                                <span className="font-mono text-white/30">Phase 1</span>
                                <span>Foundational Data Learning</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-mono text-white/30">Phase 2</span>
                                <span>Optimization & Stabilization</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-mono text-accent">Phase 3+</span>
                                <span className="text-white">Predictable Scaling & Market Dominance</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="md:w-1/2 border-l border-white/10 md:pl-12">
                         <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl font-display font-bold text-white/10">06</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Scaling Potential</h2>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            Sustainable growth is achieved when sales systems and marketing efforts are synchronized:
                        </p>
                        
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-[#0a0a0a] p-4 rounded-lg border border-white/10">
                                <h4 className="text-white font-bold mb-1">Service Ecosystems</h4>
                                <p className="text-sm text-white/50">High Scalability & Authority Potential</p>
                            </div>
                             <div className="bg-[#0a0a0a] p-4 rounded-lg border border-white/10">
                                <h4 className="text-white font-bold mb-1">Product Brands</h4>
                                <p className="text-sm text-white/50">Conversion-Driven Volume Scaling</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>

      </div>

      {/* FOOTER CTA */}
      <div className="container mx-auto px-6 mt-32 text-center">
         <FadeIn>
             <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Performance marketing works when data is respected.</h2>
             <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-light">
                 We position ourselves as a strategic infrastructure partner, not just a service provider.
             </p>
             <Button className="mx-auto" onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>
                  Build Your Strategy
             </Button>
         </FadeIn>
      </div>

    </div>
  );
};

export default Insights;