import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Rocket, Terminal, Bot, X, ChevronRight } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';

import { useLocation } from 'react-router-dom';

const WhatsAppWidget: React.FC = () => {
    const { isOpen, close, toggle } = useWhatsApp();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const showButton = isHomePage || isOpen;

    const PHONE_NUMBER = "917995533838";

    const SUPPORT_OPTIONS = [
        // ... (truncated for tool matching, but keeping content)
        {
            title: "Start a Project",
            desc: "Websites, Apps & Design",
            icon: <Terminal size={18} />,
            message: "Hi Bhanu, I'm interested in starting a new project (Website/App).",
            color: "text-blue-400"
        },
        {
            title: "Growth & Leads",
            desc: "Marketing & Sales Funnels",
            icon: <Rocket size={18} />,
            message: "Hi Bhanu, I need help with Growth and Lead Generation.",
            color: "text-orange-400"
        },
        {
            title: "AI & Automation",
            desc: "Chatbots & Workflows",
            icon: <Bot size={18} />,
            message: "Hi Bhanu, I want to explore AI Automations for my business.",
            color: "text-emerald-400"
        },
        {
            title: "General Inquiry",
            desc: "Just saying hi!",
            icon: <MessageCircle size={18} />,
            message: "Hi Bhanu, I have a general question about Frame n Flow.",
            color: "text-white"
        }
    ];

    const handleOptionClick = (message: string) => {
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        close();
    };

    return (
        <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-start gap-4">

            {/* Options Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-2 w-72 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white">How can we help?</h3>
                            <p className="text-xs text-white/50">Select a topic to chat on WhatsApp</p>
                        </div>

                        {/* List */}
                        <div className="p-2 space-y-1">
                            {SUPPORT_OPTIONS.map((option, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleOptionClick(option.message)}
                                    className="w-full flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors group text-left relative overflow-hidden"
                                    whileHover={{ x: 4 }}
                                >
                                    <div className={`p-2 rounded-lg bg-white/5 mr-3 ${option.color} group-hover:scale-110 transition-transform`}>
                                        {option.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                                            {option.title}
                                        </div>
                                        <div className="text-[10px] text-white/40">
                                            {option.desc}
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <AnimatePresence>
                {showButton && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={toggle}
                        className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden ${isOpen ? 'bg-[#1a1a1a] text-white border border-white/20' : 'bg-accent text-background border border-accent'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Ping Effect (Only when closed) */}
                        {!isOpen && (
                            <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
                        )}

                        <AnimatePresence mode='wait'>
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                >
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="chat"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                >
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};


export default WhatsAppWidget;
