import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Mail, Phone, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen px-6 pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Let's Talk Strategy.</h1>
            <p className="text-xl text-white/60 font-light mb-12 max-w-lg">
              Ready to stop guessing and start scaling? Schedule a direct session with our team to engineer your growth.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 text-accent border border-white/5">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-white/50">heyframenflowmedia@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 text-accent border border-white/5">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-white/50">+91 7702251899</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Wrapper */}
          <div className="flex flex-col gap-8">
            {/* Booking Block (Replaces Form) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-surfaceHighlight p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 border border-accent/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  <Calendar size={32} />
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Book a Strategy Call</h2>

                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  You will be receiving a free marketing audit from our business strategist, <strong>Bhanu Deep</strong>. We'll analyze your current funnel, identify leaks, and propose a roadmap for growth.
                </p>

                <div className="space-y-4 mb-10 bg-black/20 p-6 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-3 text-white/80">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
                    <span>15-Minute Deep Dive Session</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
                    <span>Competitor & Market Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
                    <span>Actionable Revenue Roadmap</span>
                  </div>
                </div>

                <Button
                  onClick={() => window.location.href = 'https://calendly.com/bhanudeep-workprofile/30min'}
                  fullWidth
                  className="group py-5 text-lg"
                >
                  Schedule Your Free Audit
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-white/30 text-xs mt-4">
                  Limited spots available for this month.
                </p>
              </div>
            </motion.div>

            {/* LeadConnector Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full bg-white rounded-lg overflow-hidden" // Added bg-white because iframes often assume light bg
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/yvyIgjYCipZNwlThBQEM"
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '4px', minHeight: '621px' }}
                id="inline-yvyIgjYCipZNwlThBQEM"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Marketing Form - Claim Offer"
                data-height="621"
                data-layout-iframe-id="inline-yvyIgjYCipZNwlThBQEM"
                data-form-id="yvyIgjYCipZNwlThBQEM"
                title="Marketing Form - Claim Offer"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;