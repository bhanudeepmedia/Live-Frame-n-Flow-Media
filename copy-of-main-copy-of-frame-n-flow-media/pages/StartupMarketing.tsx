import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Rocket, TrendingUp, Users, Zap, MessageCircle, BarChart, Globe } from 'lucide-react';

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

const StartupMarketing: React.FC = () => {
    const { open } = useWhatsApp();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-black overflow-x-hidden font-sans text-white">
            <SEO
                title="Startup Growth Marketing | Frame n Flow Media"
                description="Go-to-Market Strategies for Startups. MVP Validation, Growth Hacking, and Investor-Ready Traction Metrics."
                canonical="/startup-marketing"
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
            </div>

            {/* HERO */}
            <div className="container mx-auto px-6 mb-20 md:mb-32 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">For Disruptors & Founders</span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight">
                            From Zero to One. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Hypersonic.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-xl text-white/60 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                            We help early-stage startups find <strong className="text-white">Product-Market Fit</strong> and scale traction metrics before your runway burns out.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3} className="flex flex-col md:flex-row gap-4 justify-center w-full">
                        <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'} className="px-10 py-5 text-lg">
                            Launch Campaign
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
                    <FadeIn delay={0.1} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-orange-500/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Rocket size={28} className="text-orange-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">GTM Strategy</h3>
                        <p className="text-white/60 leading-relaxed">
                            We craft the narrative, position your MVP, and execute a high-velocity launch plan to capture early adopters instantly.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-orange-500/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap size={28} className="text-yellow-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Growth Hacking</h3>
                        <p className="text-white/60 leading-relaxed">
                            Unconventional acquisition channels. Viral loops. Referral systems. We do whatever it takes to drive user signups at low CAC.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-orange-500/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BarChart size={28} className="text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Investor Metrics</h3>
                        <p className="text-white/60 leading-relaxed">
                            We focus on the numbers VCs care about: MRR growth, lower Churn, and high LTV/CAC ratios.
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-black border-y border-white/10 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Traction Roadmap</h2>
                    </FadeIn>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {[
                            { phase: "Phase 1: Validation", title: "Waitlist & Beta", desc: "We build hype landing pages and run traffic to validate interest before you write code." },
                            { phase: "Phase 2: Launch", title: "The Drop", desc: "Omni-channel blitz on Product Hunt, Socials, and PR to spike Day 1 users." },
                            { phase: "Phase 3: Scale", title: "Optimization", desc: "We nurture the cohort, refine the funnel, and pour fuel on the winning channels." }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1} className="flex flex-col md:flex-row gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="md:w-1/3">
                                    <div className="text-accent font-mono text-sm mb-2">{item.phase}</div>
                                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="container mx-auto px-6 py-24 text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to exit stealth mode?</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'} className="px-12 py-4 text-lg">Talk to Founder</Button>
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

export default StartupMarketing;
