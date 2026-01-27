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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-transparent py-4 md:py-6'
          }`}
      >
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full">

            {/* LEFT SLOT: LOGO */}
            <div className="flex justify-start items-center">
              <NavLink to="/" className="z-50 relative group inline-block">
                <img
                  src="/logo.png"
                  alt="Frame n Flow Logo"
                  className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </NavLink>
            </div>

            {/* MIDDLE SLOT: NAV LINKS (Centered Glass Pill) */}
            <div className="hidden lg:flex items-center justify-center">
              <nav className="inline-flex items-center justify-center space-x-1 px-2 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-lg hover:border-white/20 transition-all duration-300">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-5 py-2.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 relative whitespace-nowrap overflow-hidden ${isActive
                        ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* RIGHT SLOT: CTA BUTTON + MOBILE TOGGLE */}
            <div className="flex justify-end items-center gap-4">
              <div className="hidden md:block">
                <Button
                  variant="primary"
                  className="!py-3 !px-8 text-[11px] uppercase tracking-widest font-bold h-auto border-white/20 hover:border-white/40"
                  onClick={handleBookCall}
                >
                  Book a Call
                </Button>
              </div>

              {/* Mobile Toggle */}
              <button
                className="lg:hidden z-[70] text-white relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-95 transition-all hover:bg-white/10"
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