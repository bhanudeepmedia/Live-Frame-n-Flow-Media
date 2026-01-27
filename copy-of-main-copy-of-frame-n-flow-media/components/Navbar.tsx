import React, { useState, useEffect } from 'react'; // v2026-01-18-force-rebuild
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleBookCall = () => {
    window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min';
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-0 pt-4 md:pt-6 transition-all duration-500 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-7xl mx-auto rounded-full border transition-all duration-500 flex items-center shadow-2xl ${isScrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 py-3 px-6 md:px-8'
            : 'bg-black/20 backdrop-blur-lg border-white/5 py-3 px-6 md:px-8'
            }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full">

            {/* LEFT SLOT: LOGO */}
            <div className="flex justify-start items-center">
              <NavLink to="/" className="z-50 relative group inline-block">
                <img
                  src="/logo.png"
                  alt="Frame n Flow Logo"
                  className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </NavLink>
            </div>

            {/* MIDDLE SLOT: NAV LINKS (Centered) */}
            <nav className="hidden md:flex items-center justify-center space-x-8 lg:space-x-10">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-[10px] lg:text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 relative hover:text-white whitespace-nowrap ${isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent shadow-[0_0_10px_rgba(34,211,238,0.5)] rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT SLOT: CTA BUTTON + MOBILE TOGGLE */}
            <div className="flex justify-end items-center gap-4">
              <div className="hidden md:block">
                <Button
                  variant="primary"
                  className="py-2.5 px-6 text-[10px] uppercase tracking-widest font-bold h-auto rounded-full bg-white text-black hover:bg-white/90 border-0 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  onClick={handleBookCall}
                >
                  Book a Call
                </Button>
              </div>

              {/* Mobile Toggle */}
              <button
                className="md:hidden z-[70] text-white relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-95 transition-all"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col space-y-8 text-center w-full max-w-xs">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-3xl font-display font-light ${isActive ? 'text-white' : 'text-white/50'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + NAV_ITEMS.length * 0.1, duration: 0.5, ease: "easeOut" }}
                className="pt-8"
              >
                <Button
                  fullWidth
                  onClick={handleBookCall}
                  className="py-5"
                >
                  Book a Call
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;