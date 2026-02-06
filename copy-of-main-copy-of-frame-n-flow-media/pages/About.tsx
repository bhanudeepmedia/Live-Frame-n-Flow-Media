import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Users, Award, Target } from 'lucide-react';
import SEO from '../components/SEO';

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

const About: React.FC = () => {
    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": ["Organization", "Corporation", "LocalBusiness"],
            "name": "Frame n Flow Media",
            "alternateName": "Frame n Flow",
            "legalName": "Frame n Flow Media",
            "url": "https://bhanudeepmedia.github.io/Live-Frame-n-Flow-Media",
            "logo": {
                "@type": "ImageObject",
                "url": "https://framenflowmedia.in/favicon.png",
                "width": "512",
                "height": "512"
            },
            "foundingDate": "2025",
            "founder": {
                "@type": "Person",
                "name": "Bhanu Deep",
                "jobTitle": "Founder & Chief Strategist",
                "url": "https://bhanudeepmedia.github.io/Live-Frame-n-Flow-Media/founder-bhanudeep"
            },
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
            },
            "description": "Frame n Flow Media is a strategy-first marketing agency specializing in business intelligence, performance marketing, AI product visuals, and growth systems. The company bridges the gap between creative execution and business logic to help enterprise partners achieve market dominance.",
            "knowsAbout": [
                "Marketing Strategy",
                "Business Intelligence",
                "Performance Marketing",
                "AI Product Visuals",
                "Growth Systems",
                "Sonic Branding",
                "Market Research",
                "Revenue Engines",
                "Social Media Marketing"
            ],
            "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "addressCountry": "IN"
                }
            },
            "sameAs": [
                "https://www.instagram.com/framenflowmedia/",
                "https://www.linkedin.com/company/frame-n-flow-media/?viewAsMember=true",
                "https://www.youtube.com/@framenflowmedia",
                "https://www.facebook.com/profile.php?id=61585218869613"
            ]
        }
    };

    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-background">
            <SEO
                title="About Frame n Flow Media | Strategy-First Marketing Agency"
                description="Frame n Flow Media is a strategy-first marketing agency founded in 2025 by Bhanu Deep. We specialize in business intelligence, performance marketing, AI product visuals, and growth systems to help businesses achieve market dominance."
                canonical="/about"
                schema={aboutSchema}
            />

            {/* HERO SECTION */}
            <div className="container mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">About Us</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                        Frame n Flow Media
                    </h1>
                    <p className="text-2xl text-white/70 font-light leading-relaxed">
                        A strategy-first marketing agency that bridges the gap between creative chaos and business logic.
                    </p>
                </motion.div>
            </div>

            {/* ENTITY FACTS GRID */}
            <div className="bg-surface py-16 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeIn className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-white/50 mb-1">Founded</h3>
                                <p className="text-2xl font-bold text-white">2025</p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1} className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-white/50 mb-1">Founder</h3>
                                <p className="text-2xl font-bold text-white">Bhanu Deep</p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2} className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-white/50 mb-1">Headquarters</h3>
                                <p className="text-2xl font-bold text-white">India</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* COMPANY OVERVIEW */}
            <div className="container mx-auto px-6 py-24 max-w-4xl">
                <FadeIn>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Company Overview</h2>
                    <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                        <p>
                            Frame n Flow Media is a marketing agency that operates on a strategy-first philosophy. Founded in 2025 by Bhanu Deep, the company was established to address a critical gap in the marketing industry: the disconnect between creative execution and measurable business outcomes.
                        </p>
                        <p>
                            The agency specializes in combining business intelligence with creative excellence. Rather than focusing solely on content production, Frame n Flow Media employs data-driven market analysis to inform every creative decision, ensuring that marketing efforts translate directly into revenue growth.
                        </p>
                        <p>
                            The company's core services include business intelligence and market research, performance marketing and growth systems, AI-generated product visuals and sonic branding, and strategic consulting for enterprise partners.
                        </p>
                    </div>
                </FadeIn>
            </div>

            {/* MISSION & APPROACH */}
            <div className="bg-surfaceHighlight py-24 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                                    <Target size={24} />
                                </div>
                                <h2 className="text-3xl font-display font-bold">Mission</h2>
                            </div>
                            <p className="text-lg text-white/70 leading-relaxed">
                                To help businesses achieve market dominance through the strategic integration of data intelligence and creative execution. Frame n Flow Media aims to eliminate the traditional divide between marketing agencies that prioritize aesthetics over outcomes.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                                    <Award size={24} />
                                </div>
                                <h2 className="text-3xl font-display font-bold">Approach</h2>
                            </div>
                            <p className="text-lg text-white/70 leading-relaxed">
                                The company follows a three-phase methodology: comprehensive market research and audience analysis, strategic development of growth systems and revenue engines, and precision execution using AI-enhanced creative tools and performance marketing frameworks.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* LEADERSHIP */}
            <div className="container mx-auto px-6 py-24">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Leadership</h2>
                    <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
                </FadeIn>

                <FadeIn delay={0.2} className="max-w-3xl mx-auto">
                    <div className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-accent/30 shrink-0">
                                <img
                                    src="/bhanudeep.png"
                                    alt="Bhanu Deep - Founder of Frame n Flow Media"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-2">Bhanu Deep</h3>
                                <p className="text-accent mb-4">Founder & Chief Strategist</p>
                                <p className="text-white/70 leading-relaxed">
                                    Bhanu Deep founded Frame n Flow Media with a vision to transform how businesses approach marketing. With expertise in business intelligence and creative strategy, he personally oversees the strategic direction for all client partnerships, ensuring that every campaign is engineered for measurable market impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* BUSINESS CATEGORY */}
            <div className="bg-surface py-16 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <FadeIn className="max-w-4xl mx-auto">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold mb-4">Business Classification</h2>
                                <div className="space-y-2 text-white/70">
                                    <p><strong className="text-white">Industry:</strong> Marketing & Advertising</p>
                                    <p><strong className="text-white">Specialization:</strong> Strategy-First Digital Marketing</p>
                                    <p><strong className="text-white">Services:</strong> Business Intelligence, Performance Marketing, AI Visuals, Growth Systems</p>
                                    <p><strong className="text-white">Business Type:</strong> Marketing Agency, Corporation</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

        </div>
    );
};

export default About;
