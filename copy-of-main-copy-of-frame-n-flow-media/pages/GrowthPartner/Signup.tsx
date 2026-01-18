import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { SupabaseBackend } from '../../services/supabaseService';
import { Lock, Mail, ArrowRight, Loader2, User as UserIcon } from 'lucide-react';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const { user, error } = await SupabaseBackend.signup(email, password, fullName);

            if (error) {
                setErrorMsg(error);
                setStatus('error');
            } else if (user) {
                // Success! Auto-login usually happens, or they might need to confirm email.
                // For now, let's redirect them to login or dashboard.
                // Actually supabase auto-logs in after signup if confirm is off.
                navigate('/growth-partner/dashboard');
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'An unexpected error occurred');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold mb-2">Partner Activation</h1>
                    <p className="text-muted">Set up your account to access the dashboard. <br /> <span className="text-xs text-white/40">*Requires Approved Application</span></p>
                </div>

                <form onSubmit={handleSignup} className="bg-surface p-8 rounded-2xl border border-white/10 space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted">Email Address (Used in Application)</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted">Create Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {status === 'error' && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 bg-accent text-background font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Activate Account <ArrowRight size={18} /></>}
                    </button>

                    <div className="text-center text-sm text-muted pt-2 border-t border-white/5">
                        Already activated? <Link to="/growth-partner/login" className="text-white hover:underline">Log in</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
