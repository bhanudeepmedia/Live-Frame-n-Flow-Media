import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [stage, setStage] = useState<'counting' | 'launching' | 'complete'>('counting');

    useEffect(() => {
        // Phase 1: Counting down/preparing (0-2s)
        const timer1 = setTimeout(() => {
            setStage('launching');
        }, 2500); // Extended slightly for detail appreciation

        // Phase 2: Launch and Reveal (2.5s - 4s)
        const timer2 = setTimeout(() => {
            setStage('complete');
            onComplete();
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{
                y: "-100%",
                transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Premium Graph Paper Background (Matching Home) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                {/* Subtle Radial Gradient to focus center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />

                {/* Exact Grid from Home Page */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                {/* The Rocket Container */}
                <motion.div
                    className="relative will-change-transform"
                    initial={{ y: 200, opacity: 0 }}
                    animate={
                        stage === 'counting' ? { y: 0, opacity: 1 } :
                            stage === 'launching' ? { y: -1200, scale: 0.9 } :
                                {}
                    }
                    transition={
                        stage === 'counting' ? { duration: 0.8, ease: "easeOut" } :
                            stage === 'launching' ? { duration: 1.8, ease: "anticipate" } : // 'anticipate' gives a nice pullback before launch
                                {}
                    }
                >
                    {/* Rocket SVG - High Fidelity "Starship" Style */}
                    <div className="relative w-32 h-64 md:w-40 md:h-80 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">

                        {/* Engine Glow / Exhaust - Dynamic */}
                        <AnimatePresence>
                            {(stage === 'launching' || stage === 'counting') && (
                                <motion.div
                                    className="absolute top-[90%] left-1/2 -translate-x-1/2 w-16 h-32 origin-top opacity-0 z-0"
                                    initial={{ scaleY: 0.2, opacity: 0 }}
                                    animate={
                                        stage === 'counting' ? { scaleY: [0.4, 0.5, 0.4], opacity: 0.3 } :
                                            stage === 'launching' ? { scaleY: 3.5, scaleX: 1.2, opacity: 1 } :
                                                {}
                                    }
                                    transition={{ repeat: stage === 'counting' ? Infinity : 0, duration: 0.1 }}
                                >
                                    {/* Core White Plasma */}
                                    <div className="absolute inset-0 bg-white blur-md rounded-b-full w-[60%] left-[20%] h-full" />
                                    {/* Blue/Cyan Electric Edge */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-blue-600 blur-lg rounded-b-full opacity-80" />
                                    {/* Outer Heat Haze */}
                                    <div className="absolute -inset-4 bg-orange-500/10 blur-xl rounded-full" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Rocket Body */}
                        <svg viewBox="0 0 200 400" className="w-full h-full z-10 relative">
                            <defs>
                                {/* Metallic Hull Gradient */}
                                <linearGradient id="hullChrome" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#334155" /> {/* Dark Slate */}
                                    <stop offset="20%" stopColor="#94a3b8" /> {/* Highlight */}
                                    <stop offset="50%" stopColor="#f8fafc" /> {/* Shine */}
                                    <stop offset="80%" stopColor="#64748b" /> {/* Shadow */}
                                    <stop offset="100%" stopColor="#1e293b" /> {/* Darkest Edge */}
                                </linearGradient>

                                {/* Dark Glass Gradient */}
                                <linearGradient id="glassDark" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0f172a" />
                                    <stop offset="100%" stopColor="#000000" />
                                </linearGradient>

                                {/* Gold Foil / Heat Shield Gradient */}
                                <linearGradient id="heatShield" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#1e1e1e" />
                                    <stop offset="100%" stopColor="#3f3f46" />
                                </linearGradient>
                            </defs>

                            {/* --- REAR FINS (Background) --- */}
                            {/* Left Fin */}
                            <path d="M40 320 L10 380 L60 360 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                            {/* Right Fin */}
                            <path d="M160 320 L190 380 L140 360 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />

                            {/* --- MAIN HULL --- */}
                            {/* Body Construction */}
                            <path d="M100 20 Q140 80 140 350 L60 350 Q60 80 100 20 Z" fill="url(#hullChrome)" />

                            {/* --- DETAILS & PANELS --- */}
                            {/* Nose Cone Seam */}
                            <path d="M82 80 Q100 85 118 80" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.5" />
                            {/* Mid Body Seam */}
                            <path d="M65 200 Q100 205 135 200" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3" />

                            {/* Cockpit Window (Vertical Slit style) */}
                            <path d="M95 100 L105 100 L105 140 L95 140 Z" fill="url(#glassDark)" stroke="#475569" strokeWidth="0.5" />
                            {/* Window Glint */}
                            <rect x="97" y="105" width="2" height="15" fill="cyan" opacity="0.4" />

                            {/* Front Vertical Fin / Aerodynamic ridge */}
                            <path d="M100 150 L100 340" stroke="#cbd5e1" strokeWidth="1" opacity="0.3" />

                            {/* --- LOWER SECTION (Engines/Legs) --- */}
                            {/* Landing Leg - Center */}
                            <path d="M90 350 L100 390 L110 350" fill="#1e293b" />

                            {/* Brand Logo / Markings */}
                            <text x="100" y="180" textAnchor="middle" fontSize="60" fill="rgba(0,0,0,0.1)" transform="rotate(-90 100 180)" fontWeight="bold" style={{ fontFamily: 'Arial' }}>F/F</text>

                            {/* Blue Accent Ring */}
                            <path d="M62 300 Q100 305 138 300" fill="none" stroke="cyan" strokeWidth="1.5" opacity="0.6" filter="drop-shadow(0 0 2px cyan)" />

                        </svg>
                    </div>
                </motion.div>

                {/* Text Container - Fades out on launch */}
                <motion.div
                    className="mt-16 text-center"
                    animate={stage === 'launching' ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-4xl font-display font-black text-white tracking-tighter uppercase mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Launch Imminent</span>
                    </h2>

                    {/* Retro Terminal Text */}
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg inline-flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-accent text-xs font-mono tracking-widest uppercase">
                            Systems Nominal
                        </p>
                    </div>
                </motion.div>

            </div>

            {/* Loading Progress Bar at Bottom */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent z-50 shadow-[0_0_20px_cyan]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.0, ease: "linear" }}
            />

        </motion.div>
    );
};

export default LoadingScreen;
