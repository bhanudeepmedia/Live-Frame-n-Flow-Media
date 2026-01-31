import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 2500; // 2.5 seconds total
        const interval = 25; // Update every 25ms
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, duration + 500); // Wait a bit after 100% before unmounting

        return () => {
            clearInterval(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center font-sans"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="w-full max-w-md px-8 text-center">
                {/* Percentage */}
                <div className="mb-8">
                    <motion.span
                        className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {Math.round(progress)}%
                    </motion.span>
                </div>

                {/* Motivational Text */}
                <motion.div
                    className="h-8 overflow-hidden mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-accent text-lg md:text-xl font-medium tracking-wide uppercase">
                        Loading for your business success...
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
