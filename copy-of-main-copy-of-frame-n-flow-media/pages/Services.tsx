import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import {
  Target, Cpu, TrendingUp, PenTool, Camera, ShieldCheck, Filter,
  ShoppingCart, Code, PlayCircle, Users, MessageSquare,
  Bot, Calendar, Database, Mail, Star, Phone, DollarSign, Activity,
  Layers, Zap, Workflow
} from 'lucide-react';

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
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
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

// --- EXISTING VISUAL COMPONENTS (Marketing) ---

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
        {Array.from({ length: 5 }).map((_, i) => (
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
    <div className="flex-1 h-3/4 md:h-full relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Diamond Ring"
            className="w-full h-full object-cover shadow-2xl transition-all duration-1000 opacity-80"
          />
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a] z-10"
            animate={{ clipPath: ["inset(0 0 0 0)", "inset(0 0 0 100%)", "inset(0 0 0 0)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-white/20" />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-y-0 w-1 bg-accent shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded text-[10px] md:text-xs text-white z-30">
        <span className="text-accent">AI_RENDERED</span>: Diamond_Ring_V2
      </div>
    </div>
  </div>
);

const GuaranteeVisual = () => (
  <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-gradient-to-br from-green-900/10 to-transparent">
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
    <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#050505] p-4 font-mono text-[9px] md:text-[10px] text-white/70 leading-relaxed border-b md:border-b-0 md:border-r border-white/10 flex flex-col order-2 md:order-1">
      <div className="flex space-x-1.5 mb-2 md:mb-4">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      <div className="opacity-90 flex-1 overflow-hidden">
        <span className="text-accent">const</span> <span className="text-white">Storefront</span> = () ={'>'} {'{'}<br />
        &nbsp;&nbsp;<span className="text-accent">return</span> (<br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-white/80">Container</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/60">salesData</span>={'{'}<span className="text-accent">live</span>{'}'}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/60">theme</span>={'{'}<span className="text-accent">"dark"</span>{'}'}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'/>'}<br />
        &nbsp;&nbsp;);<br />
        {'}'};
      </div>
      <motion.div
        className="mt-2 md:mt-4 p-2 bg-white/5 rounded border-l-2 border-accent text-accent/80 whitespace-nowrap overflow-hidden text-ellipsis"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Deploying to Edge...
      </motion.div>
    </div>
    <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#0f172a] relative overflow-hidden flex flex-col order-1 md:order-2">
      <div className="w-full h-6 md:h-8 bg-[#1e293b] flex items-center px-4 border-b border-white/5">
        <div className="h-1.5 md:h-2 w-12 md:w-16 bg-white/10 rounded-full" />
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="aspect-square bg-white/5 rounded border border-white/5" />
        <div className="aspect-square bg-white/5 rounded border border-white/5" />
        <div className="aspect-square bg-white/5 rounded border border-white/5" />
        <div className="col-span-2 h-6 md:h-8 bg-accent/20 rounded border border-accent/20 mt-2 flex items-center justify-center">
          <span className="text-[8px] text-accent font-bold tracking-wider">CHECKOUT</span>
        </div>
      </div>
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
      <div className="relative w-px h-12 md:w-auto md:h-px md:absolute md:top-8 md:left-16 md:right-16 bg-white/10 flex-shrink-0">
        <motion.div
          className="w-full h-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          animate={{ scaleY: [0, 1, 0], scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
        <div className="hidden md:block absolute inset-0 bg-accent shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse" />
      </div>
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
    <div className="absolute inset-0 z-20 pointer-events-none p-4 md:p-6 flex flex-col justify-between">
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 border border-white/30 opacity-50 relative">
          <div className="absolute top-1/2 -left-2 w-8 h-px bg-white/30" />
          <div className="absolute left-1/2 -top-2 h-8 w-px bg-white/30" />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex space-x-2 md:space-x-4 text-[9px] md:text-[10px] font-mono text-white/50">
          <span>ISO 800</span>
          <span className="hidden md:inline">f/2.8</span>
          <span>1/50</span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-2 md:h-3 bg-green-500/80 rounded-sm" />)}
        </div>
      </div>
    </div>
    <motion.div
      className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-0 bg-black/40 z-10" />
    <div className="relative z-30 text-center border border-white/20 bg-black/60 backdrop-blur-md p-4 md:p-6 rounded-2xl mx-4 md:mx-0">
      <Camera size={24} className="text-accent mx-auto mb-2 md:w-8 md:h-8" />
      <h3 className="text-lg md:text-xl font-bold text-white mb-1">ONSITE PRODUCTION</h3>
      <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60">India Exclusive</div>
    </div>
  </div>
);

// --- NEW VISUAL COMPONENTS (Automation) - ENHANCED ---

const AutomationHeroVisual = () => (
  <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8 group">
    {/* Background Grid & Scanlines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

    {/* Central Interactive Node */}
    <motion.div
      className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-black border border-accent rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.3)]"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1, boxShadow: ["0 0 20px rgba(34,211,238,0.3)", "0 0 50px rgba(34,211,238,0.6)", "0 0 20px rgba(34,211,238,0.3)"] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Bot size={48} className="text-accent" />

      {/* Orbiting Particles */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full rounded-full border border-white/5"
          style={{ rotate: deg, opacity: 0.5 }}
          animate={{ rotate: deg + 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        </motion.div>
      ))}
    </motion.div>

    {/* Floating Feature Cards */}
    <motion.div
      className="absolute top-[10%] left-[5%] md:left-[15%] bg-[#1a1a1a]/90 backdrop-blur border border-green-500/30 px-3 py-2 rounded-lg flex items-center gap-2"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-[10px] md:text-xs font-mono text-green-400">Booking: Confirmed</span>
    </motion.div>

    <motion.div
      className="absolute bottom-[20%] right-[5%] md:right-[15%] bg-[#1a1a1a]/90 backdrop-blur border border-purple-500/30 px-3 py-2 rounded-lg flex items-center gap-2"
      animate={{ y: [5, -5, 5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    >
      <MessageSquare size={12} className="text-purple-400" />
      <span className="text-[10px] md:text-xs font-mono text-purple-400">Reply Sent</span>
    </motion.div>

    <motion.div
      className="absolute top-[20%] right-[10%] bg-[#1a1a1a]/90 backdrop-blur border border-yellow-500/30 px-3 py-2 rounded-lg flex items-center gap-2"
      animate={{ x: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <Star size={12} className="text-yellow-400 fill-yellow-400" />
      <span className="text-[10px] md:text-xs font-mono text-yellow-400">5-Star Review</span>
    </motion.div>
  </div>
);

const ChatbotVisual = () => (
  <div className="relative w-full aspect-square md:aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
    <div className="bg-[#1e1e1e] px-4 py-2 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-[10px] text-white/40 font-mono">AI_Assistant_Active</div>
    </div>
    <div className="p-4 flex-1 space-y-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/50 pointer-events-none z-10"></div>

      <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex justify-start">
        <div className="bg-white/10 px-3 py-2 rounded-t-lg rounded-br-lg rounded-bl-none max-w-[80%] text-xs text-white/80">
          Hi! How can I help you scale your business?
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex justify-end">
        <div className="bg-accent/20 border border-accent/20 px-3 py-2 rounded-t-lg rounded-bl-lg rounded-br-none max-w-[80%] text-xs text-white">
          I need automated booking for my dental clinic.
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }} className="flex justify-start">
        <div className="bg-white/10 px-3 py-2 rounded-t-lg rounded-br-lg rounded-bl-none max-w-[80%] text-xs text-white/80">
          Understood. I can set up a 24/7 scheduler linked to your calendar. Ready to see a demo?
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="flex justify-center mt-4">
        <div className="px-3 py-1 bg-accent rounded text-[10px] text-black font-bold animate-pulse">
          Lead Captured
        </div>
      </motion.div>
    </div>
  </div>
)

import SEO from '../components/SEO';

import { useWhatsApp } from '../contexts/WhatsAppContext';

const Services: React.FC = () => {
  const { open } = useWhatsApp();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'marketing' | 'automation' | 'webdev' | 'selection'>('selection');

  // React to Navigation State
  useEffect(() => {
    const state = location.state as { activeTab?: 'marketing' | 'automation' | 'webdev' } | null;
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    } else {
      setActiveTab('selection');
    }
  }, [location]);

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden pb-20 font-sans">
      <SEO
        title="Services | Frame n Flow Media - Marketing & Automation"
        description="Explore our core services: Business Intelligence, AI Product Visuals, Growth Systems (100% Refund Guarantee), Web Development, and 24/7 AI Automation Agencies."
        canonical="/services"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI-Integrated Marketing",
            "provider": {
              "@type": "Organization",
              "name": "Frame n Flow Media"
            },
            "description": "Comprehensive marketing strategy including Business Intelligence, Competitor Analysis, and Funnel Optimization.",
            "areaServed": ["United States", "United Kingdom", "India", "Europe"]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Product Visuals",
            "provider": {
              "@type": "Organization",
              "name": "Frame n Flow Media"
            },
            "description": "Photorealistic AI generation for jewelry, furniture, and products, reducing production costs by 90%.",
            "serviceType": "content creation"
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Growth Automation Systems",
            "provider": {
              "@type": "Organization",
              "name": "Frame n Flow Media"
            },
            "description": "Automated lead acquisition funnels and AI chatbots with 100% Refund Guarantee.",
            "serviceType": "lead generation"
          }
        ]}
      />

      {/* HEADER WITH TABS - HIDDEN ON SELECTION SCREEN */}
      {activeTab !== 'selection' && (
        <div className="container mx-auto px-6 mb-12 md:mb-16 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <RevealText>
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Our Expertise</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-tight">
                {activeTab === 'marketing' ? 'Complete Marketing Infrastructure' : activeTab === 'webdev' ? 'Next-Gen Web & App Architecture' : 'AI Automations for Growth'}
              </h1>
            </RevealText>

            {/* TABS */}
            <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full relative">
              <div
                className={`absolute inset-y-1 rounded-full transition-all duration-500 ease-out`}
                style={{
                  width: 'calc(33.33% - 4px)',
                  left: activeTab === 'marketing' ? '4px' : activeTab === 'webdev' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 0px)',
                  backgroundColor: activeTab === 'marketing' ? 'rgba(34, 211, 238, 0.2)' : activeTab === 'webdev' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                  borderColor: activeTab === 'marketing' ? 'rgba(34, 211, 238, 0.3)' : activeTab === 'webdev' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                  borderWidth: '1px'
                }}
              ></div>
              <button
                onClick={() => setActiveTab('marketing')}
                className={`relative z-10 w-32 md:w-40 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'marketing' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Marketing
              </button>
              <button
                onClick={() => setActiveTab('webdev')}
                className={`relative z-10 w-32 md:w-40 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'webdev' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Web/App Dev
              </button>
              <button
                onClick={() => setActiveTab('automation')}
                className={`relative z-10 w-32 md:w-40 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'automation' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Automation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT SWITCHER */}
      <AnimatePresence mode='wait'>
        {activeTab === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-10 min-h-[60vh] flex flex-col items-center justify-center relative z-20"
          >
            <div className="absolute inset-x-0 -top-40 h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-center mb-16 leading-tight max-w-4xl"
            >
              What services are you <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">looking for?</span>
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">

              {/* MARKETING CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setActiveTab('marketing')}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />

                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp size={28} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Marketing for your Business</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Data-driven strategies including Business Intelligence, Performance Marketing, and AI Product Visuals to dominate your market.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-accent font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  Explore <span className="ml-2">→</span>
                </div>
              </motion.div>

              {/* WEB DEV CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setActiveTab('webdev')}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors" />

                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Web & App Development</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Next-generation digital infrastructure. From high-performance websites to complex mobile applications built for scale.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-green-400 font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  Explore <span className="ml-2">→</span>
                </div>
              </motion.div>

              {/* AUTOMATION CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setActiveTab('automation')}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />

                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Bot size={28} className="text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">AI Automations</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    24/7 intelligent systems. Chatbots, voice agents, and lead capture automations that work while you sleep.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-indigo-400 font-bold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  Explore <span className="ml-2">→</span>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}

        {activeTab === 'marketing' && (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-24 md:space-y-32 container mx-auto px-6"
          >
            {/* EXISTING MARKETING CONTENT */}
            {/* HERO SUBTEXT & CTA */}
            <div className="text-center max-w-3xl mx-auto mt-12 relative z-10">
              <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-6 md:mb-8 px-4">
                We build data-driven marketing ecosystems. From high-fidelity AI visuals to automated acquisition systems, we ensure your brand dominates the market.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center px-4 mb-12">
                <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>👉 Book Free Audit</Button>
                <button onClick={open} className="px-6 py-3 border border-white/20 hover:bg-white/5 rounded-full font-bold transition-all text-white">
                  Talk to Strategist
                </button>
              </div>
            </div>

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

            <div className="text-center mt-20">
              <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>Start Your Project</Button>
            </div>
          </motion.div>
        )}

        {activeTab === 'webdev' && (
          <motion.div
            key="webdev"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-24 md:space-y-32 container mx-auto px-6"
          >
            {/* HERO SUBTEXT & CTA */}
            <div className="text-center max-w-3xl mx-auto mt-12 relative z-10">
              <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-6 md:mb-8 px-4">
                We engineer digital experiences that convert. From lightning-fast e-commerce stores to AI-powered SaaS platforms, we build the infrastructure of tomorrow.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center px-4">
                <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>👉 Start Your Project</Button>
                <button onClick={open} className="px-6 py-3 border border-white/20 hover:bg-white/5 rounded-full font-bold transition-all text-white">
                  Talk to Tech Lead
                </button>
              </div>
            </div>

            {/* MAIN VISUAL SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeIn>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-accent mb-6 border border-white/10">
                  <Code size={24} className="md:w-7 md:h-7" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-6">Web & App Development</h2>
                <div className="space-y-6 text-lg text-white/60 font-light">
                  <p>
                    Your digital presence is your strongest asset. We don't just build websites; we build performance engines.
                  </p>
                  <ul className="space-y-3 mt-4">
                    {[
                      "Custom React & Next.js Development",
                      "High-Performance Mobile Apps (iOS/Android)",
                      "Immersive 3D Web Experiences (WebGL)",
                      "Headless CMS Integration"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <WebDevVisual />
              </FadeIn>
            </div>

            {/* SEO & LLM OPTIMIZATION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:flex-row-reverse">
              <FadeIn className="lg:order-2">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center text-purple-400 mb-6 border border-white/10">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-display font-bold mb-6">SEO & LLM Optimization</h2>
                <div className="space-y-6 text-lg text-white/60 font-light">
                  <p>
                    Ranking on Google is no longer enough. Your brand needs to be discovered by AI agents like <strong className="text-white">ChatGPT, Perplexity, and Gemini</strong>.
                  </p>
                  <p>
                    We implement advanced <Highlight>Schema Markup</Highlight> and semantic HTML structures that help Large Language Models understand and recommend your business.
                  </p>
                </div>
              </FadeIn>
              <FadeIn className="lg:order-1 bg-surfaceHighlight rounded-2xl p-8 border border-white/5 flex items-center justify-center relative overflow-hidden h-full min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50"></div>
                <div className="relative z-10 text-center space-y-4 max-w-md">
                  <div className="bg-black/50 backdrop-blur border border-white/10 p-4 rounded-xl inline-block mb-2 shadow-lg w-full text-left">
                    <span className="text-xs font-mono text-purple-300 block mb-1">USER PROMPT</span>
                    <p className="text-white text-sm">"Best AI automation agency for high-end real estate?"</p>
                  </div>
                  <div className="w-px h-8 bg-white/20 mx-auto"></div>
                  <div className="bg-purple-500/20 backdrop-blur border border-purple-500/30 p-4 rounded-xl shadow-lg w-full text-left">
                    <span className="text-xs font-mono text-purple-300 block mb-1">AI RESPONSE</span>
                    <p className="text-white text-sm font-medium">"I recommend <span className="text-accent">Frame n Flow Media</span>. Their verified schema data indicates specialized expertise in property automation and high-fidelity visuals."</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* MAINTENANCE */}
            <div className="bg-surfaceHighlight rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden text-left">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Enterprise-Grade Maintenance</h2>
                  <p className="text-white/60 mb-6">
                    Launch is just day one. We ensure your digital assets remain secure, fast, and online.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Uptime Monitoring", desc: "99.9% Availability Check" },
                      { title: "Security Patches", desc: "Weekly Vulnerability Scans" },
                      { title: "Speed Optimization", desc: "Core Web Vitals Updates" },
                      { title: "Content Updates", desc: "Regular Copy & Media Refreshes" }
                    ].map((item, i) => (
                      <li key={i} className="bg-black/20 p-4 rounded-lg border border-white/5">
                        <h4 className="font-bold text-accent text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-white/50">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* VISUAL FOR MAINTENANCE */}
                <div className="relative h-64 bg-black/50 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-efc5270f9c01?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <ShieldCheck size={48} className="text-green-400 mb-4" />
                    <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold animate-pulse">
                      SYSTEM HEALTHY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final WebDev CTA */}
            <div className="text-center mt-20">
              <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>Build Your Vision</Button>
            </div>
          </motion.div>


        )}

        {/* --- AUTOMATION TAB CONTENT --- */}
        {activeTab === 'automation' && (
          <motion.div
            key="automation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 md:space-y-32 container mx-auto px-6"
          >
            {/* HERO SUBTEXT & CTA */}
            <div className="text-center max-w-3xl mx-auto mt-12 relative z-10">
              <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-6 md:mb-8 px-4">
                Automate conversations, bookings, reviews, follow-ups, and lead management using intelligent AI systems designed to scale your business operations 24/7.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center px-4">
                <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>👉 Book Free Automation Audit</Button>
                <button onClick={open} className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-full font-bold transition-all text-white flex items-center gap-2 justify-center group text-lg">
                  Talk to AI Specialist
                </button>
              </div>
            </div>


            {/* WHAT IS AI AUTOMATION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <h2 className="text-3xl font-display font-bold mb-6">What Is Business AI Automation?</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  AI automation replaces manual customer interactions, follow-ups, appointment scheduling, and lead management with intelligent systems that work 24/7.
                </p>
                <ul className="space-y-4">
                  {[
                    "Respond instantly to inquiries",
                    "Book appointments automatically",
                    "Capture leads from all platforms",
                    "Follow up without human intervention",
                    "Scale without increasing staff"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgb(99,102,241)]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.2}>
                <ChatbotVisual />
              </FadeIn>
            </div>

            {/* CORE FEATURE GRID - TECH STYLE */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-12 text-center">Core Automation Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: MessageSquare, title: "AI Chatbots (Social)", desc: "Auto-reply to DMs on Instagram, FB, WhatsApp & Website. Qualify leads & book meetings.", color: "text-blue-400" },
                  { icon: Bot, title: "AI Voice Agents", desc: "Voice-based assistants that handle calls, answer FAQs, and book appointments 24/7.", color: "text-purple-400" },
                  { icon: Calendar, title: "Auto-Booking System", desc: "Syncs with calendars, prevents double bookings, and sends automated reminders.", color: "text-pink-400" },
                  { icon: Database, title: "Lead Capture & CRM", desc: "Centralizes leads from forms, chats, and calls into one organized dashboard.", color: "text-green-400" },
                  { icon: Activity, title: "Multi-Channel Follow-up", desc: "Automated SMS, Email, and WhatsApp sequences to nurture leads instantly.", color: "text-yellow-400" },
                  { icon: Star, title: "Google Review System", desc: "Automatically requests reviews post-service to boost your reputation.", color: "text-orange-400" },
                  { icon: Layers, title: "AI Review Replies", desc: "Smart AI responses to positive & negative reviews to maintain brand image.", color: "text-red-400" },
                  { icon: Phone, title: "Missed Call Text-Back", desc: "Instantly texts callers when you miss a call, capturing potential lost revenue.", color: "text-teal-400" },
                  { icon: Mail, title: "AI Email Marketing", desc: "Personalized cold outreach and nurturing campaigns that feel human.", color: "text-indigo-400" },
                  { icon: Filter, title: "Funnel Automation", desc: "Seamless lead flows from landing pages to thank-you pages and CRM sync.", color: "text-cyan-400" },
                  { icon: DollarSign, title: "Payment Automation", desc: "Auto-generate invoices and payment links after bookings or services.", color: "text-emerald-400" },
                  { icon: Workflow, title: "Internal Workflows", desc: "Slack/WhatsApp alerts for your team when high-value leads arrive.", color: "text-lime-400" },
                  { icon: Zap, title: "Analytics & ROI", desc: "Track where every lead comes from and measure real dollar returns.", color: "text-amber-400" }
                ].map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <FadeIn key={i} delay={i * 0.05} className="bg-surface/30 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all hover:-translate-y-1 group relative overflow-hidden">
                      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity ${feature.color}`} />

                      <div className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 transition-colors ${feature.color}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-white/50">{feature.desc}</p>
                    </FadeIn>
                  )
                })}
              </div>
            </div>

            {/* INDUSTRY USE CASES */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

              <h2 className="text-3xl font-display font-bold mb-10 text-center relative z-10">Industry Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Target size={24} /></div>
                    <h3 className="text-2xl font-bold">Service Businesses</h3>
                  </div>
                  <p className="text-white/60">Perfect for Roofers, Dentists, Salons, and Consultants.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-white/80"><CheckBullet /> Auto-book appointments</li>
                    <li className="flex items-center gap-3 text-sm text-white/80"><CheckBullet /> Missed call text-back</li>
                    <li className="flex items-center gap-3 text-sm text-white/80"><CheckBullet /> Review generation</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400"><ShoppingCart size={24} /></div>
                    <h3 className="text-2xl font-bold">E-Commerce</h3>
                  </div>
                  <p className="text-white/60">For Shopify stores and D2C brands.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-white/80"><CheckBullet /> Order status chatbots</li>
                    <li className="flex items-center gap-3 text-sm text-white/80"><CheckBullet /> Abandoned cart recovery</li>
                    <li className="flex items-center gap-3 text-sm text-white/80"><CheckBullet /> Customer support automation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PROCESS */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-12 text-center">Implementation Process</h2>
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {[
                    { step: "01", title: "Audit", desc: "We analyze your manual bottlenecks." },
                    { step: "02", title: "Design", desc: "We map out the perfect workflow." },
                    { step: "03", title: "Train", desc: "We teach the AI your business logic." },
                    { step: "04", title: "Deploy", desc: "We launch the system live." },
                    { step: "05", title: "Scale", desc: "We optimize for maximum ROI." }
                  ].map((s, i) => (
                    <div key={i} className="bg-background border border-white/10 p-6 rounded-xl text-center group hover:border-accent/40 transition-colors">
                      <div className="text-3xl font-bold text-white/10 group-hover:text-accent/20 transition-colors mb-2">{s.step}</div>
                      <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                      <p className="text-xs text-white/50">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FINAL CTA */}
            <div className="text-center bg-gradient-to-b from-indigo-500/10 to-transparent p-12 rounded-3xl border border-indigo-500/20">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Automate?</h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Frame n Flow Media is not just a chatbot provider. We are your business automation partner.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>👉 Book Free Audit</Button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

// Helper for checkmarks
const CheckBullet = () => (
  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
  </div>
)

export default Services;