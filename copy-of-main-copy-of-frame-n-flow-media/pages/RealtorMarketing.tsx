import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Home, Camera, Star, Users, MessageCircle, Key, CheckCircle, Cpu, Globe, Zap } from 'lucide-react';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

import { useWhatsApp } from '../contexts/WhatsAppContext';

const RealtorMarketing: React.FC = () => {
    const { open } = useWhatsApp();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-black overflow-x-hidden font-sans text-white">
            <SEO
                title="Real Estate Marketing | Frame n Flow Media"
                description="Luxury Real Estate Marketing. AI Visuals, Qualified Lead Gen, and Premium Web Design for Top Agents."
                canonical="/realtor-marketing"
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px]" />
            </div>

            {/* HERO */}
            <div className="container mx-auto px-6 mb-20 md:mb-32 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Real Estate Professionals</span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight">
                            Sell The Lifestyle. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Own The Market.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-xl text-white/60 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                            Maximize your reach with AI-Driven Visuals, Qualified Lead Gen, and Premium Web Design. We build the digital infrastructure that top agents rely on.
                            <br /><span className="text-sm opacity-50 mt-2 block font-normal text-white/40">*Physical production services available exclusively for India-based clients.</span>
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3} className="flex flex-col md:flex-row gap-4 justify-center w-full">
                        <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'} className="px-10 py-5 text-lg">
                            Book Strategy Call
                        </Button>
                        <button onClick={open} className="px-8 py-5 border border-white/20 hover:bg-white/10 rounded-full font-bold transition-all text-white flex items-center gap-2 justify-center group">
                            <MessageCircle size={20} className="group-hover:text-[#25D366] transition-colors" />
                            WhatsApp Us
                        </button>
                    </FadeIn>
                </div>
            </div>

            {/* CORE FEATURES */}
            <div className="container mx-auto px-6 mb-24 md:mb-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FadeIn delay={0.1} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-yellow-500/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap size={28} className="text-yellow-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Qualified Lead Gen</h3>
                        <p className="text-white/60 leading-relaxed">
                            Performance marketing that delivers ROI. Our systems filter leads by budget and intent, ensuring you only talk to serious buyers and sellers.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-yellow-500/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Cpu size={28} className="text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">AI Visuals & Automation</h3>
                        <p className="text-white/60 leading-relaxed">
                            Leverage AI to create stunning visuals and automate your client nurturing. Stay ahead of the curve with cutting-edge tech.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-yellow-500/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Globe size={28} className="text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Premium Web Design</h3>
                        <p className="text-white/60 leading-relaxed">
                            Custom-coded, high-performance websites that set you apart. No templates. Just a digital presence as premium as your listings.
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-[#050505] border-y border-white/10 py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Agent Blueprint</h2>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <FadeIn className="relative aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                            {/* Static Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-gray-800 flex items-center justify-center">
                                <Home size={64} className="text-white/20" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute bottom-6 left-6">
                                <div className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-2 inline-block">Just Listed</div>
                                <h3 className="text-2xl font-bold text-white">Beverly Hills - $12.5M</h3>
                            </div>
                        </FadeIn>

                        <FadeIn className="space-y-6">
                            <h3 className="text-3xl font-bold text-white mb-4">More than just listings.</h3>
                            <p className="text-white/60 text-lg leading-relaxed mb-6">
                                In real estate, perception is reality. We elevate your digital presence to match the quality of the homes you sell.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "High-Intent Lead Generation",
                                    "AI-Enhanced Property Visuals",
                                    "Premium Custom Website Development",
                                    "Automated Follow-up Systems"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <CheckCircle size={20} className="text-accent" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="container mx-auto px-6 py-24 text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to be #1?</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'} className="px-12 py-4 text-lg">Book Marketing Audit</Button>
                        <button onClick={open} className="px-12 py-4 border border-white/20 hover:bg-white/10 rounded-full font-bold transition-all text-white flex items-center gap-2 justify-center group text-lg">
                            <MessageCircle size={24} className="group-hover:text-[#25D366] transition-colors" />
                            WhatsApp Now
                        </button>
                    </div>
                </FadeIn>
            </div>

        </div>
    );
};

export default RealtorMarketing;
