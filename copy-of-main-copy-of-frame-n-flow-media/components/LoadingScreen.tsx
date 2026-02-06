import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Smooth progress animation without blocking state updates
        let start = null;
        const duration = 2000; // 2 seconds

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setProgress(progress * 100);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setTimeout(onComplete, 500); // Wait a bit at 100%
            }
        };

        window.requestAnimationFrame(step);

    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }} // Custom easeOutQuint
        >
            {/* Dynamic Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-[#050505] to-[#050505]" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                      linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Logo with sophisticated reveal - INCREASED SIZE */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-48 md:w-64 mb-12"
                >
                    {/* Soft ambient glow behind logo */}
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-125" />

                    <img
                        src="/favicon.png"
                        alt="Frame n Flow Media"
                        className="relative w-full h-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* Minimalist Progress Line - Refined UI */}
                <div className="w-64 md:w-80 h-[1px] bg-zinc-800 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        style={{ width: `${progress}%` }}
                        layoutId="progress-bar"
                    />
                </div>

                {/* Tracking Text */}
                <div className="mt-4 flex justify-between w-64 md:w-80 text-[10px] uppercase font-medium tracking-[0.3em] text-zinc-600">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading Assets
                    </motion.span>
                    <span className="text-zinc-400 tabular-nums font-mono">
                        {Math.round(progress)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
