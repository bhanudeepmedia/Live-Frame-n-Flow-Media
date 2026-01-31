import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [textIndex, setTextIndex] = useState(0);

    const loadingTexts = [
        "Refining Your Strategy...",
        "Engineering Growth...",
        "Unlocking Potential...",
        "Preparing Your Launchpad..."
    ];

    useEffect(() => {
        // Text rotation logic
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 800);

        // Completion logic matching the animation duration
        const timeout = setTimeout(() => {
            onComplete();
        }, 3500);

        return () => {
            clearInterval(textInterval);
            clearTimeout(timeout);
        };
    }, [onComplete, loadingTexts.length]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Custom easing for premium feel
            }}
        >
            {/* Background Ambient Glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4">

                {/* Animated Frame Borders */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Top Left */}
                    <motion.div
                        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/30"
                        initial={{ opacity: 0, x: -20, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                    {/* Bottom Right */}
                    <motion.div
                        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/30"
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Main Content */}
                <div className="py-12 md:py-16 text-center">
                    {/* Smooth Counter using purely visual update */}
                    <Counter
                        from={0}
                        to={100}
                        duration={3}
                        className="text-8xl md:text-9xl font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20"
                    />

                    {/* Dynamic Inspiring Text */}
                    <div className="h-8 mt-6 relative overflow-hidden w-full flex justify-center items-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={textIndex}
                                className="text-accent/80 text-sm md:text-base font-medium tracking-[0.2em] uppercase absolute"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {loadingTexts[textIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Minimal Progress Line */}
                <motion.div
                    className="w-48 h-[2px] bg-white/10 mt-8 relative overflow-hidden rounded-full"
                >
                    <motion.div
                        className="absolute inset-0 bg-accent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                </motion.div>

            </div>
        </motion.div>
    );
};

// Separated Counter component for performance and smoothness using purely Framer Motion
const Counter: React.FC<{ from: number; to: number; duration: number; className?: string }> = ({ from, to, duration, className }) => {
    const [count, setCount] = useState(from);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(from + (to - from) * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(to);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [from, to, duration]);

    return <span className={className}>{count}</span>;
};

export default LoadingScreen;
