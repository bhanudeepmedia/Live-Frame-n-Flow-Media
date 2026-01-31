import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [stage, setStage] = useState<'counting' | 'launching' | 'complete'>('counting');

    useEffect(() => {
        // Phase 1: Counting down/preparing (0-2s)
        const timer1 = setTimeout(() => {
            setStage('launching');
        }, 2000);

        // Phase 2: Launch and Reveal (2.0s - 3.5s)
        const timer2 = setTimeout(() => {
            setStage('complete');
            onComplete();
        }, 3500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Premium Graph Paper Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            {/* Main Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                {/* The Rocket Container */}
                <motion.div
                    className="relative will-change-transform"
                    initial={{ y: 200, opacity: 0 }}
                    animate={
                        stage === 'counting' ? { y: 0, opacity: 1 } :
                            stage === 'launching' ? { y: -1000, scale: 0.8 } :
                                {}
                    }
                    transition={
                        stage === 'counting' ? { duration: 0.8, ease: "easeOut" } :
                            stage === 'launching' ? { duration: 1.5, ease: "easeIn" } : // Slower start, then zoom
                                {}
                    }
                >
                    {/* Rocket SVG - Custom Designed for "Premium 3D" look using CSS gradients within SVG */}
                    <div className="relative w-24 h-40 md:w-32 md:h-52">
                        {/* Exhaust Fire - Visible on Launch */}
                        <AnimatePresence>
                            {(stage === 'launching' || stage === 'counting') && (
                                <motion.div
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-24 origin-top"
                                    initial={{ scaleY: 0.2, opacity: 0 }}
                                    animate={
                                        stage === 'counting' ? { scaleY: [0.2, 0.3, 0.2], opacity: 0.5 } : // Idling
                                            stage === 'launching' ? { scaleY: 2.5, scaleX: 1.5, opacity: 1 } : // Blast off
                                                {}
                                    }
                                    transition={{ repeat: stage === 'counting' ? Infinity : 0, duration: 0.1 }}
                                >
                                    <div className="w-full h-full bg-gradient-to-b from-orange-400 via-red-500 to-transparent blur-md rounded-b-full" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-white blur-sm rounded-b-full" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* The Rocket Body */}
                        <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-2xl filter">
                            <defs>
                                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#e2e8f0" /> {/* Light Grey Left */}
                                    <stop offset="50%" stopColor="#ffffff" /> {/* Highlight Center (3D effect) */}
                                    <stop offset="100%" stopColor="#94a3b8" /> {/* Shadow Right */}
                                </linearGradient>
                                <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#cbd5e1" />
                                    <stop offset="100%" stopColor="#64748b" />
                                </linearGradient>
                                <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#38bdf8" /> {/* Cyan */}
                                    <stop offset="100%" stopColor="#0ea5e9" /> {/* Blue */}
                                </linearGradient>
                            </defs>

                            {/* Left Fin */}
                            <path d="M25 150 L0 190 L25 180 Z" fill="url(#finGrad)" />

                            {/* Right Fin */}
                            <path d="M75 150 L100 190 L75 180 Z" fill="url(#finGrad)" />

                            {/* Main Body */}
                            <path d="M50 0 Q90 60 75 180 L25 180 Q10 60 50 0 Z" fill="url(#bodyGrad)" />

                            {/* Center Fin (Vertical) for 3D depth */}
                            <path d="M50 140 L50 190 L50 180 Z" stroke="#64748b" strokeWidth="1" />

                            {/* Window/Por ring */}
                            <circle cx="50" cy="60" r="14" fill="#1e293b" />
                            {/* Window Glass */}
                            <circle cx="50" cy="60" r="10" fill="url(#windowGrad)" />
                            {/* Window Reflection */}
                            <circle cx="47" cy="57" r="3" fill="white" opacity="0.6" />
                        </svg>
                    </div>
                </motion.div>

                {/* Text Container - Fades out on launch */}
                <motion.div
                    className="mt-12 text-center"
                    animate={stage === 'launching' ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-widest uppercase mb-2">
                        Prepare for Liftoff
                    </h2>
                    <p className="text-white/50 text-sm font-mono">
                        Initializing Launch Sequence...
                    </p>
                </motion.div>

            </div>

            {/* Loading Progress Bar at Bottom */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-accent z-50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
            />

        </motion.div>
    );
};

export default LoadingScreen;
