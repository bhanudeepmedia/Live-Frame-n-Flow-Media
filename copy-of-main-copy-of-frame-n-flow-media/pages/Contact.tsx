import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Mail, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

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

              <a
                href="https://wa.me/917702251899"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 group hover:bg-white/5 p-2 -ml-2 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 text-[#25D366] border border-white/5 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">WhatsApp Us</h4>
                  <p className="text-white/50 group-hover:text-white transition-colors">Directly DM on WhatsApp</p>
                </div>
              </a>
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