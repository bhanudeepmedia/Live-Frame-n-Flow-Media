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
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }} // Custom easeOutQuint
        >
            {/* Dynamic Gradient Background - Subtle & Elegant */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 opacity-60" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Logo with sophisticated reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-32 md:w-40 mb-10"
                >
                    {/* Soft ambient glow behind logo */}
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150" />

                    <img
                        src="/logo.png"
                        alt="Frame n Flow Media"
                        className="relative w-full h-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* Minimalist Progress Line */}
                <div className="w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        style={{ width: `${progress}%` }}
                        layoutId="progress-bar"
                    />
                </div>

                {/* Tracking Text */}
                <div className="mt-4 flex justify-between w-64 text-[10px] uppercase font-medium tracking-[0.2em] text-zinc-500">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading Experience
                    </motion.span>
                    <span className="text-zinc-400 tabular-nums">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
