import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [statusText, setStatusText] = useState("Initializing System...");
    const [isRoaring, setIsRoaring] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const textSequence = [
            { text: "Tracking Market Signals...", time: 0 },
            { text: "Stalking Competitor Data...", time: 1000 },
            { text: "Locked on Target...", time: 2000 },
            { text: "DOMINANCE ACHIEVED.", time: 3000 }
        ];

        // Text Updates
        const timers = textSequence.map(({ text, time }) =>
            setTimeout(() => setStatusText(text), time)
        );

        // Sequence: Roar Trigger
        const roarTimer = setTimeout(() => {
            setIsRoaring(true);
            // Attempt to play sound
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
            }
        }, 3000);

        // Completion
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4500); // Allow time for roar

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(roarTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center font-sans overflow-hidden"
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(10px)",
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            {/* Audio Element */}
            <audio ref={audioRef} src="/roar.mp3" preload="auto" />

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Flash Effect on Roar */}
                <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={isRoaring ? { opacity: [0, 0.2, 0, 0.2, 0] } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg">

                {/* 3D PANTHER IMAGE CONTAINER */}
                <motion.div
                    className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={
                        isRoaring
                            ? { scale: 1.2, x: [0, -10, 10, -10, 10, 0], filter: "brightness(1.5) contrast(1.2)" }
                            : { scale: 1, opacity: 1, y: [0, -10, 0] }
                    }
                    transition={
                        isRoaring
                            ? { duration: 0.5, type: "spring", stiffness: 300 }
                            : { opacity: { duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
                    }
                >
                    {/* The Generated 3D Asset */}
                    <img
                        src="/panther.png"
                        alt="Digital Panther"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    />

                    {/* Scanning Laser Effect (Idle) */}
                    {!isRoaring && (
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#22d3ee] z-20 opacity-50"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    )}

                    {/* Roar Shockwave (Active) */}
                    {isRoaring && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-white opacity-0"
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ duration: 0.4, repeat: 3 }}
                        />
                    )}
                </motion.div>

                {/* STATUS TEXT */}
                <motion.div
                    className="mt-4 flex flex-col items-center space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center space-x-3 bg-black/40 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                        <motion.div
                            className={`w-2 h-2 rounded-full ${isRoaring ? 'bg-red-500' : 'bg-emerald-500'}`}
                            animate={{ opacity: [0.2, 1, 0.2], scale: isRoaring ? [1, 1.5, 1] : 1 }}
                            transition={{ duration: isRoaring ? 0.2 : 0.8, repeat: Infinity }}
                        />
                        <span className="font-mono text-xs md:text-sm text-white/80 tracking-widest uppercase min-w-[220px] text-center font-bold">
                            {statusText}
                        </span>
                    </div>
                </motion.div>

            </div>

            {/* Loading Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.0, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LoadingScreen;
