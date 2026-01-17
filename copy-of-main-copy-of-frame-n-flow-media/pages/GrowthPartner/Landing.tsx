import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calculator,
    Users,
    Briefcase,
    Target,
    Globe,
    TrendingUp,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Lock,
    Search,
    FileText
} from 'lucide-react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

// FadeIn Component for consistent animations
const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const Landing: React.FC = () => {
    const navigate = useNavigate();

    // Calculator State
    const [referrals, setReferrals] = useState(1);
    const [dealValue, setDealValue] = useState(5000);

    // Logic: Max 30% commission
    const commissionRate = 0.30;
    const estimatedEarnings = Math.round(referrals * dealValue * commissionRate);

    return (
        <div className="min-h-screen bg-background text-white pt-24 font-sans selection:bg-accent selection:text-black">

            {/* ---------------- HERO SECTION ---------------- */}
            <div className="container mx-auto px-6 mb-20 md:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Hero Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Open for Applications</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Monetize Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Network.</span>
                        </h1>

                        <p className="text-xl text-white/60 font-light mb-8 max-w-lg leading-relaxed">
                            Join the Frame n Flow Growth Partner Program (GPP) — an open ecosystem where you connect potential clients, track deals transparently, and earn high-ticket commissions up to 30%.
                        </p>

                        <p className="text-white/80 font-medium mb-10 border-l-2 border-accent pl-4">
                            No fixed hours. No targets. No limits.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button onClick={() => navigate('/growth-partner/apply')} className="px-8 py-4 text-lg">
                                <span className="mr-2">👉</span> Apply Now
                            </Button>
                            <Button variant="outline" onClick={() => navigate('/growth-partner/login')} className="px-8 py-4 text-lg">
                                <span className="mr-2">👉</span> Partner Login
                            </Button>
                        </div>
                    </motion.div>

                    {/* ---------------- EARNINGS SIMULATOR ---------------- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Calculator size={120} />
                        </div>

                        <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                            <Calculator className="text-accent" size={24} />
                            Earnings Simulator
                        </h3>

                        {/* Inputs */}
                        <div className="space-y-8 mb-10">

                            {/* Monthly Referrals Slider */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-sm uppercase tracking-widest text-white/50 font-bold">Monthly Referrals</label>
                                    <span className="text-xl font-bold text-white">{referrals} Clients</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={referrals}
                                    onChange={(e) => setReferrals(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>

                            {/* Deal Value Input */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm uppercase tracking-widest text-white/50 font-bold">Avg. Deal Value ($)</label>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">$</span>
                                    <input
                                        type="number"
                                        value={dealValue}
                                        onChange={(e) => setDealValue(parseInt(e.target.value) || 0)}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-8 pr-4 text-white focus:border-accent focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Commission Rate Note */}
                            <div className="flex items-center gap-2 text-sm text-accent bg-accent/10 p-3 rounded-lg border border-accent/20">
                                <CheckCircle2 size={16} />
                                <span>Up to 30% commission (based on deal terms)</span>
                            </div>
                        </div>

                        {/* Output Display */}
                        <div className="bg-black/40 rounded-xl p-6 text-center border border-white/5 mb-6">
                            <p className="text-white/50 text-sm mb-2">Your Estimated Monthly Income</p>
                            <div className="text-5xl font-display font-bold text-white mb-2">
                                ${estimatedEarnings.toLocaleString()}
                            </div>
                            <p className="text-xs text-white/30">
                                (Calculation: ${dealValue.toLocaleString()} × {referrals} deals × 30%)
                            </p>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-white/30 leading-relaxed text-center">
                            *Estimation is based on a maximum commission of 30%. Actual commission may vary between 20%–30% depending on deal structure and internal approval. Real earnings depend on deal value and conversion.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ---------------- HOW GPP WORKS (PROCESS) ---------------- */}
            <div className="py-24 bg-surface border-y border-white/5">
                <div className="container mx-auto px-6">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How the GPP Works</h2>
                        <p className="text-white/50 max-w-2xl mx-auto">A simple, transparent process designed for speed.</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { icon: FileText, title: "Apply to GPP", desc: "Submit your application." },
                            { icon: Search, title: "Get Shortlisted", desc: "Approved by Frame n Flow." },
                            { icon: Lock, title: "Receive Access", desc: "Get secure dashboard login." },
                            { icon: Users, title: "Start Outreach", desc: "Connect us with clients." },
                            { icon: TrendingUp, title: "Get Paid", desc: "Earn on closed deals." }
                        ].map((step, i) => (
                            <FadeIn key={i} delay={i * 0.1} className="bg-white/5 p-6 rounded-xl border border-white/10 relative group hover:bg-white/10 transition-colors">
                                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent text-black font-bold flex items-center justify-center text-sm shadow-lg shadow-accent/20">
                                    {i + 1}
                                </div>
                                <step.icon className="text-accent mb-4" size={32} />
                                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                <p className="text-sm text-white/50">{step.desc}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------------- WHO CAN JOIN ---------------- */}
            <div className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Who must join this program?</h2>
                        <div className="space-y-6">
                            {[
                                "Students looking to earn through real business exposure",
                                "Working professionals building side income",
                                "Freelancers & consultants with client networks",
                                "Sales-oriented individuals"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <CheckCircle2 className="text-accent shrink-0 mt-1" />
                                    <span className="text-lg text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-white/50 italic border-l-2 border-accent/50 pl-4">
                            This program is open to everyone with strong communication skills and a genuine network.
                        </p>
                    </FadeIn>

                    {/* ---------------- FUTURE OPPORTUNITY ---------------- */}
                    <FadeIn delay={0.2} className="bg-gradient-to-br from-accent/20 to-transparent p-1 rounded-2xl">
                        <div className="bg-background rounded-xl p-8 lg:p-12 h-full border border-accent/20">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                                <Briefcase className="text-accent" size={32} />
                            </div>
                            <h3 className="text-3xl font-display font-bold mb-4">More Than Commission</h3>
                            <p className="text-white/70 mb-8 leading-relaxed">
                                High-performing Growth Partners may be considered for full-time roles at Frame n Flow Media in the future.
                            </p>

                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">We actively observe:</h4>
                            <ul className="space-y-3 mb-8">
                                {['Consistency', 'Communication quality', 'Deal integrity', 'Long-term mindset'].map(trait => (
                                    <li key={trait} className="flex items-center gap-2 text-white/80">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                                        {trait}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xs text-white/30">
                                *This is not guaranteed employment — but top performers don’t go unnoticed.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* ---------------- WHY PARTNER & PAYOUTS ---------------- */}
            <div className="py-24 bg-surface border-t border-white/5">
                <div className="container mx-auto px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                        <FadeIn className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "End-to-End Execution", desc: "We handle strategy, fulfillment, delivery, and billing." },
                                { title: "Transparent Tracking", desc: "Every referral, deal, and commission is tracked inside your dashboard." },
                                { title: "Performance-Based", desc: "No levels. No caps. Your income scales with performance." },
                                { title: "Flexible Work Model", desc: "Work from anywhere. Outreach on your terms." }
                            ].map((card, i) => (
                                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-accent/30 transition-colors">
                                    <h4 className="font-bold text-white mb-2">{card.title}</h4>
                                    <p className="text-sm text-white/50">{card.desc}</p>
                                </div>
                            ))}
                        </FadeIn>

                        {/* Payout Info */}
                        <FadeIn delay={0.2} className="bg-black/40 border border-white/10 rounded-xl p-8">
                            <h3 className="text-2xl font-display font-bold mb-6">Payouts & Tracking</h3>
                            <ul className="space-y-4 mb-8">
                                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/60">Commission</span>
                                    <span className="font-bold text-accent">20% – 30%</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/60">Tracking</span>
                                    <span className="font-bold text-white">Real-time</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/60">Payout</span>
                                    <span className="font-bold text-white">After Completion</span>
                                </li>
                            </ul>
                            <p className="text-xs text-white/30 text-center">
                                Commission percentage and payout timelines are subject to internal terms and deal structure.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Button onClick={() => navigate('/growth-partner/apply')} className="px-10 py-5 text-xl">
                            Start Your GPP Application
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
