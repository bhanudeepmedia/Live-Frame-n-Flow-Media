import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [statusText, setStatusText] = useState("Initializing Protocol...");
    const [isRoaring, setIsRoaring] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax Logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25; // Lower sensitivity for heavier feel
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    // Synthesized Cyber-Roar (No external file needed)
    const playCyberRoar = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const t = ctx.currentTime;

            // 1. White Noise (The Breath/Roar)
            const bufferSize = ctx.sampleRate * 2.0;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'lowpass';
            noiseFilter.frequency.setValueAtTime(100, t);
            noiseFilter.frequency.exponentialRampToValueAtTime(2000, t + 0.4); // Fast Open
            noiseFilter.frequency.exponentialRampToValueAtTime(100, t + 1.5); // Slow Close

            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0, t);
            noiseGain.gain.linearRampToValueAtTime(0.8, t + 0.1);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 1.5);

            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start();

            // 2. Sub-Bass Drop (The Impact)
            const sub = ctx.createOscillator();
            sub.type = 'triangle';
            sub.frequency.setValueAtTime(60, t);
            sub.frequency.exponentialRampToValueAtTime(10, t + 1.5);

            const subGain = ctx.createGain();
            subGain.gain.setValueAtTime(0.5, t);
            subGain.gain.exponentialRampToValueAtTime(0.01, t + 1.0);

            sub.connect(subGain);
            subGain.connect(ctx.destination);
            sub.start();

        } catch (e) {
            console.error("Audio generation failed", e);
        }
    };

    useEffect(() => {
        const textSequence = [
            { text: "Tracking Signals...", time: 0 },
            { text: "Acquiring Target...", time: 1000 },
            { text: "Locked.", time: 2000 },
        ];

        const timers = textSequence.map(({ text, time }) =>
            setTimeout(() => setStatusText(text), time)
        );

        // Roar Trigger
        const roarTimer = setTimeout(() => {
            setIsRoaring(true);
            setStatusText("APEX STATUS ACTIVE");
            playCyberRoar();
        }, 2800);

        // Completion
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(roarTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center font-sans overflow-hidden"
            onMouseMove={handleMouseMove}
            exit={{
                opacity: 0,
                // Premium split exit instead of slide
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            {/* Ultra-Minimal Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
                {/* Very faint noise texture for realism */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* 3D CONTAINER */}
            <div className="relative z-10 [perspective:1200px] w-full flex flex-col items-center justify-center">

                {/* THE TITANIUM PANTHER */}
                <div
                    ref={containerRef}
                    className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-100 ease-out [transform-style:preserve-3d]"
                >
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        // Roar: Pure White Flash, No Rainbows
                        animate={isRoaring ? {
                            scale: [1, 1.05, 1],
                            filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
                        } : {}}
                        transition={{ duration: 0.2, repeat: isRoaring ? 3 : 0 }}
                    >
                        <defs>
                            {/* Premium Metallic Gradient */}
                            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#e2e8f0" /> {/* Slate 200 */}
                                <stop offset="50%" stopColor="#94a3b8" /> {/* Slate 400 */}
                                <stop offset="100%" stopColor="#475569" /> {/* Slate 600 */}
                            </linearGradient>

                            {/* Accent Gradient (Subtle) */}
                            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fff" />
                                <stop offset="100%" stopColor="#cbd5e1" />
                            </linearGradient>
                        </defs>

                        {/* --- GEOMETRY: SHARP & MINIMAL --- */}

                        {/* 1. Base Wireframe - Dark Graphite to White */}
                        <motion.path
                            d="M20 15 L40 25 L60 25 L80 15 L85 50 L60 90 L40 90 L15 50 Z"
                            fill="none"
                            stroke="url(#metalGrad)"
                            strokeWidth="0.8"
                            strokeOpacity={0.8}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* 2. Inner Structure (Nose/Brow) */}
                        <motion.path
                            d="M40 25 L50 70 L60 25 M50 70 L25 50 M50 70 L75 50"
                            stroke="url(#metalGrad)"
                            strokeWidth="0.5"
                            strokeOpacity={0.5}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                        />

                        {/* 3. Eyes - COLD BLUE (The only color) */}
                        <g className="mix-blend-screen">
                            <path d="M30 40 L42 43 L32 46 Z" fill="#fff" /> {/* L Target */}
                            <path d="M70 40 L58 43 L68 46 Z" fill="#fff" /> {/* R Target */}

                            {/* Eye Glow - Reacts to Roar */}
                            <motion.path
                                d="M30 40 L42 43 L32 46 Z"
                                fill="#22d3ee"
                                filter="blur(4px)"
                                animate={{ opacity: isRoaring ? [0.5, 1, 0.5] : 0.6 }}
                                transition={{ duration: 0.1, repeat: Infinity }}
                            />
                            <motion.path
                                d="M70 40 L58 43 L68 46 Z"
                                fill="#22d3ee"
                                filter="blur(4px)"
                                animate={{ opacity: isRoaring ? [0.5, 1, 0.5] : 0.6 }}
                                transition={{ duration: 0.1, repeat: Infinity }}
                            />
                        </g>

                        {/* 4. Precision Nodes (White Dots) */}
                        {[
                            [20, 15], [80, 15], [40, 25], [60, 25],
                            [15, 50], [85, 50], [40, 90], [60, 90],
                            [50, 70]
                        ].map(([cx, cy], i) => (
                            <motion.circle
                                key={i}
                                cx={cx} cy={cy} r={0.8}
                                fill="white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 + i * 0.05 }}
                            />
                        ))}
                    </motion.svg>
                </div>

                {/* TEXT STATUS - Minimal & Monospaced */}
                <motion.div
                    className="mt-12 flex flex-col items-center space-y-2 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    <div className="flex items-center space-x-3">
                        {/* Status Dot */}
                        <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="font-mono text-[10px] text-white/70 tracking-[0.3em] uppercase">
                            {statusText}
                        </span>
                    </div>
                </motion.div>

            </div>

            {/* Loading Bar - Ultra Thin White */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-white w-full opacity-30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.0, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LoadingScreen;
