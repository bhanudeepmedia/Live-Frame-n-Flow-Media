import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { NavLink } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogIndex: React.FC = () => {
    const BLOG_POSTS = [
        {
            title: "Why a Great Website Increases the Revenue of Your Business in 2026",
            excerpt: "Discover why investing in a professional website drives business revenue growth. Learn proven strategies and tools to boost conversions, credibility, and sales online.",
            date: "Feb 14, 2026",
            dateISO: "2026-02-14",
            author: "Frame n Flow Team",
            readTime: "10 min read",
            slug: "/blog/revenue-growth-2026",
            image: "/assets/blog/website-revenue-2026.png",
            category: "Business Growth"
        }
    ];

    const blogListSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Blog | Frame n Flow Media",
        "description": "Explore our latest articles on digital marketing, website development, AI automation, and revenue growth strategies for businesses across India, USA, UAE, and Europe.",
        "url": "https://framenflowmedia.in/blog/",
        "publisher": {
            "@type": "Organization",
            "name": "Frame n Flow Media",
            "url": "https://framenflowmedia.in",
            "logo": { "@type": "ImageObject", "url": "https://framenflowmedia.in/favicon.png" }
        },
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": BLOG_POSTS.map((post, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": `https://framenflowmedia.in${post.slug}/`,
                "name": post.title
            }))
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20 font-sans text-white">
            <SEO
                title="Blog | Frame n Flow Media - Insights & Strategies"
                description="Explore our latest articles on digital marketing, website development, AI automation, and revenue growth strategies for businesses across India, USA, UAE, and Europe."
                canonical="/blog"
                schema={blogListSchema}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Insights & <span className="text-accent">Growth</span> Strategies
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                            Deep dives into the mechanics of modern business growth. From AI implementation to conversion optimization.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                        >
                            <NavLink to={post.slug} className="relative aspect-video overflow-hidden block">
                                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                                    }}
                                />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-white/80 z-20">
                                    {post.category}
                                </div>
                            </NavLink>

                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-white/40 font-mono uppercase tracking-widest mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <NavLink to={post.slug} className="group-hover:text-accent transition-colors">
                                    <h2 className="text-xl md:text-2xl font-bold font-display mb-3 leading-tight line-clamp-2">
                                        {post.title}
                                    </h2>
                                </NavLink>
                                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <NavLink
                                        to={post.slug}
                                        className="inline-flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-2 transition-all gap-1"
                                    >
                                        Read Article <ArrowRight size={16} />
                                    </NavLink>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default BlogIndex;
