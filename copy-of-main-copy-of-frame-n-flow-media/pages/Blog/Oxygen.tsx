import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import { Calendar, User, CheckCircle2, Search, PenTool, LayoutDashboard, Megaphone, MapPin, Phone, Mail, Globe, ArrowLeft, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
        {children}
    </motion.div>
);

const OxygenPost: React.FC = () => {
    const [isLight, setIsLight] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('blog-theme') === 'light';
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem('blog-theme', isLight ? 'light' : 'dark');
    }, [isLight]);

    const t = (dark: string, light: string) => isLight ? light : dark;

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Oxygen: Helping Hyderabad Businesses Grow With Smarter Digital Marketing",
        "description": "A look at Oxygen, a Hyderabad-based digital marketing company helping businesses improve online visibility, attract the right audience, and generate quality leads through SEO, content, and web design.",
        "author": { "@type": "Organization", "name": "Frame n Flow Media", "url": "https://framenflowmedia.in" },
        "publisher": { "@type": "Organization", "name": "Frame n Flow Media", "logo": { "@type": "ImageObject", "url": "https://framenflowmedia.in/logo.png" } },
        "datePublished": "2026-08-17",
        "dateModified": "2026-08-17",
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://framenflowmedia.in/blog/oxygen-digital-marketing-hyderabad/" },
        "keywords": "Oxygen Ites, digital marketing Hyderabad, SEO Hyderabad, website design Hyderabad, content marketing, online brand promotion"
    };

    const surface = `${t('bg-white/5', 'bg-black/[0.03]')} border ${t('border-white/10', 'border-black/10')} rounded-xl p-6 my-6`;
    const heading = t('text-white', 'text-gray-900');
    const bodyText = t('text-white/80', 'text-gray-700');
    const mutedText = t('text-white/50', 'text-gray-500');
    const subtleText = t('text-white/30', 'text-gray-400');
    const strongText = t('text-white', 'text-gray-900');
    const sectionTitle = `text-3xl font-display font-bold ${heading}`;
    const subHeading = `text-2xl font-bold ${heading} mt-10 mb-4 flex items-center gap-3`;
    const iconBadge = `w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center border border-accent/20 flex-shrink-0`;
    const toolCard = `${t('bg-white/5', 'bg-white shadow-sm')} border ${t('border-white/10', 'border-gray-200')} p-4 rounded-lg flex items-start gap-3`;

    const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <li className="flex items-start gap-3">
            <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={18} />
            {children}
        </li>
    );

    return (
        <div className={`blog-theme ${isLight ? 'blog-light' : ''}`}>
            <div className={`min-h-screen ${t('bg-background', 'bg-[#f8f9fa]')} pt-24 md:pt-32 pb-20 font-sans ${t('text-white', 'text-gray-800')} transition-colors duration-500`}>
                <SEO
                    title="Oxygen: Digital Marketing Company Helping Hyderabad Businesses Grow | Frame n Flow Media"
                    description="A look at Oxygen, a Hyderabad-based digital marketing company helping businesses improve online visibility, attract the right audience, and generate quality leads through SEO, content, and web design."
                    canonical="/blog/oxygen-digital-marketing-hyderabad"
                    type="article"
                    schema={blogSchema}
                />

                <div className="fixed top-24 right-6 z-50">
                    <motion.button
                        onClick={() => setIsLight(!isLight)}
                        className={`w-12 h-12 rounded-full ${t('bg-white/10 hover:bg-white/20 text-white', 'bg-black/5 hover:bg-black/10 text-gray-800')} backdrop-blur-xl border ${t('border-white/10', 'border-black/10')} flex items-center justify-center shadow-lg transition-all duration-300`}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        aria-label="Toggle blog theme"
                    >
                        <AnimatePresence mode="wait">
                            {isLight ? (
                                <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon size={20} />
                                </motion.div>
                            ) : (
                                <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                    <div className={`text-[10px] ${mutedText} text-center mt-1 font-mono`}>{isLight ? 'Dark' : 'Light'}</div>
                </div>

                <article className="container mx-auto px-6 max-w-4xl relative z-10">
                    <FadeIn>
                        <div className="mb-12 md:mb-16 text-center">
                            <div className={`flex flex-wrap justify-center items-center gap-4 text-sm ${mutedText} mb-6 font-mono uppercase tracking-widest`}>
                                <span className="flex items-center gap-2"><Calendar size={14} /> Aug 17, 2026</span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-2"><User size={14} /> Frame n Flow Team</span>
                                <span className="hidden md:inline">•</span>
                                <span>6-8 min read</span>
                            </div>
                            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight ${heading}`}>
                                Oxygen: Helping Hyderabad Businesses Grow With <span className="text-accent">Smarter Digital Marketing</span>
                            </h1>
                        </div>
                    </FadeIn>

                    <div className={`prose prose-lg max-w-none ${bodyText} leading-relaxed space-y-8`}>
                        <FadeIn>
                            <p className={`text-xl md:text-2xl ${heading} font-light leading-relaxed border-l-4 border-accent pl-6 italic`}>
                                Visibility online isn&#39;t optional anymore &mdash; it&#39;s the difference between a business that gets found and one that gets scrolled past.
                            </p>
                        </FadeIn>

                        <FadeIn>
                            <p>That&#39;s the problem <strong className={strongText}>Oxygen</strong> was built to solve. Oxygen is a digital marketing company that helps businesses improve their online presence, attract the right audience, and generate quality leads. Rather than chasing vanity metrics, the team focuses on practical strategies that strengthen visibility, connect brands with real potential customers, and drive sustainable growth in a genuinely competitive online environment.</p>
                            <p>With a strong focus on <strong className={strongText}>Digital Marketing Services in Hyderabad</strong>, Oxygen has built a service model around what local and regional businesses actually need: search visibility that converts, websites that perform, and content that keeps working long after it&#39;s published.</p>
                        </FadeIn>

                        <FadeIn><h2 className={`${sectionTitle} mt-16 mb-8`}>What Oxygen Actually Does</h2></FadeIn>

                        <FadeIn>
                            <p>Oxygen&#39;s service stack is built around one idea &mdash; that digital marketing only works when the pieces are connected. SEO without a fast, well-structured website underperforms. Content without a promotion strategy sits unread. So instead of offering isolated services, Oxygen combines them into a single, coherent growth engine:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                                {[
                                    { icon: <Search size={20} className="text-accent" />, name: "SEO", desc: "Improving search visibility so the right audience finds the business organically, without relying entirely on paid traffic." },
                                    { icon: <Megaphone size={20} className="text-accent" />, name: "Digital Marketing", desc: "Full-funnel strategies designed to attract, engage, and convert potential customers across multiple online channels." },
                                    { icon: <LayoutDashboard size={20} className="text-accent" />, name: "Website Design & Development", desc: "Building websites that are fast, credible, and structured to turn visitors into leads." },
                                    { icon: <PenTool size={20} className="text-accent" />, name: "Content Marketing", desc: "Creating content that supports SEO goals while genuinely answering the questions a business&#39;s audience is asking." },
                                ].map((service, i) => (
                                    <div key={i} className={toolCard}>
                                        <div className={iconBadge}>{service.icon}</div>
                                        <div>
                                            <div className={`font-bold ${heading}`}>{service.name}</div>
                                            <div className={`text-sm ${mutedText} mt-1`}>{service.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p>The common thread across all four is intent. Oxygen doesn&#39;t sell traffic for the sake of traffic &mdash; every strategy is designed to improve search visibility, increase relevant website traffic, and help businesses build a stronger digital presence across the channels that actually matter to them.</p>
                        </FadeIn>

                        <FadeIn>
                            <h3 className={subHeading}><MapPin className="text-accent" size={22} /> A Local Focus That Understands Local Search</h3>
                            <p>One of the things that stands out about Oxygen is how deliberately it leans into local relevance. Being based in <strong className={strongText}>Esamia Bazar, Koti, Hyderabad</strong>, gives the team a working understanding of how businesses in the region search, compete, and get discovered &mdash; which shows up directly in how they approach <a href="https://oxygenites.com/digital-marketing-hyderabad/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Digital Marketing Services in Hyderabad</a>.</p>
                            <div className={surface}>
                                <h4 className={`font-bold ${heading} mb-4`}>Why local expertise matters:</h4>
                                <ul className="space-y-2">
                                    <CheckItem>Search intent and competition vary significantly by city and industry</CheckItem>
                                    <CheckItem>Local SEO signals (maps, citations, reviews) require region-specific handling</CheckItem>
                                    <CheckItem>Messaging that resonates locally converts better than generic copy</CheckItem>
                                    <CheckItem>Faster feedback loops when strategy and execution sit close to the market</CheckItem>
                                </ul>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <h3 className={subHeading}><Globe className="text-accent" size={22} /> Strategy Before Execution</h3>
                            <p>Oxygen works with businesses to build digital strategies based on their specific goals and requirements, rather than applying a one-size-fits-all package. By combining SEO, content, website optimization, and broader digital marketing techniques, the team helps businesses improve their online reach, attract genuinely interested customers, and build long-term growth through a stronger, more coherent digital presence.</p>
                            <p>That approach &mdash; strategy first, tactics second &mdash; is a philosophy we share here at Frame n Flow Media, which is part of why Oxygen&#39;s work caught our attention.</p>
                        </FadeIn>

                        <FadeIn>
                            <h2 className={`${sectionTitle} mt-16 mb-6`}>Get In Touch With Oxygen</h2>
                            <div className={surface}>
                                <ul className="space-y-3">
                                    <CheckItem><div><strong className={strongText}>Company:</strong> Oxygen Ites Pvt Ltd</div></CheckItem>
                                    <CheckItem><div><strong className={strongText}>Address:</strong> Esamia Bazar, Koti, Hyderabad &ndash; 500027, Telangana, India</div></CheckItem>
                                    <CheckItem><div className="flex items-center gap-2"><Phone size={16} className="text-accent" /> <strong className={strongText}>Phone:</strong> +91 9885346295</div></CheckItem>
                                    <CheckItem><div className="flex items-center gap-2"><Mail size={16} className="text-accent" /> <strong className={strongText}>Email:</strong> info@oxygenites.com</div></CheckItem>
                                    <CheckItem><div className="flex items-center gap-2"><Globe size={16} className="text-accent" /> <strong className={strongText}>Website:</strong> <a href="https://oxygenites.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">oxygenites.com</a></div></CheckItem>
                                </ul>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <h2 className={`${sectionTitle} mt-16 mb-6`}>Closing Thoughts</h2>
                            <p>Businesses today don&#39;t just need a digital presence &mdash; they need one that&#39;s findable, credible, and built to convert. Oxygen&#39;s combination of SEO, content, and web development, backed by real local market knowledge, is a solid example of what practical, results-focused digital marketing looks like in 2026.</p>
                            <p>If you&#39;re a business in Hyderabad exploring your options, Oxygen&#39;s <a href="https://oxygenites.com/digital-marketing-hyderabad/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Digital Marketing Services in Hyderabad</a> page is a good place to start.</p>
                        </FadeIn>

                        <FadeIn>
                            <div className={`text-sm ${subtleText} pt-12 mt-8 border-t ${t('border-white/5', 'border-gray-200')} italic`}>
                                <p><strong className={mutedText}>About Frame n Flow Media:</strong> Frame n Flow Media is a strategy-first digital agency building revenue-focused websites, SEO, and growth systems for businesses across India, USA, UAE, and Europe.</p>
                            </div>
                        </FadeIn>
                    </div>
                </article>

                <section className="container mx-auto px-6 mt-24 max-w-4xl">
                    <div className={`border-t ${t('border-white/10', 'border-gray-200')} pt-12 flex justify-between items-center`}>
                        <NavLink to="/blog" className={`${mutedText} hover:${heading} flex items-center gap-2 transition-colors`}>
                            <ArrowLeft size={16} /> Back to Blog
                        </NavLink>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OxygenPost;
