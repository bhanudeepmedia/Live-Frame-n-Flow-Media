import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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
    Unlock,
    Search,
    FileText,
    Zap,
    Sparkles
} from 'lucide-react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

// ------------------- ANIMATED COMPONENTS -------------------

const UnlockableStep: React.FC<{
    icon: React.ElementType,
    title: string,
    desc: string,
    index: number
}> = ({ icon: Icon, title, desc, index }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.8 && !isUnlocked) setIsUnlocked(true);
        });
        return () => unsubscribe();
    }, [scrollYProgress, isUnlocked]);

    return (
        <motion.div
            ref={ref}
            className={`relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden group
        ${isUnlocked
                    ? 'bg-surface border-accent/50 shadow-[0_0_30px_-5px_var(--accent-color)]'
                    : 'bg-white/5 border-white/10 grayscale-[0.8]'
                }`}
            whileHover={{ scale: isUnlocked ? 1.05 : 1, rotate: isUnlocked ? 1 : 0 }}
        >
            {/* Locked Overlay */}
            <AnimatePresence>
                {!isUnlocked && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                        className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
                    >
                        <Lock size={48} className="text-white/30 mb-2" />
                        <span className="text-xs font-bold tracking-widest uppercase text-white/30">LOCKED</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500
          ${isUnlocked ? 'bg-accent text-black rotate-12' : 'bg-white/10 text-white/30'}
        `}>
                    {isUnlocked ? <Icon size={32} /> : <Lock size={24} />}
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-white/30'}`}>{title}</h3>
                <p className={`text-sm ${isUnlocked ? 'text-white/60' : 'text-white/20'}`}>{desc}</p>
            </div>

            {/* Particle Effects on Unlock */}
            {isUnlocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none"
                />
            )}
        </motion.div>
    );
};

