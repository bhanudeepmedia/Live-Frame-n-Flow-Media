import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Quote, TrendingUp, Target, Brain } from 'lucide-react';

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

const Founder: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-background overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-1"
            >
                 <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">The Visionary</span>
                 <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                    The Mind Behind <br/> The Machine.
                 </h1>
                 <p className="text-xl text-white/60 font-light mb-8 max-w-lg leading-relaxed">
                    Meet Bhanu Deep. A strategist who believes that marketing without data is just art, and art without strategy is just noise.
                 </p>
                 <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>
                    Schedule a Strategy Call
                 </Button>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 md:order-2 relative"
            >
                 <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10 relative group">
                    <img 
                      src="https://img.sanishtech.com/u/f30f258d740556c62469e86b223d0dc9.png"
                      alt="Bhanu Deep"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop";
                      }} 
                      className="w-full h-full object-cover object-top transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                 </div>
                 {/* Decorative Elements */}
                 <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-accent/30 rounded-bl-3xl hidden md:block" />
                 <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-white/10 rounded-tr-3xl hidden md:block" />
            </motion.div>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="bg-surface py-24 border-y border-white/5 relative">
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
          <div className="container mx-auto px-6 max-w-4xl">
              <FadeIn>
                  <Quote className="text-accent mb-6 w-10 h-10 opacity-50" />
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 leading-snug">
                    "I started Frame n Flow Media because I was tired of seeing brilliant businesses fail due to <span className="text-white border-b-2 border-accent">poor visibility</span>."
                  </h2>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-white/60 font-light leading-relaxed">
                  <FadeIn delay={0.2}>
                      <p className="mb-6">
                        In the early days of my career, I noticed a recurring pattern. Companies were spending thousands on "pretty" content that generated zero revenue. They were chasing likes, not leads.
                      </p>
                      <p>
                        I realized that the agency model was broken. It was too focused on deliverables and not focused enough on outcomes.
                      </p>
                  </FadeIn>
                  <FadeIn delay={0.4}>
                      <p className="mb-6">
                        That's when I decided to build something different. An agency that combines <strong className="text-white">Business Intelligence</strong> with <strong className="text-white">Creative Excellence</strong>.
                      </p>
                      <p>
                        We don't just "make videos". We engineer assets that are designed psychologically and strategically to dominate a specific market segment.
                      </p>
                  </FadeIn>
              </div>
          </div>
      </div>

      {/* PHILOSOPHY SECTION */}
      <div className="py-24 container mx-auto px-6">
           <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold">The Core Philosophy</h2>
              <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
           </FadeIn>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FadeIn delay={0.1} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors group">
                   <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                       <Brain size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Logic Over Luck</h3>
                   <p className="text-white/50">
                       We don't guess. We audit, we research, and we execute based on data. Virality isn't an accident; it's an engineering problem.
                   </p>
               </FadeIn>

               <FadeIn delay={0.2} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors group">
                   <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                       <Target size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Precision Targeting</h3>
                   <p className="text-white/50">
                       A message to everyone is a message to no one. We define your avatar with surgical precision before we write a single word of copy.
                   </p>
               </FadeIn>

               <FadeIn delay={0.3} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors group">
                   <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-accent mb-6 group-hover:scale-100 transition-transform">
                       <TrendingUp size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Revenue First</h3>
                   <p className="text-white/50">
                       If it doesn't add to the bottom line, we don't do it. Every creative decision is mapped back to ROI.
                   </p>
               </FadeIn>
           </div>
      </div>
      
      {/* FINAL CTA */}
      <div className="py-24 bg-surfaceHighlight text-center px-6">
          <FadeIn>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Work directly with Bhanu.</h2>
              <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
                  I personally oversee the strategy for every client we partner with. Let's see if we're a good fit.
              </p>
              <Button onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}>
                  Book Your Discovery Call
              </Button>
          </FadeIn>
      </div>

    </div>
  );
};

export default Founder;