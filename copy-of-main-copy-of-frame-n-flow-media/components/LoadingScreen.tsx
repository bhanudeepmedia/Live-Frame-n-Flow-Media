import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [stage, setStage] = useState<'counting' | 'launching' | 'complete'>('counting');
    const [statusText, setStatusText] = useState("Initializing System...");

    useEffect(() => {
        // Text Cycling Logic to match user request context
        const texts = [
            "Calibrating AI Agents...",
            "Building Web Infrastructure...",
            "Optimizing Marketing Funnels...",
            "Syncing Growth Automations..."
        ];

        let textIndex = 0;
        const textInterval = setInterval(() => {
            textIndex = (textIndex + 1) % texts.length;
            setStatusText(texts[textIndex]);
        }, 800);

        // Sequence Logic
        const launchTimer = setTimeout(() => {
            setStage('launching');
            clearInterval(textInterval);
            setStatusText("LAUNCHING SYSTEMS");
        }, 3200);

        const completeTimer = setTimeout(() => {
            setStage('complete');
            onComplete();
        }, 4500);

        return () => {
            clearInterval(textInterval);
            clearTimeout(launchTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center font-sans overflow-hidden perspective-1000"
            exit={{
                y: "-100%",
                transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Optimized Background Grid - Perfornamce: Static class instead of inline styles calculation if possible */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Main Stage */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                {/* 3D ROCKET CONTAINER */}
                <motion.div
                    className="relative w-48 h-96 [transform-style:preserve-3d]"
                    initial={{ y: 0, rotateY: 0 }}
                    animate={
                        stage === 'counting' ? {
                            y: [0, -10, 0],
                            rotateY: [0, 15, -15, 0], // Gentle 3D idling
                            rotateX: [0, 5, 0]
                        } :
                            stage === 'launching' ? {
                                y: -1500,
                                scale: 0.8,
                                rotateX: 10
                            } : {}
                    }
                    transition={
                        stage === 'counting' ? {
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                            rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        } :
                            stage === 'launching' ? { duration: 1.2, ease: "backIn" } : {}
                    }
                >
                    {/* --- LAYER 1: BACK (Fins & Engine Depth) --- */}
                    <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(-30px)] grayscale brightness-75">
                        <RocketSilhouette color="#1e293b" />
                    </div>

                    {/* --- LAYER 2: MID (Main Housing & Engine Glow) --- */}
                    <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(0px)] drop-shadow-2xl">
                        {/* Dynamic Engine Plume (Only optimized gradient, no heavy blur) */}
                        <AnimatePresence>
                            {(stage === 'launching' || stage === 'counting') && (
                                <motion.div
                                    className="absolute top-[80%] w-12 h-32 bg-gradient-to-b from-cyan-400 via-blue-600 to-transparent rounded-b-full opacity-80"
                                    initial={{ scaleY: 0.5, opacity: 0 }}
                                    animate={
                                        stage === 'counting' ? { scaleY: [0.5, 0.7, 0.5], opacity: 0.6 } : // Idling
                                            stage === 'launching' ? { scaleY: 3, opacity: 1 } : {}
                                    }
                                    transition={{ duration: 0.1, repeat: stage === 'counting' ? Infinity : 0 }}
                                />
                            )}
                        </AnimatePresence>
                        <RocketBody />
                    </div>

                    {/* --- LAYER 3: FRONT (Cockpit, Shine, Details) --- */}
                    <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(30px)]">
                        <RocketHighlights />
                    </div>
                </motion.div>

                {/* STATUS TEXT */}
                <motion.div
                    className="mt-12 flex flex-col items-center"
                    animate={stage === 'launching' ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Animated Text Switcher */}
                    <div className="h-8 relative w-full flex justify-center overflow-hidden">
                        <AnimatePresence mode='wait'>
                            <motion.span
                                key={statusText}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-accent font-mono text-sm tracking-[0.2em] font-bold uppercase truncate"
                            >
                                {statusText}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Loading Bar */}
                    <div className="w-64 h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_10px_white]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4.5, ease: "linear" }}
                        />
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

// --- SUB-COMPONENTS FOR 3D LAYERING (Clean & Sharp SVGs) ---

const RocketSilhouette = ({ color }: { color: string }) => (
    <svg viewBox="0 0 200 400" className="w-full h-full opacity-50">
        <path d="M40 300 L10 380 L70 360 Z" fill={color} /> {/* Left Fin Back */}
        <path d="M160 300 L190 380 L130 360 Z" fill={color} /> {/* Right Fin Back */}
    </svg>
);

const RocketBody = () => (
    <svg viewBox="0 0 200 400" className="w-full h-full">
        <defs>
            <linearGradient id="mainBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="30%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#94a3b8" /> {/* Highlight Center */}
                <stop offset="70%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
            </linearGradient>
        </defs>

        {/* Main Fuselage */}
        <path d="M100 20 Q150 80 150 350 L50 350 Q50 80 100 20 Z" fill="url(#mainBodyGrad)" />

        {/* Engine Nozzle Area */}
        <path d="M70 350 L75 370 L125 370 L130 350 Z" fill="#1e293b" />
    </svg>
);

const RocketHighlights = () => (
    <svg viewBox="0 0 200 400" className="w-full h-full">
        <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
            </linearGradient>
        </defs>

        {/* Cockpit Window (Floating above) */}
        <path d="M90 90 L110 90 L110 130 L90 130 Z" fill="url(#glassGrad)" stroke="white" strokeWidth="1" strokeOpacity="0.5" />

        {/* Specular Highlight on Body */}
        <path d="M95 40 Q98 100 95 300" stroke="white" strokeWidth="2" strokeOpacity="0.1" fill="none" />

        {/* Tech Markings 'F/F' */}
        <text x="100" y="200" textAnchor="middle" fill="white" fillOpacity="0.2" fontSize="24" fontFamily="monospace" transform="rotate(-90 100 200)">
            SYSTEMS::GO
        </text>

        {/* Front Fin / Aerodynamic Slat */}
        <rect x="98" y="240" width="4" height="80" fill="#cbd5e1" opacity="0.8" />
    </svg>
);

export default LoadingScreen;
