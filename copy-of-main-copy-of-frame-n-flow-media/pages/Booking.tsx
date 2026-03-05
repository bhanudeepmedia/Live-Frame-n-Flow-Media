import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import {
    PhoneOff, Clock, MapPin, Globe, MessageSquare,
    Calendar, Star, Smartphone, BarChart3, ChevronDown, CheckCircle2,
    XCircle, CheckSquare
} from 'lucide-react';

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="mr-2 mb-2 lg:mb-0">
                    {word === "Competitor" ? <span className="text-[#22d3ee]">{word}</span> : word}
                </motion.span>
            ))}
        </motion.div>
    );
};

const FAQItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-white/5 rounded-xl overflow-hidden mb-4 bg-[#0a0f1a]/80 backdrop-blur-md transition-colors hover:border-[#22d3ee]/40 relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#22d3ee]/0 via-[#22d3ee]/5 to-[#22d3ee]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left relative z-10"
            >
                <span className="text-xl font-bold font-oswald uppercase tracking-wide text-white">{question}</span>
                <ChevronDown className={`text-[#22d3ee] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-gray-300 text-lg leading-relaxed font-sans relative z-10">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const BookingWidget = ({ id, minHeight = '650px' }: { id: string, minHeight?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#050810]/80 backdrop-blur-3xl rounded-2xl border border-white/10 overflow-hidden flex flex-col w-full h-full z-10 shadow-[0_0_50px_rgba(0,229,255,0.1)] relative group"
    >
        <div className="absolute -inset-[1px] bg-gradient-to-b from-[#22d3ee]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 rounded-2xl blur-sm"></div>
        <div className="flex-1 w-full bg-background/50 overflow-hidden relative rounded-2xl">
            <iframe
                src="https://links.framenflowmedia.in/widget/booking/gEB61OfubiP3UrKjVBi8"
                style={{ width: '100%', height: '100%', border: 'none', minHeight: minHeight }}
                scrolling="yes"
                id={`gEB61OfubiP3UrKjVBi8_${id}`}
                title="Appointment Booking Widget"
            ></iframe>
        </div>
    </motion.div>
);

const SpaceBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number, y: number, vx: number, vy: number, size: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            const particleCount = window.innerWidth < 768 ? 30 : 60;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3, // Slow movement
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 1.5 + 0.5
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = '#03060a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createRadialGradient(
                canvas.width * 0.5, canvas.height * 0.5, 0,
                canvas.width * 0.5, canvas.height * 0.5, canvas.width
            );
            gradient.addColorStop(0, 'rgba(10, 20, 40, 0.4)'); // Deep blue/black center
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const spotGlow = (x: number, y: number, radius: number, color: string) => {
                const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
                g.addColorStop(0, color);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            }

            spotGlow(canvas.width * 0.8, canvas.height * 0.2, 600, 'rgba(34, 211, 238, 0.06)');
            spotGlow(canvas.width * 0.2, canvas.height * 0.8, 500, 'rgba(50, 50, 100, 0.05)');

            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // Star color
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)'; // Line color (Electric Blue, faint)

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineWidth = (1 - dist / 150) * 0.8;
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};


const Booking: React.FC = () => {
    const [investmentAmount, setInvestmentAmount] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);



    useEffect(() => {
        const scriptId = 'ghl-form-embed-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://links.framenflowmedia.in/js/form_embed.js';
            script.type = 'text/javascript';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const InvestmentQualifier = ({ id = "" }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full relative z-40"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#22d3ee]/60 to-transparent rounded-2xl blur-md opacity-30 pointer-events-none z-[-1]"></div>
            <div className="relative bg-[#050812] backdrop-blur-xl border border-[#22d3ee]/40 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-visible isolate">
                <div className="flex items-start gap-4 mb-6 pointer-events-none">
                    <div className="bg-[#22d3ee]/10 p-2 md:p-3 rounded-lg border border-[#22d3ee]/30 shrink-0 mt-1">
                        <CheckSquare className="text-[#22d3ee]" size={24} />
                    </div>
                    <label className="block text-[#e0f2fe] font-bold uppercase font-oswald tracking-wide text-xl md:text-2xl leading-snug drop-shadow-md">
                        Before you book — how much are you looking to invest in your online presence? (USD)
                    </label>
                </div>
                <div className="relative z-10 overflow-visible">
                    <select
                        className="relative w-full bg-[#03060a] border-2 border-[#22d3ee]/20 hover:border-[#22d3ee]/50 rounded-xl p-5 text-white font-medium text-lg lg:text-xl focus:outline-none focus:border-[#22d3ee] focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all appearance-none z-50 cursor-pointer"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                    >
                        <option value="" disabled>Select your investment range...</option>
                        <option value="Below $500">Below $500</option>
                        <option value="$500 - $1,500">$500 - $1,500</option>
                        <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#22d3ee] pointer-events-none" />
                </div>

                <AnimatePresence mode="wait">
                    {investmentAmount === "Below $500" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="bg-[#111111]/80 p-6 rounded-xl border border-white/5"
                        >
                            <p className="text-lg text-gray-300 leading-relaxed font-medium">
                                Thank you for your interest — our services currently start from $500 USD. If your budget grows in the future we would love to work with you. Feel free to reach out anytime.
                            </p>
                        </motion.div>
                    )}

                    {(investmentAmount === "$500 - $1,500" || investmentAmount === "$1,500 - $3,000") && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="w-full overflow-hidden"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <CheckCircle2 className="text-[#22d3ee]" />
                                <span className="text-[#22d3ee] font-bold font-oswald uppercase text-xl tracking-wide">Great — select your preferred 30 minute strategy call slot below 👇</span>
                            </div>
                            <BookingWidget id={`qualified_${id}`} minHeight="700px" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );

    return (
        <div ref={containerRef} className="bg-[#03060a] text-white min-h-screen font-sans selection:bg-[#22d3ee]/30 selection:text-white relative overflow-x-hidden w-full max-w-[100vw]" style={{ scrollBehavior: 'smooth' }}>


            {/* Custom Scrollbar Styles */}
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
                <style>{`
                    .font-oswald { font-family: 'Oswald', sans-serif; }
                    .font-sans { font-family: 'DM Sans', sans-serif; }
                    ::-webkit-scrollbar { width: 6px; }
                    ::-webkit-scrollbar-track { background: #03060a; }
                    ::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 10px; }

                `}</style>
            </Helmet>
            <SEO
                title="Web Design & AI Marketing for Australian Tradies | Frame n Flow Media"
                description="The #1 web design and growth system built specifically for Australian tradies, contractors, and home service businesses. Dominate local Google rankings, automate lead capture, and generate more five-star reviews on autopilot. Book your strategy call today."
                canonical="/web-design-australia"
                schema={{
                    "@context": "https://schema.org",
                    "@type": ["WebPage", "Service", "LocalBusiness"],
                    "name": "Web Design for Australian Tradies | Frame n Flow Media",
                    "description": "Premium website design and automated AI marketing systems engineered specifically for Australian tradesmen, contractors, plumbers, electricians, and home service providers to secure page one Google rankings and capture local leads.",
                    "provider": {
                        "@type": "Organization",
                        "name": "Frame n Flow Media"
                    },
                    "areaServed": [
                        { "@type": "Country", "name": "Australia" },
                        { "@type": "City", "name": "Sydney" },
                        { "@type": "City", "name": "Melbourne" },
                        { "@type": "City", "name": "Brisbane" },
                        { "@type": "City", "name": "Perth" }
                    ],
                    "audience": {
                        "@type": "Audience",
                        "audienceType": "Australian Tradesmen, Home Services, Contractors, Plumbers, Electricians, Builders"
                    },
                    "knowsAbout": [
                        "Australian Trades Web Design",
                        "Tradie Marketing Services",
                        "Local SEO for Contractors",
                        "Automated Job Booking Systems",
                        "Lead Generation for Trade Businesses in Australia"
                    ],
                    "keywords": "web design australia, tradie websites, contractor marketing sydney, web developer for tradesmen melbourne, local SEO brisbane, automated lead generation perth, smart websites for trades"
                }}
            />

            <SpaceBackground />

            {/* SECTION 1: HERO — STORY OPENING */}
            <section className="relative min-h-screen md:min-h-[85vh] flex flex-col justify-center pt-8 md:pt-24 pb-12 md:pb-16 px-6 z-10 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03060a]/50 to-[#03060a]"
                    style={{ y: bgY }}
                />
                <div className="container mx-auto max-w-7xl relative z-10 w-full mt-10 md:mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                        <div className="flex flex-col justify-center h-full order-1">
                            <AnimatedText
                                text="Every Missed Call Is a Job Going Straight to Your Competitor"
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-oswald font-bold uppercase leading-[1.1] mb-6 md:mb-8"
                            />

                            <div className="hidden md:block">
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="text-xl md:text-3xl text-gray-300 font-medium mb-10 leading-relaxed max-w-2xl relative"
                                >
                                    We build SMART websites that SPEAK with your customers automatically — booking jobs while you're on site.
                                    <div className="absolute -inset-4 bg-[#22d3ee]/5 blur-3xl rounded-full -z-10"></div>
                                </motion.h2>

                                <div className="space-y-5 mb-12">
                                    {[
                                        "30 minute strategy call — straight to the point",
                                        "We show you exactly how it works for your trade",
                                        "No lock in contracts — no hidden fees",
                                        "Built for serious trade business owners only"
                                    ].map((bullet, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
                                            className="flex items-center gap-5 group"
                                        >
                                            <div className="relative z-10 overflow-visible">
                                                <div className="absolute inset-0 bg-[#22d3ee]/40 blur-md rounded-full group-hover:bg-[#22d3ee]/80 transition-all"></div>
                                                <CheckCircle2 className="text-[#22d3ee] relative z-10" size={24} />
                                            </div>
                                            <p className="text-xl font-medium text-gray-200">{bullet}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1.5 }}
                                    className="text-sm text-gray-500 max-w-md uppercase tracking-widest font-bold mb-10"
                                >
                                    This call is for Australian trade and home service business owners who are serious about growing their business — not looking for a quick fix.
                                </motion.p>
                            </div>
                        </div>

                        <div className="order-2 flex flex-col justify-center w-full lg:max-w-xl xl:max-w-none">
                            <InvestmentQualifier id="hero" />
                        </div>

                        <div className="md:hidden order-3 mt-4 pt-10 border-t border-white/10">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl text-gray-300 font-medium mb-8 leading-relaxed"
                            >
                                We build SMART websites that SPEAK with your customers automatically — booking jobs while you're on site.
                            </motion.h2>
                            <div className="space-y-4">
                                {[
                                    "Strategy call — straight to the point",
                                    "We show you exactly how it works",
                                    "Built for serious business owners only"
                                ].map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <CheckCircle2 className="text-[#22d3ee] shrink-0" size={24} />
                                        <p className="text-lg font-medium text-gray-200">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: THE STORY — THE PROBLEM */}
            <section className="py-24 md:py-32 px-6 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-vr from-[#03060a] to-[#0a0f1a] -z-10"></div>
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>

                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-8 leading-tight">
                            Right Now — This Is Happening to Your Business Every Single Day
                        </h2>
                        <p className="text-2xl text-gray-500 italic font-light mb-20 max-w-4xl leading-relaxed">
                            It is 2pm. You are on the roof. Your phone rings. You cannot answer. Three seconds later — they have already called your competitor.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-1 md:col-span-3 mb-16 relative rounded-3xl overflow-hidden shadow-2xl shadow-[#22d3ee]/5 min-h-[280px] sm:min-h-[350px] lg:aspect-[3/1] bg-[#0a0f1a] flex items-end p-6 sm:p-10 lg:p-12 border border-white/5"
                    >
                        <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=2000" alt="Strategy formulation" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03060a] via-[#03060a]/70 to-transparent"></div>
                        <div className="relative z-10 w-full max-w-3xl">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-bold uppercase text-white drop-shadow-lg leading-tight">
                                How many jobs are you losing right now <span className="text-[#22d3ee]">without even knowing it?</span>
                            </h3>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            { icon: <PhoneOff size={48} className="text-[#22d3ee] animate-pulse" />, title: "Missed Calls = Lost Jobs", copy: "Every time you are on the roof, under a sink, or on a job site and miss a call — that customer rings the next agency on Google and books them instead. Gone forever." },
                            { icon: <Clock size={48} className="text-[#22d3ee]" />, title: "Slow Replies Kill Deals", copy: "Australians expect a response within minutes. If your website has no instant reply system — they move on before you even see the message." },
                            { icon: <MapPin size={48} className="text-[#22d3ee]" />, title: "Competitors Show Up — You Don't", copy: "Right now your clients are searching for your service on Google. If you are not showing up on page one — every single one is going to someone else." }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="relative bg-[#050810]/50 backdrop-blur-sm rounded-2xl p-10 group overflow-hidden border border-white/5"
                            >
                                <div className="absolute inset-0 border-2 border-[#22d3ee]/0 group-hover:border-[#22d3ee]/30 rounded-2xl transition-all duration-700 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                                <div className="mb-8">{card.icon}</div>
                                <h3 className="text-2xl font-oswald uppercase font-bold mb-6 text-white">{card.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{card.copy}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE TURNING POINT — THE SOLUTION */}
            <section className="py-24 md:py-32 px-6 relative z-10 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0f1a] to-[#040814]"
                >
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#22d3ee]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
                </motion.div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-oswald font-bold uppercase mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight">
                            Introducing Your SMART Website System<br className="hidden md:block" />
                            <span className="text-[#22d3ee]">Working 24 Hours a Day</span>
                        </h2>
                        <p className="text-2xl text-[#22d3ee] italic font-light max-w-4xl mx-auto leading-relaxed drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                            While you are on the tools — your SMART website is online, answering every enquiry, booking every job, and following up every lead. Automatically. Always.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            {
                                image: "/tradie_google.png",
                                title: "Dominates Google Locality",
                                copy: "We don't just build a website; we build a fully optimised growth engine that places your trade business right in front of homeowners actively searching for your service. We lock you into page one."
                            },
                            {
                                image: "/tradie_calendar.png",
                                title: "Automated Lead Capture & Booking",
                                copy: "Every message, Google enquiry, or missed call gets an instant, intelligent automated reply within 3 seconds. Customers select their own time slot in your digital calendar—no back-and-forth required."
                            },
                            {
                                image: "/tradie_review.png",
                                title: "Reviews & Reporting on Autopilot",
                                copy: "After every job, your system automatically requests a five-star review, boosting your ranking weekly. Plus, you get a crystal-clear monthly ROI report showing exactly where your leads came from."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className={`group flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-[#050810]/60 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden hover:border-[#22d3ee]/40 transition-colors shadow-2xl relative`}
                            >
                                <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden shrink-0 border-r border-[#22d3ee]/10">
                                    <div className="absolute inset-0 bg-[#22d3ee]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700"></div>
                                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                                </div>
                                <div className="md:w-7/12 p-8 lg:p-14 flex flex-col justify-center relative overflow-hidden">
                                    <div className="absolute -inset-20 bg-gradient-to-r from-[#22d3ee]/0 to-[#22d3ee]/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 blur-3xl"></div>
                                    <h3 className="text-3xl md:text-4xl font-oswald uppercase font-bold mb-4 md:mb-6 text-white group-hover:text-[#22d3ee] transition-colors drop-shadow-sm">{feature.title}</h3>
                                    <p className="text-lg lg:text-xl text-gray-400 leading-relaxed font-light">{feature.copy}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE TRANSFORMATION — BEFORE AND AFTER */}
            <section className="py-0 relative z-10 hidden md:block">
                <div className="flex h-screen w-full">
                    {/* LEFT SIDE - BEFORE */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="w-1/2 bg-[#0d0d0d] relative flex flex-col justify-center px-12 lg:px-24"
                    >
                        <div className="absolute inset-0 bg-red-900/5 mix-blend-overlay"></div>
                        <h3 className="text-4xl lg:text-5xl font-oswald uppercase font-bold mb-12 text-white/50 relative z-10">Before — Without The System</h3>
                        <ul className="space-y-8 relative z-10">
                            {[
                                "Phone rings while you're on site — missed call — lost job",
                                "Someone messages your website at 9pm — no reply — they book a competitor",
                                "You spend evenings manually replying to enquiries",
                                "Your Google listing has 4 reviews — competitor has 87",
                                "You wake up to unanswered messages and missed opportunities",
                                "You have no idea how many leads you are losing every week"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-6 items-start">
                                    <XCircle className="text-red-500/70 shrink-0 mt-1" size={28} />
                                    <span className="text-2xl text-gray-500">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* RIGHT SIDE - AFTER */}
                    <motion.div
                        initial={{ x: "100%" }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="w-1/2 bg-[#050b1a] relative flex flex-col justify-center px-12 lg:px-24"
                    >
                        <div className="absolute inset-0 bg-[#22d3ee]/5 mix-blend-overlay"></div>

                        {/* Glowing divider line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#22d3ee]/0 via-[#22d3ee] to-[#22d3ee]/0 shadow-[0_0_20px_rgba(0,229,255,0.8)] origin-top z-20"
                        ></motion.div>

                        <h3 className="text-4xl lg:text-5xl font-oswald uppercase font-bold mb-12 text-white relative z-10 drop-shadow-md">After — With The System</h3>
                        <ul className="space-y-8 relative z-10">
                            {[
                                "Every call is answered automatically — job booked instantly",
                                "9pm enquiry gets an instant intelligent reply — appointment confirmed",
                                "Your evenings are completely free — system handles everything",
                                "Reviews collected automatically after every job — ranking climbs weekly",
                                "You wake up to a full calendar booked overnight automatically",
                                "Monthly report shows exactly how many jobs your system delivered"
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1 + (i * 0.1) }}
                                    className="flex gap-6 items-start"
                                >
                                    <CheckCircle2 className="text-[#22d3ee] shrink-0 mt-1 shadow-[0_0_10px_rgba(0,229,255,0.5)] bg-[#22d3ee]/10 rounded-full" size={28} />
                                    <span className="text-2xl text-gray-100 font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4: MOBILE BEFORE/AFTER */}
            <section className="md:hidden">
                <div className="bg-[#0d0d0d] py-20 px-6 relative">
                    <h3 className="text-4xl font-oswald uppercase font-bold mb-10 text-white/50 text-center">Before <br />Without The System</h3>
                    <ul className="space-y-6">
                        {[
                            "Phone rings while you're on site — missed call — lost job",
                            "Someone messages your website at 9pm — no reply — they book a competitor",
                            "You spend evenings manually replying to enquiries",
                            "Your Google listing has 4 reviews — competitor has 87"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <XCircle className="text-red-500/70 shrink-0 mt-1" />
                                <span className="text-lg text-gray-500">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-[#050b1a] py-20 px-6 relative border-t-2 border-[#22d3ee]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-[#22d3ee]/20 blur-2xl"></div>
                    <h3 className="text-4xl font-oswald uppercase font-bold mb-10 text-white text-center">After <br />With The System</h3>
                    <ul className="space-y-6">
                        {[
                            "Every call is answered automatically — job booked instantly",
                            "9pm enquiry gets an instant intelligent reply — appointment confirmed",
                            "Your evenings are completely free — system handles everything",
                            "Reviews collected automatically after every job — ranking climbs weekly"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <CheckCircle2 className="text-[#22d3ee] shrink-0 mt-1" />
                                <span className="text-lg text-gray-100 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* SECTION 5: WHO THIS IS FOR */}
            <section className="py-24 md:py-32 px-6 relative z-10 border-y border-white/5 overflow-hidden bg-[#03060a]">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[length:100px_100px]"></div>

                <div className="container mx-auto max-w-6xl text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase mb-16"
                    >
                        Built for Australian Tradies<br />Who Are Serious About Growing
                    </motion.h2>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 relative">
                        {[
                            "Roofers", "Plumbers", "Electricians", "Builders",
                            "Concreters", "Landscapers", "Fencing Companies",
                            "Solar Installers", "Painters", "Tilers",
                            "Cabinet Makers", "Pool Builders", "Bathroom Renovators",
                            "Kitchen Renovators", "Demolition Companies",
                            "Earthmoving Companies", "Lawn Mowing Services",
                            "Pest Control", "Cleaning Companies", "Air Conditioning Installers"
                        ].map((trade, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.5, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.03, type: "spring", damping: 15 }}
                                className="px-5 py-2 md:px-6 md:py-3 bg-[#0a0f1a]/80 backdrop-blur-md border border-white/10 rounded-full text-white font-medium hover:border-[#22d3ee] hover:bg-[#22d3ee]/10 transition-colors text-lg"
                            >
                                {trade}
                            </motion.span>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="text-2xl text-gray-400 font-medium italic"
                    >
                        If Australian homeowners search for your trade on Google — this system was built for you.
                    </motion.p>
                </div>
            </section>

            {/* SECTION 6: WHAT HAPPENS ON THE CALL */}
            <section className="py-24 md:py-32 px-6 relative z-10 bg-[#0a0f1a]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-[#22d3ee]/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

                <div className="container mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase text-center mb-24 leading-tight"
                    >
                        Here Is Exactly What Happens<br />in Your <span className="text-[#22d3ee]">30 Minutes</span>
                    </motion.h2>

                    <div className="space-y-12 md:space-y-24">
                        {[
                            { step: "01", title: "We Show You Your Website", copy: "We have already built a website specifically designed for your trade. You see exactly how it looks and exactly how it works — no guessing, no mock ups, no imagination needed.", align: "left" },
                            { step: "02", title: "We Show You How It Books Jobs Automatically", copy: "We walk you through exactly how your SMART website speaks with every customer automatically — answering enquiries, following up every lead, and booking jobs directly into your calendar while you are on site.", align: "right" },
                            { step: "03", title: "You Decide — Zero Pressure", copy: "If it makes sense for your business we show you how to get started within 24 hours. If not — no hard feelings at all. We only work with tradies who genuinely want to grow.", align: "left" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, type: "spring", damping: 20 }}
                                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="md:w-1/2 relative flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-xl md:text-2xl font-oswald font-bold tracking-widest text-[#22d3ee]">STEP {item.step}</span>
                                        <div className="h-[2px] w-12 bg-[#22d3ee]/50"></div>
                                    </div>
                                    <h3 className="text-4xl lg:text-5xl font-oswald uppercase font-bold text-white relative z-10 mb-8 drop-shadow-lg leading-tight">{item.title}</h3>
                                    <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-light relative z-10">{item.copy}</p>
                                </div>
                                <div className="md:w-1/2 w-full">
                                    <div className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)] group aspect-[4/3] w-full">
                                        <img src={item.step === '01' ? '/tradie1.png' : item.step === '02' ? '/tradie2.png' : '/tradie3.png'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7: FAQ */}
            <section className="py-24 px-6 relative z-10 bg-[#03060a]">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0a0f1a] -z-10"></div>
                <div className="container mx-auto max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase text-center mb-16"
                    >
                        Straight Answers — No Rubbish
                    </motion.h2>
                    <div className="space-y-4">
                        <FAQItem
                            index={0}
                            question="How much does it cost?"
                            answer="Investment varies depending on your business size and goals. We keep all pricing transparent and discuss everything clearly on the 30 minute strategy call — no surprises and no hidden fees ever."
                        />
                        <FAQItem
                            index={1}
                            question="Do I need to be tech savvy?"
                            answer="Not even slightly. We build everything, set everything up, and manage everything for you. You just show up to the 30 minute call and we handle every single thing after that."
                        />
                        <FAQItem
                            index={2}
                            question="How long before I start getting leads?"
                            answer="Your website goes live within 7 days of getting started. Google typically begins ranking new websites within 30 to 60 days. Most clients see their first inbound leads within the first month."
                        />
                        <FAQItem
                            index={3}
                            question="What if I already have a website?"
                            answer="Most tradies we work with already have a basic website — but it is not ranking on Google, not replying to enquiries automatically, and not booking jobs while they sleep. We fix all three on the 30 minute call."
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 8: FINAL CTA — THE CLOSING SCENE */}
            <section className="py-32 lg:py-48 px-6 relative z-10 bg-[#0a0f1a]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#03060a] to-transparent -z-10"></div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#22d3ee]/20 rounded-full blur-[150px] -z-10 overflow-hidden"
                ></motion.div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", damping: 15 }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-oswald font-bold uppercase mb-8 leading-[1.2] pb-2"
                    >
                        Your Competitors Are Booking Jobs From Google Right Now.<br />
                        <span className="text-[#22d3ee] mt-4 block">The Question Is — Are You?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-xl md:text-3xl text-gray-300 font-medium mb-16 max-w-3xl mx-auto leading-relaxed"
                    >
                        Book your free 30 minute strategy call today.<br />Straight talking. No pressure. No fluff. Just results.
                    </motion.p>

                    {/* Re-using the qualifier component so logic remains identical */}
                    <div className="max-w-xl mx-auto md:scale-105">
                        <InvestmentQualifier id="footer" />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5 }}
                        className="text-xs md:text-base text-gray-500 uppercase font-bold tracking-widest mt-12"
                    >
                        Serious trade business owners only. Limited slots available each week.
                    </motion.p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Booking;
