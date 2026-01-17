import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MockBackend } from '../../services/mockBackend';
import { Loader2, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Apply: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        background: 'Student',
        experience: false,
        reason: '',
        platforms: [] as string[],
        agreed: false
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const platforms = ['Instagram', 'LinkedIn', 'WhatsApp', 'Email', 'Twitter/X', 'Cold Calling'];
    const backgrounds = ['Student', 'Freelancer', 'Entrepreneur', 'Working Professional', 'Other'];

    const handlePlatformToggle = (p: string) => {
        setFormData(prev => ({
            ...prev,
            platforms: prev.platforms.includes(p)
                ? prev.platforms.filter(i => i !== p)
                : [...prev.platforms, p]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) return;

        setStatus('submitting');
        try {
            await MockBackend.submitApplication({
                ...formData,
                // Combine city/country or keep separate if modified backend, 
                // adhering to interface: city includes country or just city string.
                city: `${formData.city}, ${formData.country}`
            });
            setStatus('success');
            // Redirect after delay
            setTimeout(() => navigate('/growth-partner'), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface p-8 rounded-2xl border border-green-500/20 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-display font-bold mb-4">Application Received!</h2>
                    <p className="text-muted mb-6">
                        We've received your application. Our team will review it and you'll receive your login credentials via email once approved.
                    </p>
                    <button
                        onClick={() => navigate('/growth-partner')}
                        className="w-full py-3 bg-surfaceHighlight hover:bg-white/10 rounded-lg transition-colors"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-20 px-4 md:px-8 font-sans">
            <Link to="/growth-partner" className="inline-flex items-center text-muted hover:text-white mb-8 transition-colors">
                <ChevronLeft size={20} /> Back to Program Info
            </Link>

            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Apply Now</h1>
                    <p className="text-muted">Join the elite network of Growth Partners.</p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 bg-surface/50 p-6 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm"
                >
                    {/* Personal Details */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-white/10 pb-2">Personal Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-muted">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted">Phone / WhatsApp</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">City</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">Country</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-white/10 pb-2">Your Background</h3>

                        <div className="space-y-4">
                            <label className="text-sm text-muted">Current Role</label>
                            <div className="flex flex-wrap gap-3">
                                {backgrounds.map(bg => (
                                    <button
                                        key={bg}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, background: bg })}
                                        className={`px-4 py-2 rounded-full border text-sm transition-all ${formData.background === bg
                                                ? 'bg-accent/20 border-accent text-accent'
                                                : 'bg-background border-white/10 text-muted hover:bg-white/5'
                                            }`}
                                    >
                                        {bg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-muted">Do you have prior sales experience?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="exp"
                                        checked={formData.experience}
                                        onChange={() => setFormData({ ...formData, experience: true })}
                                        className="accent-accent"
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="exp"
                                        checked={!formData.experience}
                                        onChange={() => setFormData({ ...formData, experience: false })}
                                        className="accent-accent"
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-muted">Why do you want to be a Growth Partner?</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.reason}
                                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Tell us about your motivation..."
                            />
                        </div>
                    </div>

                    {/* Outreach */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-white/10 pb-2">Outreach Strategy</h3>
                        <label className="text-sm text-muted">Preferred Platforms (Select multiple)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {platforms.map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => handlePlatformToggle(p)}
                                    className={`px-4 py-3 rounded-xl border text-left text-sm transition-all flex items-center gap-2 ${formData.platforms.includes(p)
                                            ? 'bg-accent/10 border-accent text-accent'
                                            : 'bg-background border-white/10 text-muted hover:border-white/30'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border ${formData.platforms.includes(p) ? 'bg-accent border-accent' : 'border-muted'}`} />
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Agreement */}
                    <div className="pt-4 border-t border-white/10 text-sm md:text-base">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                required
                                checked={formData.agreed}
                                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                                className="mt-1 accent-accent w-4 h-4"
                            />
                            <span className="text-muted group-hover:text-white transition-colors">
                                I understand this is a commission-based role and I agree to Frame n Flow Media’s partner terms.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-4 bg-accent text-background font-bold text-lg rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'submitting' ? (
                            <><Loader2 className="animate-spin" /> Submitting...</>
                        ) : (
                            'Submit Application'
                        )}
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default Apply;
