import React, { useState, useEffect } from 'react';
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full">
            
            {/* LEFT SLOT: LOGO */}
            <div className="flex justify-start items-center">
              <NavLink to="/" className="z-50 relative group inline-block">
                <img 
                  src="https://img.sanishtech.com/u/0128afc80d3ab9715e398979f70f1b8a.png" 
                  alt="Frame n Flow Logo" 
                  className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </NavLink>
            </div>

            {/* MIDDLE SLOT: NAV LINKS (Centered) */}
            <nav className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={({ isActive }) => 
                    `text-[9px] lg:text-[10px] tracking-[0.2em] uppercase font-bold transition-colors relative hover:text-white whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-white/40'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute -bottom-2 left-0 right-0 h-px bg-accent"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT SLOT: CTA BUTTON + MOBILE TOGGLE */}
            <div className="flex justify-end items-center gap-4 md:gap-6">
              <div className="hidden md:block">
                <Button 
                  variant="primary" 
                  className="py-2 px-5 lg:px-6 text-[9px] lg:text-[10px] uppercase tracking-widest font-bold h-auto border-white/10"
                  onClick={handleBookCall}
                >
                  Book a Call
                </Button>
              </div>

              {/* Mobile Toggle */}
              <button 
                className="md:hidden z-50 text-white relative w-10 h-10 flex items-center justify-center"
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
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center p-6"
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