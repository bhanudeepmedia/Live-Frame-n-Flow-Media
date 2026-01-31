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
            { text: "Initializing Core...", time: 0 },
            { text: "Loading Experience...", time: 1000 },
            { text: "Ready.", time: 2000 },
        ];
        const timers = textSequence.map(({ text, time }) => setTimeout(() => setStatusText(text), time));
        const roarTimer = setTimeout(() => {
            setIsRoaring(true);
            setStatusText("WELCOME TO FRAME N FLOW");
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

            {/* 1. Dynamic Aurora Gradient Base */}
            <div className="absolute inset-0 bg-[#030303] overflow-hidden">
                <motion.div
                    className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 blur-[100px]"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        background: "conic-gradient(from 0deg, #1e1b4b, #000000, #1e293b, #030303, #1e1b4b)"
                    }}
                />
            </div>

            {/* 2. Floating "Fun" Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Purple Orb */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Cyan Orb (Brand Accent) */}
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen"
                    animate={{
                        x: [0, -70, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Blue/Pink Pop Orb */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] mix-blend-screen"
                    animate={{
                        x: [-150, 150, -150],
                        y: [-100, 100, -100],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* 3. Subtle Hexagonal Mesh Grid instead of standard floor */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* 4. Shooting Star Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            rotate: -45
                        }}
                        animate={{
                            x: [-500, 500],
                            y: [500, -500],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* 5. Vignette & Grain */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />


            {/* --- CENTRAL STAGE --- */}
            <div className="relative z-10 [perspective:1000px] w-full flex flex-col items-center justify-center">

                {/* THE LOGO */}
                <div
                    ref={containerRef}
                    className="relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform"
                >
                    <motion.div
                        className="w-full h-full relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {/* Glow Effect behind logo */}
                        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse" />

                        <motion.img
                            src="/logo.png"
                            alt="Frame n Flow Media"
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                            animate={isRoaring ? {
                                scale: [1, 1.1, 1],
                                filter: ["brightness(1) drop-shadow(0 0 15px rgba(255,255,255,0.5))", "brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.9))", "brightness(1) drop-shadow(0 0 15px rgba(255,255,255,0.5))"]
                            } : {}}
                            transition={{ duration: 0.3, repeat: isRoaring ? 2 : 0 }}
                        />
                    </motion.div>
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
