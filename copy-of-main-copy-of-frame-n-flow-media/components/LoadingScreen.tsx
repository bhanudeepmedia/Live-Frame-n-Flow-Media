import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [statusText, setStatusText] = useState("Initializing Ecosystem...");

    useEffect(() => {
        const textSequence = [
            { text: "Synthesizing AI Models...", time: 0 },
            { text: "Optimizing Neural Networks...", time: 800 },
            { text: "Calibrating Growth Engines...", time: 1600 },
            { text: "F/F System Ready.", time: 2400 }
        ];

        // Schedule text updates
        const timers = textSequence.map(({ text, time }) =>
            setTimeout(() => setStatusText(text), time)
        );

        // Completion trigger
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3200);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(10px)",
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_50%)]" />
                {/* Thin technical grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
            </div>

            {/* MAIN CORE ASSEMBLY */}
            <div className="relative z-10 flex flex-col items-center">

                {/* 1. THE FRAME (Brackets) */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Left Bracket */}
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-8 border-l-2 border-t-2 border-b-2 border-accent/40 rounded-l-2xl"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    {/* Right Bracket */}
                    <motion.div
                        className="absolute right-0 top-0 bottom-0 w-8 border-r-2 border-t-2 border-b-2 border-accent/40 rounded-r-2xl"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* 2. THE FLOW (Gyroscopic Core) */}
                    <div className="relative w-40 h-40 [perspective:1000px]">

                        {/* Outer Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-white/10 border-t-accent/80 border-b-accent/80 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            animate={{ rotateX: 360, rotateY: 180, rotateZ: 45 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Middle Ring */}
                        <motion.div
                            className="absolute inset-4 rounded-full border border-white/10 border-l-blue-500 border-r-blue-500"
                            animate={{ rotateX: 180, rotateY: 360, rotateZ: -45 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Ring */}
                        <motion.div
                            className="absolute inset-8 rounded-full border border-white/20 border-t-white"
                            animate={{ rotateX: -360, rotateZ: 90 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* CENTRAL SINGULARITY */}
                        <motion.div
                            className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(34,211,238,0.8)]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                {/* 3. CONTEXT DATA */}
                <motion.div
                    className="mt-12 flex flex-col items-center space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <motion.div
                            className="w-2 h-2 bg-accent rounded-full"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="font-mono text-xs text-accent tracking-widest uppercase min-w-[200px] text-center">
                            {statusText}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Loading Bar at Ultra Bottom */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.2, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LoadingScreen;
