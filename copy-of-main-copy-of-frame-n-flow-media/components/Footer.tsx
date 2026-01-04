import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Instagram, Linkedin, Youtube, ArrowUpRight, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const processSteps = [
    "Market Research",
    "Sonic Branding",
    "AI Visuals",
    "Growth Strategy",
    "Revenue Engines",
    "Market Dominance",
    "Performance Marketing",
    "Business Intelligence"
  ];

  // Duplicate for seamless scroll
  const marqueeText = [...processSteps, ...processSteps];

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 relative overflow-hidden z-20">
      
      {/* SCROLLING MARQUEE SECTION */}
      <div className="py-16 md:py-24 border-b border-white/10 overflow-hidden flex relative z-10 bg-background/50 backdrop-blur-sm transform-gpu">
        <motion.div 
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {marqueeText.map((step, index) => (
             <div key={index} className="flex items-center mx-6 md:mx-10 group cursor-default">
                <span className="text-5xl md:text-8xl font-display font-bold text-transparent stroke-text hover:text-white transition-colors duration-500 uppercase tracking-tight">
                  {step}
                </span>
                <span className="ml-12 md:ml-20 text-accent/50 text-3xl md:text-5xl group-hover:text-accent transition-colors">→</span>
             </div>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM CONTENT SECTION */}
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-12">
            
            {/* Left Side: Brand + Socials */}
            <div className="space-y-8 md:space-y-10 transform-gpu">
                <div>
                   <h2 className="text-3xl font-display font-bold text-white mb-3">Frame n Flow Media</h2>
                   <p className="text-white/40 text-base max-w-sm font-light leading-relaxed">
                     We bridge the gap between creative chaos and business logic. Strategy first. Execution second. Dominance always.
                   </p>
                </div>
                
                {/* Social Icons - Circular Style */}
                <div className="flex gap-4">
                    <a href="https://www.youtube.com/@framenflowmedia" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 group border border-white/10 relative overflow-hidden">
                        <Youtube size={22} className="relative z-10 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://www.instagram.com/framenflowmedia/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 group border border-white/10 relative overflow-hidden">
                        <Instagram size={22} className="relative z-10 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://www.linkedin.com/company/frame-n-flow-media/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 group border border-white/10 relative overflow-hidden">
                        <Linkedin size={22} className="relative z-10 group-hover:scale-110 transition-transform" />
                    </a>
                     <a href="https://www.facebook.com/profile.php?id=61585218869613" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 group border border-white/10 relative overflow-hidden">
                        <Facebook size={22} className="relative z-10 group-hover:scale-110 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Right Side: Navigation Links */}
            <div className="w-full md:w-auto">
                <nav className="flex flex-wrap gap-x-8 gap-y-6 justify-start md:justify-end max-w-3xl">
                    {NAV_ITEMS.map((item) => (
                        <NavLink 
                            key={item.path} 
                            to={item.path}
                            onClick={handleLinkClick}
                            className={({ isActive }) => 
                                `font-display font-medium text-lg md:text-xl transition-all flex items-center group relative pr-8 ${
                                    isActive ? 'text-white' : 'text-white/50 hover:text-accent'
                                }`
                            }
                        >
                            {item.label}
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-accent">
                                <ArrowUpRight size={18} />
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-xs font-mono uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Frame n Flow Media. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30 mix-blend-screen">
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
          <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>
    </footer>
  );
};

export default Footer;