const Landing: React.FC = () => {
    const navigate = useNavigate();

    // Calculator State & Physics
    const [referrals, setReferrals] = useState(1);
    const [dealValue, setDealValue] = useState(5000);
    const commissionRate = 0.30;

    // Animated Numbers
    const earnings = Math.round(referrals * dealValue * commissionRate);
    const animatedEarnings = useSpring(0, { stiffness: 100, damping: 20 });

    useEffect(() => {
        animatedEarnings.set(earnings);
    }, [earnings]);

    const displayEarnings = useTransform(animatedEarnings, (current) => Math.round(current).toLocaleString());

    return (
        <div className="min-h-screen bg-background text-white pt-24 font-sans selection:bg-accent selection:text-black overflow-x-hidden">

            {/* ---------------- HERO SECTION (Interactive 3D Float) ---------------- */}
            <div className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 md:mb-8 cursor-default"
                        >
                            <Briefcase className="text-accent" size={14} />
                            <span className="text-accent text-xs md:text-sm font-bold tracking-widest uppercase">Performance-Based Opportunity</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                            Become a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Growth Partner.</span>
                        </h1>

                        <h2 className="text-xl sm:text-2xl lg:text-5xl text-white/50 font-display font-bold mb-8 flex flex-wrap gap-x-3 gap-y-1 items-center leading-tight">
                            <span className="text-white">Outreach.</span>
                            <span className="hidden sm:inline text-white/20">•</span>
                            <span className="text-white">Appointments.</span>
                            <span className="hidden sm:inline text-white/20">•</span>
                            <span className="text-accent">Commission.</span>
                        </h2>

                        <p className="text-base md:text-lg text-white/70 font-light mb-8 md:mb-10 max-w-lg leading-relaxed border-l-2 border-accent/50 pl-6">
                            "Growth Partners cold-outreach potential clients, set appointments, join sales calls, and earn commission on every successful client conversion handled by Frame n Flow Media."
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 flex-wrap">
                            <Button onClick={() => navigate('/growth-partner/apply')} className="w-full sm:w-auto min-w-[180px] px-8 py-4 text-lg font-bold bg-gradient-to-r from-accent to-accent/80 text-black hover:scale-105 shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] justify-center">
                                Apply Now 🚀
                            </Button>
                            <button onClick={() => navigate('/growth-partner/login')} className="w-full sm:w-auto min-w-[150px] px-8 py-4 text-lg font-bold bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10">
                                Log In
                            </button>
                            <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="w-full sm:w-auto min-w-[180px] px-8 py-4 text-lg border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-colors font-bold uppercase tracking-wider text-sm justify-center flex items-center">
                                View Mission Brief
                            </button>
                        </div>
                    </motion.div>

                    {/* ---------------- GAMIFIED CALCULATOR ---------------- */}
                    <motion.div
                        initial={{ opacity: 0, rotateY: 30, x: 50 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className="perspective-1000 mt-10 lg:mt-0"
                    >
                        <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 lg:p-10 relative shadow-2xl transform hover:rotate-y-2 transition-transform duration-500 group">
                            {/* Glowing Background Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6 lg:mb-8">
                                    <h3 className="text-xl lg:text-2xl font-display font-bold flex items-center gap-2 lg:gap-3">
                                        <Sparkles className="text-yellow-400" />
                                        Earnings Potential
                                    </h3>
                                    <div className="bg-white/10 px-3 py-1 rounded text-xs font-mono text-white/50">Estimator</div>
                                </div>

                                {/* Interactive Sliders */}
                                <div className="space-y-8 lg:space-y-10 mb-8 lg:mb-12">

                                    {/* Referrals */}
                                    <div className="group/slider">
                                        <div className="flex justify-between mb-4">
                                            <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-accent">Successful Conversion</label>
                                            <span className="text-xl lg:text-2xl font-black text-white bg-white/10 px-4 py-1 rounded-lg">{referrals}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            step="1"
                                            value={referrals}
                                            onChange={(e) => setReferrals(parseInt(e.target.value))}
                                            className="w-full h-4 bg-gray-800 rounded-full appearance-none cursor-pointer accent-accent hover:accent-white transition-all"
                                        />
                                    </div>

                                    {/* Deal Value */}
                                    <div className="group/slider">
                                        <div className="flex justify-between mb-4">
                                            <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-purple-400">Avg. Deal Size ($)</label>
                                            <span className="text-lg lg:text-xl font-bold text-white">${dealValue.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1000"
                                            max="20000"
                                            step="500"
                                            value={dealValue}
                                            onChange={(e) => setDealValue(parseInt(e.target.value))}
                                            className="w-full h-4 bg-gray-800 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Animated Result Box */}
                                <motion.div
                                    className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 lg:p-8 text-center border border-white/10 relative overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                    <p className="text-white/40 text-[10px] lg:text-sm font-bold uppercase mb-2 relative z-10">Estimated Monthly Commission</p>

                                    <div className="flex items-center justify-center gap-2 relative z-10">
                                        <span className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                                            $<motion.span>{displayEarnings}</motion.span>
                                        </span>
                                    </div>

                                    {/* Progress Bar Visual */}
                                    <div className="w-full bg-gray-800 h-2 mt-4 lg:mt-6 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-accent to-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((earnings / 30000) * 100, 100)}%` }}
                                        />
                                    </div>
                                </motion.div>

                                <p className="text-[10px] text-white/20 mt-4 text-center">
                                    *Commission variable between 20-30% based on deal structure.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ---------------- UNLOCK THE ZONES (PROCESS) ---------------- */}
            <div className="py-16 md:py-24 bg-[#050505] relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6">Unlock The Workflow</h2>
                        <p className="text-white/50">Your active role in the deal flow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                        <UnlockableStep
                            index={0}
                            icon={Globe}
                            title="1. Cold Outreach"
                            desc="DM, Email, or Call via your channels."
                        />
                        <UnlockableStep
                            index={1}
                            icon={Search}
                            title="2. Qualify"
                            desc="Ensure they have a real need."
                        />
                        <UnlockableStep
                            index={2}
                            icon={FileText}
                            title="3. Book Call"
                            desc="Set appointment with our team."
                        />
                        <UnlockableStep
                            index={3}
                            icon={Users}
                            title="4. Join Call"
                            desc="Bridge the relationship live."
                        />
                        <UnlockableStep
                            index={4}
                            icon={TrendingUp}
                            title="5. Earn"
                            desc="Get paid on successful conversion."
                        />
                    </div>
                </div>
            </div>

            {/* ---------------- WHAT YOU DON'T DO (Rules of Engagement) ---------------- */}
            {/* ---------------- DETAILED MISSION BRIEFING (Core Responsibilities) ---------------- */}
            <div className="py-16 md:py-24 container mx-auto px-6">
                <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 md:mb-4">Mission Briefing</h2>
                            <p className="text-white/50 text-sm md:text-base">Detailed breakdown of your responsibilities.</p>
                        </div>
                        <div className="bg-accent/10 px-4 py-2 rounded-full border border-accent/20 mt-4 md:mt-0">
                            <span className="text-accent text-xs md:text-sm font-bold uppercase tracking-widest">Active Role</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Outreach & Setup */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">1</span>
                                    Cold Outreach
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">
                                    Proactively reach out via Instagram, LinkedIn, WhatsApp, or Email. Your goal is to start professional conversations, not spam.
                                </p>
                                <ul className="grid grid-cols-2 gap-2 text-xs text-white/40">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full" /> Personalized DMs</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full" /> Value-driven approach</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">2</span>
                                    Qualification & Setup
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">
                                    Ensure the prospect is a decision-maker with a real business need. Then, coordinate and book a discovery call.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Calls & Closing */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">3</span>
                                    Join the Call
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">
                                    <strong className="text-white">Mandatory:</strong> Join the scheduled call with our team. Introduce the prospect, provide context, and support the relationship. We handle the pitch.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">4</span>
                                    Follow-up & Earn
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">
                                    Ensure the prospect shows up. Assist in nudging them toward closure. Once signed and onboarded, you earn 20-30%.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What You NOT Do - Integrated */}
                    <div className="mt-16 pt-10 border-t border-white/10">
                        <h3 className="text-lg font-bold text-white/80 mb-6 uppercase tracking-widest text-center">Out of Scope (What you don't do)</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Service Delivery", "Strategy Creation", "Billing/Invoicing", "Leading the Pitch"].map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-black/40 border border-white/5 rounded-lg text-white/40 text-sm line-through decoration-red-500/50">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- LOGISTICS & REWARDS (DETAILS) ---------------- */}
            <div className="py-20 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Time & Structure */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="mb-4 bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center text-accent">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Work Structure</h3>
                        <ul className="space-y-3 text-white/60 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" /> Fully Remote Location</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" /> No Fixed Hours (Self-managed)</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" /> Performance-based Income</li>
                        </ul>
                    </div>

                    {/* Performance Tracking */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="mb-4 bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-purple-400">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Performance Tracking</h3>
                        <p className="text-white/60 text-sm mb-4">
                            All activities are tracked in the <strong className="text-white">Growth Partner Dashboard</strong>.
                        </p>
                        <ul className="space-y-3 text-white/60 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> Log Outreach & Calls</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> Track Appointments</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" /> Monitor Conversions</li>
                        </ul>
                    </div>

                    {/* Career Growth */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="mb-4 bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-green-400">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Long-Term Career</h3>
                        <p className="text-white/60 text-sm mb-4">
                            Exceptional partners unlock <strong className="text-white">Full-Time Roles</strong>.
                        </p>
                        <ul className="space-y-3 text-white/60 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" /> Higher Commission Tiers</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" /> Priority Access to Leads</li>
                            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" /> Agency Career Path</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-20 md:py-32 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface border border-white/10 rounded-3xl p-6 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Choose Your Character</h2>
                            <p className="text-xl text-white/60 mb-10">
                                If you fit one of these archetypes, you're ready to play.
                            </p>

                            <div className="space-y-3 md:space-y-4">
                                {[
                                    { label: "The Connector", desc: "Freelancers with client access" },
                                    { label: "The Student", desc: "Looking for real business exposure" },
                                    { label: "The Professional", desc: "Building a side income stream" },
                                    { label: "The Founder", desc: "Monetizing B2B network" }
                                ].map((char, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-default gap-2 sm:gap-4"
                                    >
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0" />
                                            <span className="font-bold text-base md:text-lg text-white">{char.label}</span>
                                        </div>
                                        <span className="text-white/40 text-xs md:text-sm font-mono pl-5 sm:pl-0">{char.desc}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Boss Level Content */}
                        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-accent/30 p-8 text-center relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-black font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest">
                                Boss Level Opportunity
                            </div>

                            <Briefcase size={48} className="text-accent mx-auto mb-6 mt-4" />
                            <h3 className="text-2xl font-bold mb-4">Unlock Full-Time Mode</h3>
                            <p className="text-white/60 mb-6">
                                Top-tier players unlock the ability to be hired full-time by Frame n Flow Media.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/40">
                                <div className="bg-white/5 p-2 rounded">High Consistency</div>
                                <div className="bg-white/5 p-2 rounded">Elite Deals</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ---------------- FINAL BOSS CTA ---------------- */}
            <div className="pb-32 text-center container mx-auto px-6">
                <h2 className="text-5xl md:text-9xl font-display font-black text-white/10 mb-8 select-none">
                    READY?
                </h2>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button onClick={() => navigate('/growth-partner/apply')} className="px-12 py-6 text-2xl rounded-full bg-accent text-black font-black tracking-widest shadow-[0_0_50px_rgba(var(--accent-rgb),0.5)]">
                        PRESS START
                    </Button>
                </motion.div>
            </div>

        </div>
    );
};

// Helper for icon
const Key: React.FC<{ size?: number, className?: string }> = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

export default Landing;
