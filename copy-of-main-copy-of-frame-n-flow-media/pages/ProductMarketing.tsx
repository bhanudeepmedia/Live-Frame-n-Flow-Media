import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Camera, Target, Zap, MessageCircle, Package, ArrowRight, TrendingUp } from 'lucide-react';

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

const ProductMarketing: React.FC = () => {
    const { open } = useWhatsApp();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-black overflow-x-hidden font-sans text-white">
            <SEO
                title="Product & Review Marketing | Frame n Flow Media"
                description="Scale your E-Commerce or Retail Brand with high-fidelity AI Visuals and ROAS-focused acquisition systems."
                canonical="/product-marketing"
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            {/* HERO */}
            <div className="container mx-auto px-6 mb-20 md:mb-32 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">E-Commerce & Retail</span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight">
                            Stop Burning Cash. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Start Scaling.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-xl text-white/60 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                            We engineer product launch systems that combine <strong className="text-white">AI-Generated Visuals</strong> with <strong className="text-white">Purchase-Intent Targeting</strong>. No expensive shoots. Just pure ROAS.
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

            {/* STATS STRIP */}
            <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm relative z-10 mb-24">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Ad Spend Managed", value: "$2M+" },
                            { label: "Avg. ROAS", value: "4.5x" },
                            { label: "Creative Assets", value: "10k+" },
                            { label: "Client Revenue", value: "$50M+" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CORE FEATURES */}
            <div className="container mx-auto px-6 mb-24 md:mb-32 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Growth Stack</h2>
                    <p className="text-white/50">Everything you need to dominate your niche.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FadeIn delay={0.1} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Camera size={80} />
                        </div>
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                            <Camera size={28} className="text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">AI Product Visuals</h3>
                        <p className="text-white/60 leading-relaxed relative z-10">
                            We train AI models on your SKUs to generate 1000+ lifestyle images in ultra-high resolution. No photographers. No studios. 90% cost savings.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={80} />
                        </div>
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                            <Target size={28} className="text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Purchase-Intent Ads</h3>
                        <p className="text-white/60 leading-relaxed relative z-10">
                            We don't target "interests". We target "behaviors". Our systems find people who are credit-card-ready and currently shopping for your category.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap size={80} />
                        </div>
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                            <Zap size={28} className="text-yellow-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Conversion Ops</h3>
                        <p className="text-white/60 leading-relaxed relative z-10">
                            Traffic is useless if it doesn't convert. We optimize your landing page speed, checkout flow, and offer structure to maximize AOV.
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-gradient-to-b from-white/5 to-black border-t border-white/10 py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <FadeIn className="space-y-10">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Execution Strategy</h2>
                                <p className="text-white/60 text-lg">From zero to hero in 90 days. Here is the blueprint.</p>
                            </div>

                            {[
                                { num: "01", title: "Ingest & Train", desc: "We upload your product images to our AI engine to learn lighting, textures, and geometry." },
                                { num: "02", title: "Creative Velocity", desc: "We launch 50+ ad variations in Week 1. Different angles, hooks, and formats to find winners fast." },
                                { num: "03", title: "Scale & Retain", desc: "Once we hit target ROAS, we scale spend aggressively while setting up automated email flows for LTV." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0 group-hover:bg-accent group-hover:text-black transition-colors">
                                        {step.num}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{step.title}</h4>
                                        <p className="text-white/60 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </FadeIn>

                        <FadeIn delay={0.2} className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <TrendingUp size={80} className="text-white/5" />
                            </div>

                            {/* Dashboard UI Simulation */}
                            <div className="absolute inset-4 border border-white/5 rounded-xl p-6 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-sm text-white/40 mb-1">Total Revenue</div>
                                        <div className="text-4xl font-display font-bold text-white">$142,309<span className="text-white/20">.00</span></div>
                                    </div>
                                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">+312%</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-[75%] shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40 font-mono">
                                        <span>Campaign A</span>
                                        <span className="text-white">4.2 ROAS</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[60%]" />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40 font-mono">
                                        <span>Campaign B</span>
                                        <span className="text-white">3.8 ROAS</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="container mx-auto px-6 py-24 text-center relative z-10">
                <FadeIn>
                    <h2 className="text-3xl md:text-6xl font-display font-bold mb-8">Ready to move product?</h2>
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

export default ProductMarketing;
