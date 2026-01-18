import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { SupabaseBackend } from '../../services/supabaseService';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, Zap, Star } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { user, error } = await SupabaseBackend.login(email, password);

            if (error || !user) {
                setError(error || 'Login failed');
            } else {
                if (user.role === 'admin') {
                    navigate('/admin/growth-partners-dashboard');
                } else {
                    navigate('/growth-partner/dashboard');
                }
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Tape Component
    const MovingTape = ({ text, direction = 'left', speed = 20, rotate = 0, className = "" }: any) => {
        return (
            <div
                className={`absolute w-[200%] flex overflow-hidden py-3 bg-black/50 border-y border-white/10 backdrop-blur-sm z-0 ${className}`}
                style={{ transform: `rotate(${rotate}deg)` }}
            >
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="mx-4 text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/30 tracking-tighter uppercase">
                            {text} <span className="text-accent/40">•</span>
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* ---------------- ACTIVE BACKGROUND GRAPHICS ---------------- */}

            {/* 1. Animated Gradient Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 100, 0], rotate: [0, -180, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]"
                />
            </div>

            {/* 2. Moving Motivational Tapes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-40">
                {/* Tape 1: Top Right to Bottom Left */}
                <div className="absolute w-[200%] top-1/4" style={{ transform: 'rotate(-15deg)' }}>
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex whitespace-nowrap bg-white/5 border-y border-white/5 py-4 backdrop-blur-sm"
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-6xl font-black text-white/5 mx-8 uppercase italic font-display">
                                Hustle <span className="text-accent/20">Harder</span> • Dream <span className="text-purple-500/20">Bigger</span> •
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Tape 2: Top Left to Bottom Right */}
                <div className="absolute w-[200%] bottom-1/4" style={{ transform: 'rotate(5deg)' }}>
                    <motion.div
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="flex whitespace-nowrap bg-black/40 border-y border-white/10 py-6"
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent/20 to-purple-500/20 mx-8 uppercase font-display">
                                Execution <span className="text-white/10">Divides</span> The <span className="text-white/10">Winners</span> •
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>


            {/* ---------------- LOGIN CARD ---------------- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-full max-w-md relative z-20"
            >
                {/* Glow Effect under card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-purple-500 to-accent rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition duration-1000 animate-pulse" />

                <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-white/10 mb-6 shadow-lg"
                        >
                            <Zap className="text-accent drop-shadow-lg" size={32} fill="currentColor" />
                        </motion.div>
                        <motion.h1
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-display font-black text-white mb-2 tracking-tight"
                        >
                            Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Portal</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-muted text-sm font-medium"
                        >
                            Secure access for Growth Partners
                        </motion.p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-2 text-xs font-bold"
                        >
                            <AlertCircle size={14} /> {error}
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group">
                                <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block group-focus-within:text-white transition-colors">Email Address</label>
                                <div className="relative transform group-focus-within:scale-[1.02] transition-transform duration-300">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-accent transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-[#111] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-medium"
                                        placeholder="partner@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block group-focus-within:text-white transition-colors">Password</label>
                                <div className="relative transform group-focus-within:scale-[1.02] transition-transform duration-300">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-accent transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full bg-[#111] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-accent to-accent/90 text-black font-black uppercase tracking-wider rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:brightness-110 transition-all flex items-center justify-center gap-2 group mt-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                        </motion.button>

                        <div className="text-center mt-6">
                            <Link to="/growth-partner/apply" className="text-xs text-muted hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white pb-0.5">
                                Not a partner? Apply via Mission Brief
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>

        </div>
    );
};

export default Login;
