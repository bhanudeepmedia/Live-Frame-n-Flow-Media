import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { SupabaseBackend } from '../../services/supabaseService';
import {
    Loader2,
    CheckCircle,
    ChevronLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Zap,
    Globe,
    ArrowRight,
    ShieldCheck,
    Target
} from 'lucide-react';

// --- SUB-COMPONENTS ---
const VerticalTape = ({ text, side = 'left', speed = 20 }: any) => (
    <div className={`absolute top-0 ${side === 'left' ? 'left-4' : 'right-4'} h-[200%] w-12 overflow-hidden pointer-events-none opacity-20 hidden md:block`}>
        <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
            className="flex flex-col items-center gap-8 py-4"
        >
            {[...Array(20)].map((_, i) => (
                <span key={i} className="text-xs font-mono font-bold text-white uppercase tracking-[0.3em] rotate-90 whitespace-nowrap">
                    {text}
                </span>
            ))}
        </motion.div>
    </div>
);

const ProgressBar = ({ step, total }: any) => (
    <div className="flex items-center gap-2 mb-8">
        {[...Array(total)].map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${i < step ? 'bg-accent' : i === step ? 'bg-white' : 'bg-transparent'}`}
                />
            </div>
        ))}
    </div>
);

// --- MAIN COMPONENT ---
const Apply: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        social: '',
        city: '',
        country: '',
        background: '',
        experience: false,
        reason: '',
        platforms: [] as string[],
        agreed: false
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const platformsList = ['Instagram', 'LinkedIn', 'WhatsApp', 'Email', 'Twitter/X', 'Cold Calling'];
    const backgrounds = ['Student', 'Freelancer', 'Entrepreneur', 'Working Professional', 'Other'];

    // HANDLERS
    const handlePlatformToggle = (p: string) => {
        setFormData(prev => ({
            ...prev,
            platforms: prev.platforms.includes(p)
                ? prev.platforms.filter(i => i !== p)
                : [...prev.platforms, p]
        }));
    };

    const nextStep = () => {
        // Simple Validation
        if (step === 0 && (!formData.fullName || !formData.email || !formData.phone || !formData.linkedin || !formData.social)) return alert('Please fill all identity fields including social links.');
        if (step === 1 && (!formData.background)) return alert('Please select your background.');
        if (step === 2 && (!formData.city || !formData.country || formData.platforms.length === 0)) return alert('Please complete location and platforms.');

        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        if (!formData.agreed) return alert('You must agree to the terms.');
        if (!formData.reason) return alert('Please tell us why you want to join.');

        setStatus('submitting');
        const { agreed, country, fullName, ...otherData } = formData;

        try {
            await SupabaseBackend.submitApplication({
                ...otherData,
                full_name: fullName,
                city: `${formData.city}, ${formData.country}`,
                linkedin_url: formData.linkedin,
                social_url: formData.social
            });
            setStatus('success');
            setTimeout(() => navigate('/growth-partner/login'), 4000);
        } catch (err: any) {
            console.error(err);
            alert("Error: " + (err.message || "Submission failed. Ensure DB Schema is updated."));
            setStatus('error');
        }
    };

    // --- RENDER STEPS ---
    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-display font-bold">Agent Identity</h2>
                        <div className="space-y-4">
                            <div className="group">
                                <label className="text-xs font-bold text-accent uppercase mb-2 block">Full Name</label>
                                <input value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="input-premium w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="text-xs font-bold text-accent uppercase mb-2 block">Email Address</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input-premium w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none transition-colors" placeholder="agent@example.com" />
                                </div>
                                <div className="group">
                                    <label className="text-xs font-bold text-accent uppercase mb-2 block">Phone / WhatsApp</label>
                                    <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input-premium w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none transition-colors" placeholder="+1 234 567 890" />
                                </div>
                            </div>

                            {/* NEW COLUMNS */}
                            <div className="group">
                                <label className="text-xs font-bold text-accent uppercase mb-2 block">LinkedIn Profile URL</label>
                                <input value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="input-premium w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none transition-colors" placeholder="https://linkedin.com/in/..." />
                            </div>
                            <div className="group">
                                <label className="text-xs font-bold text-accent uppercase mb-2 block">Social Profile URL (Insta/FB)</label>
                                <input value={formData.social} onChange={e => setFormData({ ...formData, social: e.target.value })} className="input-premium w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none transition-colors" placeholder="https://instagram.com/..." />
                            </div>
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-display font-bold">Background Check</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-accent uppercase mb-2 block">Current Role</label>
                            <div className="grid grid-cols-2 gap-3">
                                {backgrounds.map(bg => (
                                    <button
                                        key={bg}
                                        onClick={() => setFormData({ ...formData, background: bg })}
                                        className={`p-3 rounded-lg border text-sm font-bold text-left transition-all ${formData.background === bg ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-white/5 border-white/10 text-muted hover:bg-white/10'}`}
                                    >
                                        {bg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <label className="text-xs font-bold text-accent uppercase mb-4 block">Prior Sales Experience?</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.experience ? 'border-accent bg-accent' : 'border-white/20'}`}>
                                        {formData.experience && <CheckCircle size={14} className="text-black" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={formData.experience} onChange={() => setFormData({ ...formData, experience: true })} />
                                    <span className={`text-sm ${formData.experience ? 'text-white' : 'text-muted group-hover:text-white'}`}>Yes, I have sold before.</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${!formData.experience ? 'border-accent bg-accent' : 'border-white/20'}`}>
                                        {!formData.experience && <CheckCircle size={14} className="text-black" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={!formData.experience} onChange={() => setFormData({ ...formData, experience: false })} />
                                    <span className={`text-sm ${!formData.experience ? 'text-white' : 'text-muted group-hover:text-white'}`}>No, I'm new.</span>
                                </label>
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-display font-bold">Operational Base</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="group">
                                <label className="text-xs font-bold text-accent uppercase mb-2 block">City</label>
                                <input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none" />
                            </div>
                            <div className="group">
                                <label className="text-xs font-bold text-accent uppercase mb-2 block">Country</label>
                                <input value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className="w-full bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <label className="text-xs font-bold text-accent uppercase mb-3 block">Preferred Platforms</label>
                            <div className="flex flex-wrap gap-2">
                                {platformsList.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handlePlatformToggle(p)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${formData.platforms.includes(p) ? 'bg-white text-black border-white' : 'bg-transparent border-white/20 text-muted hover:border-white/50'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-display font-bold">Mission Motivation</h2>

                        <div>
                            <label className="text-xs font-bold text-accent uppercase mb-2 block">Why should we recruit you?</label>
                            <textarea
                                value={formData.reason}
                                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full h-32 bg-[#111] border border-white/10 p-4 rounded-xl text-white focus:border-accent outline-none resize-none"
                                placeholder="I have a network of..."
                            />
                        </div>

                        <label className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                            <div className={`mt-1 min-w-[20px] h-5 rounded border flex items-center justify-center transition-colors ${formData.agreed ? 'bg-accent border-accent' : 'border-white/30'}`}>
                                {formData.agreed && <CheckCircle size={14} className="text-black" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={formData.agreed} onChange={e => setFormData({ ...formData, agreed: e.target.checked })} />
                            <span className="text-xs text-muted leading-relaxed">
                                I acknowledge that being a Growth Partner requires dedication. I agree to the terms of engagement and understand that this is a commission-based role.
                            </span>
                        </label>
                    </motion.div>
                );
            default: return null;
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
                <VerticalTape text="MISSION ACCEPTED •" side="left" />
                <VerticalTape text="WELCOME ABROAD •" side="right" />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#0a0a0a] p-10 rounded-3xl border border-green-500/20 text-center max-w-lg w-full relative z-10 shadow-[0_0_50px_rgba(34,197,94,0.1)]"
                >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <CheckCircle size={50} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-display font-black mb-4 text-white">Transmission Received</h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        Your application has been logged in our secure database. Mission Command will review your profile. Expect secure communication via email upon approval.
                    </p>
                    <button
                        onClick={() => navigate('/growth-partner/login')}
                        className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Access Login Terminal
                    </button>
                    <div className="mt-8 text-[10px] text-white/20 font-mono uppercase tracking-[0.2em] animate-pulse">
                        Redirecting to Login...
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none">
                <VerticalTape text="CLASSIFIED • GROWTH PARTNER PROGRAM •" side="left" speed={30} />
                <VerticalTape text="APPLICATION IN PROGRESS • DO NOT ABORT •" side="right" speed={25} />

                {/* Gradient Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full opacity-30" />
            </div>

            {/* MAIN FORM CARD */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative z-10 mt-16 md:mt-24"
            >
                <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Top Bar Decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

                    {/* INTERNAL CONTROLS */}
                    <Link
                        to="/growth-partner"
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors z-20"
                        title="Abort Mission"
                    >
                        <ChevronLeft size={20} />
                    </Link>

                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-4 pr-10">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-white mb-1">Mission Briefing</h1>
                                <p className="text-white/40 text-sm">Step {step + 1} of 4</p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <span className="block text-2xl font-black text-white/10">0{step + 1}</span>
                            </div>
                        </div>
                        <ProgressBar step={step} total={4} />
                    </div>

                    <form onSubmit={e => e.preventDefault()} className="min-h-[400px] flex flex-col justify-between relative">
                        <AnimatePresence mode="wait">
                            {renderStep()}
                        </AnimatePresence>

                        <div className="flex flex-col gap-4 mt-10 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                {step > 0 && (
                                    <button
                                        onClick={prevStep}
                                        className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors font-bold uppercase text-xs tracking-wider"
                                    >
                                        Previous
                                    </button>
                                )}

                                {step < 3 ? (
                                    <button
                                        onClick={nextStep}
                                        className="flex-1 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Continue <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={status === 'submitting'}
                                        className="flex-1 py-3 bg-gradient-to-r from-accent to-accent/80 text-black font-black uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Initialize Sequence'}
                                    </button>
                                )}
                            </div>

                            <div className="flex justify-center items-center gap-2 opacity-30 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-green-500">System Active</span>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Apply;
