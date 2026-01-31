import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [statusText, setStatusText] = useState("Initializing Protocol...");
    const [isRoaring, setIsRoaring] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax Logic - REFINED
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        // Calculate percentages -1 to 1
        const xPct = (e.clientX - left - width / 2) / width;
        const yPct = (e.clientY - top - height / 2) / height;

        // Clamp rotation to very subtle values suitable for "Premium" feel (max 10deg)
        // Prevents "curvy" or distorted look on large screens
        const rotationX = Math.max(-10, Math.min(10, -yPct * 20)); // Inverted Y for natural tilt
        const rotationY = Math.max(-10, Math.min(10, xPct * 20));

        containerRef.current.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    };

    // Synthesized Cyber-Roar
    const playCyberRoar = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const t = ctx.currentTime;

            // 1. White Noise (Breath)
            const bufferSize = ctx.sampleRate * 2.0;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'lowpass';
            noiseFilter.frequency.setValueAtTime(100, t);
            noiseFilter.frequency.exponentialRampToValueAtTime(3000, t + 0.3);
            noiseFilter.frequency.exponentialRampToValueAtTime(100, t + 1.5);

            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0, t);
            noiseGain.gain.linearRampToValueAtTime(0.5, t + 0.1);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 1.5);

            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start();
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        const textSequence = [
            { text: "Tracking Signals...", time: 0 },
            { text: "Acquiring Target...", time: 1000 },
            { text: "Locked.", time: 2000 },
        ];
        const timers = textSequence.map(({ text, time }) => setTimeout(() => setStatusText(text), time));
        const roarTimer = setTimeout(() => {
            setIsRoaring(true);
            setStatusText("APEX STATUS ACTIVE");
            playCyberRoar();
        }, 2800);
        const completeTimer = setTimeout(onComplete, 4000);
        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(roarTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center font-sans overflow-hidden"
            onMouseMove={handleMouseMove}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* --- PREMIUM DEPTH BACKGROUND --- */}

            {/* 1. Deep Space Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] pointer-events-none" />

            {/* 2. 3D Perspective Grid Floor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-500">
                <div
                    className="absolute inset-[-100%] top-[50%] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] transform rotate-x-[60deg] origin-top"
                    style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)" }}
                />
            </div>

            {/* 3. Floating Data Particles (Depth Layers) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-white/40 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* 4. Vignette & Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />


            {/* --- CENTRAL STAGE --- */}
            <div className="relative z-10 [perspective:1000px] w-full flex flex-col items-center justify-center">

                {/* THE TITANIUM PANTHER */}
                <div
                    ref={containerRef}
                    className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform"
                >
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                        animate={isRoaring ? {
                            scale: [1, 1.05, 1],
                            filter: ["brightness(1)", "brightness(2.5)", "brightness(1)"]
                        } : {}}
                        transition={{ duration: 0.15, repeat: isRoaring ? 3 : 0 }}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#f1f5f9" /> {/* Lighter top */}
                                <stop offset="50%" stopColor="#94a3b8" />
                                <stop offset="100%" stopColor="#475569" /> {/* Darker bottom */}
                            </linearGradient>
                        </defs>

                        {/* HEAD CONSTRUCTION */}
                        <g>
                            {/* Back Glow for Detail */}
                            <path
                                d="M20 15 L40 25 L60 25 L80 15 L85 50 L60 90 L40 90 L15 50 Z"
                                fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"
                            />

                            {/* MAIN WIREFRAME */}
                            <motion.path
                                d="M20 15 L40 25 L60 25 L80 15 L85 50 L60 90 L40 90 L15 50 Z"
                                fill="rgba(23, 23, 23, 0.4)" /* Subtle Fill for Solidity */
                                stroke="url(#metalGrad)"
                                strokeWidth="0.6"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5 }}
                            />

                            {/* Inner Details */}
                            <motion.path
                                d="M40 25 L50 70 L60 25 M50 70 L25 50 M50 70 L75 50 M50 70 L50 85"
                                stroke="url(#metalGrad)"
                                strokeWidth="0.4"
                                strokeOpacity={0.6}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.4 }}
                            />

                            {/* Eyes */}
                            <g className="mix-blend-screen">
                                <path d="M30 40 L42 43 L32 46 Z" fill="#fff" />
                                <path d="M70 40 L58 43 L68 46 Z" fill="#fff" />

                                <motion.path
                                    d="M30 40 L42 43 L32 46 Z"
                                    fill="#22d3ee"
                                    filter="blur(3px)"
                                    animate={{ opacity: isRoaring ? [0.6, 1, 0.6] : 0.6 }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                />
                                <motion.path
                                    d="M70 40 L58 43 L68 46 Z"
                                    fill="#22d3ee"
                                    filter="blur(3px)"
                                    animate={{ opacity: isRoaring ? [0.6, 1, 0.6] : 0.6 }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                />
                            </g>

                            {/* Tech Nodes */}
                            {[
                                [20, 15], [80, 15], [40, 25], [60, 25],
                                [15, 50], [85, 50], [40, 90], [60, 90], [50, 70]
                            ].map(([cx, cy], i) => (
                                <motion.circle
                                    key={i}
                                    cx={cx} cy={cy} r={0.6}
                                    fill="white"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.2 + i * 0.05 }}
                                />
                            ))}
                        </g>

                    </motion.svg>
                </div>

                {/* STATUS with HUD Elements */}
                <motion.div
                    className="mt-14 flex items-center justify-center space-x-4 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/30" />
                    <span className="font-mono text-[10px] text-white/60 tracking-[0.3em] uppercase">
                        {statusText}
                    </span>
                    <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/30" />
                </motion.div>

            </div>

            {/* Bottom Progress */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-white/20 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.0, ease: "linear" }}
            >
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent opacity-50" />
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
