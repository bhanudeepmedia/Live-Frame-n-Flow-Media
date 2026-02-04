import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Users, Calendar, ShieldCheck, Target, ArrowRight, MessageCircle, Phone, MapPin } from 'lucide-react';

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

const ServiceMarketing: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-black overflow-x-hidden font-sans text-white">
            <SEO
                title="Service Business Marketing | Frame n Flow Media"
                description="High-Ticket Lead Generation for Service Businesses. Local SEO, Automated Booking Systems, and Reputation Management."
                canonical="/service-marketing"
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px]" />
            </div>

            {/* HERO */}
            <div className="container mx-auto px-6 mb-20 md:mb-32 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Service Businesses</span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight">
                            Fill Your Calendar. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-green-400">Automate Your Sales.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-xl text-white/60 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                            Stop chasing cold leads. We build <strong className="text-white">Local Domination Systems</strong> that bring high-intent customers directly to your booking page.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3} className="flex flex-col md:flex-row gap-4 justify-center w-full">
                        <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'} className="px-10 py-5 text-lg">
                            Get More Leads
                        </Button>
                        <button onClick={() => window.open('https://wa.me/917995533838', '_blank')} className="px-8 py-5 border border-white/20 hover:bg-white/10 rounded-full font-bold transition-all text-white flex items-center gap-2 justify-center group">
                            <MessageCircle size={20} className="group-hover:text-[#25D366] transition-colors" />
                            WhatsApp Us
                        </button>
                    </FadeIn>
                </div>
            </div>

            {/* CORE FEATURES */}
            <div className="container mx-auto px-6 mb-24 md:mb-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FadeIn delay={0.1} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MapPin size={28} className="text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Local Domination</h3>
                        <p className="text-white/60 leading-relaxed">
                            We optimize your Google Business Profile and local keywords so you appear first when customers search for "Best [Service] near me".
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Calendar size={28} className="text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Auto-Booking</h3>
                        <p className="text-white/60 leading-relaxed">
                            Our AI agents handle inquiries instantly, qualify the lead, and book them directly into your calendar. You just show up and close.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-colors group">
                        <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={28} className="text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Reputation Guard</h3>
                        <p className="text-white/60 leading-relaxed">
                            We automate review requests to happy customers and intercept negative feedback before it goes public. Build 5-star trust on autopilot.
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-surfaceHighlight border-y border-white/10 py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Booking Engine</h2>
                        <p className="text-white/60 text-lg">Designed for Dentists, Roofers, Plumbers, and Consultants.</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                        <FadeIn delay={0.2} className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#111]" />

                            {/* Chat Interface Simulation */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-center max-w-sm mx-auto">
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-xs font-bold text-black">C</div>
                                        <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-xs text-white/80">
                                            Hi, do you do emergency roof repairs?
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-end">
                                        <div className="bg-accent/20 p-3 rounded-2xl rounded-tr-none text-xs text-white border border-accent/20">
                                            Yes! We have a team available in your area. Can I book a free inspection for tomorrow morning?
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"><Target size={14} className="text-black" /></div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-xs font-bold text-black">C</div>
                                        <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-xs text-white/80">
                                            That would be great. 9 AM works.
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 animate-pulse">Appointment Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">1</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Capture</h4>
                                    <p className="text-white/60">We launch high-intent ads on Google & Facebook targeting your local service area.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">2</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Nurture</h4>
                                    <p className="text-white/60">Our AI instantly text-backs missed calls and follows up with leads within 30 seconds.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">3</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Close</h4>
                                    <p className="text-white/60">Appointments land on your calendar. You focus on service, not scheduling.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="container mx-auto px-6 py-24 text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to dominate your market?</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'} className="px-12 py-4 text-lg">Get Free Leads Audit</Button>
                        <button onClick={() => window.open('https://wa.me/917995533838', '_blank')} className="px-12 py-4 border border-white/20 hover:bg-white/10 rounded-full font-bold transition-all text-white flex items-center gap-2 justify-center group text-lg">
                            <MessageCircle size={24} className="group-hover:text-[#25D366] transition-colors" />
                            WhatsApp Now
                        </button>
                    </div>
                </FadeIn>
            </div>

        </div>
    );
};

export default ServiceMarketing;
