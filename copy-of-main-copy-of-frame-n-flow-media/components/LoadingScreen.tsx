import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [statusText, setStatusText] = useState("Initializing Hunter Protocol...");
    const [isRoaring, setIsRoaring] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Mouse Parallax Logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20; // Sensitivity
        const y = (e.clientY - top - height / 2) / 20;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    useEffect(() => {
        const textSequence = [
            { text: "Tracking Market Signals...", time: 0 },
            { text: "Analyzing Competitor Data...", time: 1000 },
            { text: "Target Locked...", time: 2000 },
            { text: "DOMINANCE: ACTIVE.", time: 3000 }
        ];

        // Text Updates
        const timers = textSequence.map(({ text, time }) =>
            setTimeout(() => setStatusText(text), time)
        );

        // Sequence: Roar Trigger
        const roarTimer = setTimeout(() => {
            setIsRoaring(true);
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch(e => console.log("Audio needed user interact"));
            }
        }, 3200);

        // Completion
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4500);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(roarTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-sans overflow-hidden"
            onMouseMove={handleMouseMove}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <audio ref={audioRef} src="/roar.mp3" preload="auto" />

            {/* Premium Mesh Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent/30 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* 3D PERSPECTIVE CONTAINER */}
            <div className="relative z-10 [perspective:1000px] w-full flex flex-col items-center justify-center">

                {/* ROTATING CARD (Panther) */}
                <div
                    ref={containerRef}
                    className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-100 ease-out [transform-style:preserve-3d]"
                >
                    {/* SVG PANTHER - High Tech Wireframe */}
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                        animate={isRoaring ? { scale: [1, 1.1, 1], filter: "hue-rotate(90deg)" } : {}}
                        transition={{ duration: 0.2, repeat: isRoaring ? 5 : 0 }}
                    >
                        <defs>
                            <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>

                        {/* --- GEOMETRIC PANTHER CONSTRUCTION --- */}

                        {/* 1. Main Head Shape (Hexagonal) */}
                        <motion.path
                            d="M20 20 L40 30 L60 30 L80 20 L85 50 L60 85 L40 85 L15 50 Z"
                            fill={isRoaring ? "rgba(34,211,238,0.1)" : "none"}
                            stroke="url(#neonGrad)"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* 2. Inner Face Details (Nose Bridge) */}
                        <motion.path
                            d="M40 30 L50 70 L60 30 M50 70 L50 85"
                            stroke="url(#neonGrad)"
                            strokeWidth="0.5"
                            strokeOpacity="0.6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />

                        {/* 3. Eyes (Glowing Triangles) */}
                        <g>
                            <path d="M30 45 L42 48 L32 52 Z" fill="#22d3ee" opacity={isRoaring ? 1 : 0.8} />
                            <path d="M70 45 L58 48 L68 52 Z" fill="#22d3ee" opacity={isRoaring ? 1 : 0.8} />

                            {/* Eye Trace Lines */}
                            <motion.path
                                d="M15 50 L30 45 M85 50 L70 45"
                                stroke="white" strokeWidth="0.2" opacity="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 1 }}
                            />
                        </g>

                        {/* 4. Ears (Detailed) */}
                        <path d="M20 20 L30 35 M80 20 L70 35" stroke="url(#neonGrad)" strokeWidth="0.5" />

                        {/* 5. Constellation Nodes (The "Tech" Look) */}
                        {[
                            [20, 20], [80, 20], [40, 30], [60, 30],
                            [15, 50], [85, 50], [30, 45], [70, 45],
                            [40, 85], [60, 85], [50, 70]
                        ].map(([cx, cy], i) => (
                            <motion.circle
                                key={i}
                                cx={cx} cy={cy} r={isRoaring ? 1.5 : 0.8}
                                fill="white"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 + 1 }}
                            />
                        ))}

                        {/* 6. Mouth / Roar Effect */}
                        <AnimatePresence>
                            {isRoaring && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Sonic Waves */}
                                    <circle cx="50" cy="70" r="10" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
                                    <circle cx="50" cy="70" r="20" stroke="white" strokeWidth="0.2" fill="none" opacity="0.3" />
                                    <path d="M40 75 L60 75 L50 85 Z" fill="white" /> {/* Open Mouth */}
                                </motion.g>
                            )}
                        </AnimatePresence>

                    </motion.svg>
                </div>

                {/* TEXT CONTEXT - Keeping it Tech/Clean */}
                <motion.div
                    className="mt-10 flex flex-col items-center space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <div className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isRoaring ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                        <span className="font-mono text-xs text-accent/80 tracking-widest uppercase">
                            {statusText}
                        </span>
                    </div>
                </motion.div>

            </div>

            {/* Progress Line */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-accent w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.5, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LoadingScreen;
