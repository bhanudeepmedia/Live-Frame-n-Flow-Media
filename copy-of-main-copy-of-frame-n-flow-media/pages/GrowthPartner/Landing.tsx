import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Users,
    TrendingUp,
    DollarSign,
    Globe,
    Zap,
    Target,
    Briefcase,
    ChevronRight,
    CheckCircle2,
    Rocket
} from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Users,
    TrendingUp,
    DollarSign,
    Zap,
    Briefcase,
    ChevronRight,
    CheckCircle2,
    Rocket,
    Crown,
    Trophy,
    Target,
    Globe
} from 'lucide-react';

const NumberTicker = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);

    return <span>{count.toLocaleString()}</span>;
};

const Calculator = () => {
    const [referrals, setReferrals] = useState(1);
    const [dealValue, setDealValue] = useState(5000);
    const commissionRate = 0.10; // 10%
    const earnings = referrals * dealValue * commissionRate;

    return (
        <div className="bg-gradient-to-br from-surface to-surfaceHighlight border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] group-hover:bg-accent/20 transition-all" />

            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <DollarSign className="text-accent" /> Earnings Simulator
            </h3>

            <div className="space-y-8 relative z-10">
                <div>
                    <div className="flex justify-between mb-2 text-sm text-muted">
                        <span>Monthly Referrals</span>
                        <span className="text-white font-bold">{referrals} Clients</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={referrals}
                        onChange={(e) => setReferrals(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accent/80 transition-all"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2 text-sm text-muted">
                        <span>Avg. Deal Value</span>
                        <span className="text-white font-bold">${dealValue.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={dealValue}
                        onChange={(e) => setDealValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                    />
                </div>

                <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-muted text-sm mb-1">Your Estimated Monthly Income</p>
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
                        ${earnings.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted mt-2">*Based on standard 10% commission structure</p>
                </div>
            </div>
        </div>
    );
};

const JourneyStep = ({ icon: Icon, title, desc, delay, active }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className={`relative p-6 rounded-xl border ${active ? 'border-accent bg-accent/5' : 'border-white/5 bg-surface'} flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300`}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${active ? 'bg-accent text-background' : 'bg-white/5 text-muted group-hover:text-white'}`}>
            <Icon size={24} />
        </div>
        <h4 className={`text-lg font-bold mb-2 ${active ? 'text-accent' : 'text-white'}`}>{title}</h4>
        <p className="text-sm text-muted leading-relaxed">{desc}</p>

        {active && (
            <div className="absolute -top-3 -right-3">
                <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                </span>
            </div>
        )}
    </motion.div>
);

const Landing: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="min-h-screen bg-background font-sans overflow-x-hidden">
            {/* Initial Hero Padding handled by pt-24 in content */}

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/10 blur-[120px] rounded-full opacity-50 mix-blend-screen" />
                    <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full animate-pulse" />
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold tracking-widest uppercase mb-6"
                        >
                            <Rocket size={14} /> Open for Applications
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6"
                        >
                            Monetize Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Network.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            Join the Frame n Flow Growth Partner ecosystem. Connect potential clients, track deals, and earn high-ticket commissions on autopilot.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link to="/growth-partner/apply" className="px-8 py-4 bg-accent text-background font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                Apply Now <ChevronRight size={18} />
                            </Link>
                            <Link to="/growth-partner/login" className="px-8 py-4 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 border border-white/5 transition-all flex items-center justify-center">
                                Partner Login
                            </Link>
                        </motion.div>
                    </div>

                    {/* Interactive Hero Visual */}
                    <motion.div
                        style={{ y }}
                        className="relative hidden lg:block"
                    >
                        <Calculator />

                        {/* Floating 'Success' Cards */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-8 -top-8 bg-[#1a1a1a]/90 backdrop-blur border border-green-500/30 p-4 rounded-xl shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                    <DollarSign size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-muted">Just Payout</div>
                                    <div className="font-bold text-white">+$2,450.00</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -left-8 bottom-20 bg-[#1a1a1a]/90 backdrop-blur border border-accent/30 p-4 rounded-xl shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-muted">New Partner</div>
                                    <div className="font-bold text-white">Alex Joined</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Mobile Calculator visible only on small screens */}
                <div className="mt-12 lg:hidden">
                    <Calculator />
                </div>
            </section>

            {/* LIVE STATS TICKER */}
            <div className="border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-display font-bold text-white mb-1"><NumberTicker value={120} />+</div>
                        <div className="text-xs uppercase tracking-widest text-muted">Active Partners</div>
                    </div>
                    <div>
                        <div className="text-3xl font-display font-bold text-accent mb-1">$<NumberTicker value={450} />k+</div>
                        <div className="text-xs uppercase tracking-widest text-muted">Paid Out</div>
                    </div>
                    <div>
                        <div className="text-3xl font-display font-bold text-white mb-1"><NumberTicker value={15} /></div>
                        <div className="text-xs uppercase tracking-widest text-muted">Countries</div>
                    </div>
                    <div>
                        <div className="text-3xl font-display font-bold text-purple-400 mb-1">24/7</div>
                        <div className="text-xs uppercase tracking-widest text-muted">Support</div>
                    </div>
                </div>
            </div>

            {/* GAMIFIED JOURNEY MAP */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Level Up Your Game</h2>
                        <p className="text-muted text-lg">Unlock higher rewards as you scale.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-accent/10 via-accent/50 to-purple-500/50 -z-10" />

                        <JourneyStep
                            title="Starter"
                            icon={Target}
                            desc="Complete profile & access dashboard. 5% commission on first deal."
                            active={true}
                            delay={0}
                        />
                        <JourneyStep
                            title="Builder"
                            icon={Briefcase}
                            desc="Close 3 deals. Commission bumps to 10%. Access to marketing assets."
                            delay={0.2}
                        />
                        <JourneyStep
                            title="Closer"
                            icon={TrendingUp}
                            desc="Generate $50k revenue. 15% commission + Priority Support."
                            delay={0.4}
                        />
                        <JourneyStep
                            title="Elite Partner"
                            icon={Crown}
                            desc="$100k+ revenue. 20% commission, private slack channel, & annual retreat."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* INFO & ELIGIBILITY */}
            <section className="py-20 bg-surfaceHighlight/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-3xl font-display font-bold mb-6">Who is this for?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["Agency Owners", "Freelance Marketers", "Business Consultants", "Tech Influencers", "Startup Founders", "Sales Professionals"].map((role, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-white/5 hover:border-accent/30 transition-colors cursor-default"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="font-medium text-white/80">{role}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-display font-bold mb-6">Why Partner with Us?</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Global Infrastructure</h4>
                                    <p className="text-muted text-sm">We handle fulfillment, billing, and delivery. You just make the intro.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Instant Payouts</h4>
                                    <p className="text-muted text-sm">Track earnings in real-time. Payouts processed weekly via Stripe or Wise.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready to Scale?</h2>
                    <p className="text-xl text-muted mb-10">
                        Join 120+ partners earning passive income with Frame n Flow.
                    </p>
                    <Link
                        to="/growth-partner/apply"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                    >
                        Start Your Journey <Rocket size={24} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
