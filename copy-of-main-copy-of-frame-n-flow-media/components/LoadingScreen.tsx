import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [statusText, setStatusText] = useState("Initializing Hunter Protocol...");

    useEffect(() => {
        const textSequence = [
            { text: "Tracking Market Signals...", time: 0 },
            { text: "Stalking Competitor Data...", time: 1000 },
            { text: "Calculated Precision...", time: 2000 },
            { text: "Market Dominance: Active.", time: 3000 }
        ];

        // Schedule text updates
        const timers = textSequence.map(({ text, time }) =>
            setTimeout(() => setStatusText(text), time)
        );

        // Completion trigger
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3800);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Dark Jungle Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.03)_0%,transparent_60%)]" />
                {/* Hex Grid for Cyber Feel */}
                <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(150deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            {/* DIGITAL PANTHER CONTAINER */}
            <div className="relative z-10 flex flex-col items-center justify-center">

                {/* The Panther Head SVG */}
                <motion.div
                    className="relative w-48 h-48 md:w-64 md:h-64 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                            </linearGradient>
                        </defs>

                        {/* --- WIREFRAME CONSTRUCTION ANIMATION --- */}

                        {/* Main Head Outline */}
                        <motion.path
                            d="M20 15 L35 30 L65 30 L80 15 L85 45 L60 85 L40 85 L15 45 Z"
                            fill="none"
                            stroke="url(#cyberGrad)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Inner Detail Lines (Nose Bridge) */}
                        <motion.path
                            d="M35 30 L50 70 L65 30"
                            fill="none"
                            stroke="url(#cyberGrad)"
                            strokeWidth="1"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                        />

                        {/* Nose Triangle */}
                        <motion.path
                            d="M45 70 L55 70 L50 80 Z"
                            fill="#22d3ee"
                            fillOpacity="0.8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5, type: "spring" }}
                        />

                        {/* GLOWING EYES (The Soul) */}
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                        >
                            {/* Left Eye */}
                            <path d="M30 45 L42 48 L32 52 Z" fill="#fff" />
                            {/* Right Eye */}
                            <path d="M70 45 L58 48 L68 52 Z" fill="#fff" />

                            {/* Eye Glow Pulse */}
                            <motion.path
                                d="M30 45 L42 48 L32 52 Z"
                                fill="#22d3ee"
                                filter="blur(3px)"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.path
                                d="M70 45 L58 48 L68 52 Z"
                                fill="#22d3ee"
                                filter="blur(3px)"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.g>

                        {/* Scanning Effect Overlay */}
                        <motion.rect
                            x="0" y="0" width="100" height="2" fill="#fff" fillOpacity="0.1"
                            animate={{ y: [0, 100, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                    </svg>
                </motion.div>

                {/* 3. CONTEXT DATA */}
                <motion.div
                    className="mt-8 flex flex-col items-center space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl backdrop-blur-md">
                        <motion.div
                            className="w-2 h-2 bg-emerald-500 rounded-full"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <span className="font-mono text-sm text-emerald-400 tracking-widest uppercase min-w-[220px] text-center font-bold">
                            {statusText}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Loading Bar at Ultra Bottom */}
            <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent w-full shadow-[0_0_20px_#22d3ee]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.8, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LoadingScreen;
