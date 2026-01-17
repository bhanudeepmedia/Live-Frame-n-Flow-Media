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

const Landing: React.FC = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 lg:px-20 pb-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6 backdrop-blur-sm"
                    >
                        <Rocket size={18} />
                        <span className="text-sm font-semibold tracking-wide">FRAME N FLOW PARTNER PROGRAM</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
                    >
                        Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Growth Partner</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-muted max-w-2xl mx-auto mb-10"
                    >
                        Build real business connections. Earn commission. Grow with a modern marketing agency.
                        Join the ecosystem where your network is your net worth.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            to="/growth-partner/apply"
                            className="px-8 py-4 bg-accent text-background font-bold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
                        >
                            Apply Now <ChevronRight size={20} />
                        </Link>
                        <Link
                            to="/growth-partner/login"
                            className="px-8 py-4 bg-surfaceHighlight border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                        >
                            Partner Login
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* What is a Growth Partner? */}
            <section className="py-20 px-6 lg:px-20 bg-surface/50 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What is a Growth Partner?</h2>
                        <p className="text-muted max-w-2xl mx-auto">It's not a job. It's a partnership.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Users, title: "Connect", desc: "You connect businesses specifically to Frame n Flow Media." },
                            { icon: Zap, title: "Collaborate", desc: "No fixed salary. You work like a collaborator, on your own terms." },
                            { icon: DollarSign, title: "Earn", desc: "High-ticket commission based on every closed deal you bring." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp}
                                transition={{ delay: idx * 0.2 }}
                                className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-accent/30 hover:bg-surfaceHighlight transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Can Apply? */}
            <section className="py-20 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Who Can Apply?</h2>
                        <p className="text-muted">If you have the drive, you're halfway there.</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        {["Students", "Freelancers", "Entrepreneurs", "Networkers", "Creators", "Sales Pros"].map((role, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    show: { opacity: 1, scale: 1 }
                                }}
                                className="p-4 rounded-xl bg-surfaceHighlight border border-white/5 text-center hover:border-accent/50 transition-colors"
                            >
                                <Briefcase size={20} className="mx-auto mb-2 text-accent" />
                                <span className="font-medium text-sm">{role}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 px-6 lg:px-20 bg-gradient-to-b from-surface to-background border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.h2 {...fadeInUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
                        How It Works
                    </motion.h2>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: "01", title: "Apply", desc: "Submit your application form." },
                                { step: "02", title: "Shortlist", desc: "Get reviewed and approved." },
                                { step: "03", title: "Access", desc: "Get your exclusive dashboard login." },
                                { step: "04", title: "Earn", desc: "Start outreach & earn commissions." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    {...fadeInUp}
                                    transition={{ delay: idx * 0.2 }}
                                    className="bg-background border border-white/10 p-6 rounded-xl text-center md:text-left relative"
                                >
                                    <div className="text-4xl font-display font-bold text-accent/20 mb-4">{item.step}</div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Why Join The Program?</h2>
                        <div className="space-y-4">
                            {[
                                "Zero Investment Required",
                                "Work From Anywhere (Remote)",
                                "Transparent Earnings Dashboard",
                                "No Monthly Targets",
                                "Performance-Based Rewards",
                                "Direct mentorship from Founders"
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
                                    <span className="text-lg">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-surfaceHighlight p-8 rounded-2xl border border-white/10"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-muted">Potential Earnings</div>
                                <div className="text-2xl font-bold text-green-400">Unlimited</div>
                            </div>
                        </div>
                        <p className="text-muted mb-8">
                            "The Growth Partner program allowed me to monetize my network without quitting my day job. The dashboard makes it super easy to track everything."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full" />
                            <div>
                                <div className="font-bold">Rahul S.</div>
                                <div className="text-xs text-muted">Elite Partner</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-accent/20 to-purple-500/20 p-12 rounded-3xl border border-white/10 backdrop-blur-sm"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Start?</h2>
                    <p className="text-xl text-muted mb-8">Join the fastest growing agency network today.</p>
                    <Link
                        to="/growth-partner/apply"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-background font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        Apply Now <ChevronRight />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Landing;
