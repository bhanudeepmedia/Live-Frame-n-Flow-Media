import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/Button';

const WebsiteTerms: React.FC = () => {
  const terms = [
    { title: "Domain Registration", detail: "One free domain is provided based on availability. Premimum or auctioned domains incur separate charges. If you already own a domain, we will connect it to the new hosting." },
    { title: "Hosting & Maintenance", detail: "Hosting is provided free for the first year. From the second year onwards, the renewal cost is ₹4,500/year, which includes hosting and basic security maintenance." },
    { title: "Payment Structure", detail: "A non-refundable 50% upfront payment is required to initiate the project. The remaining 50% balance must be cleared after the final preview and before the website goes live on the public domain." },
    { title: "Revisions", detail: "This offer includes exactly ONE (1) round of revision. Any additional revision cycles or major design changes after the first revision will be billed at ₹1,500 per cycle." },
    { title: "Delivery Timeline", detail: "Standard delivery is 7–10 working days from the date of final design approval and receipt of all required content (images, logos, text) from the client." },
    { title: "Custom Features", detail: "Complex/custom requirements such as AI integrations, advanced chatbots, multi-vendor marketplaces, or specific custom app functionality are not included in the ₹10,000 package and require a separate quotation." },
    { title: "Content Responsibility", detail: "The client is responsible for providing all business-specific content, including high-resolution logos, brand images, and text. We provide basic copy optimization, but not full copywriting services." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-background py-32 px-6">
      <SEO 
        title="Terms & Conditions | ₹10,000 Website Offer | Frame n Flow Media"
        description="Full terms and conditions for the Frame n Flow Media ₹10,000 website development offer. Details on domain, hosting, renewals, and payment terms."
        noindex={true} // T&C pages usually don't need to be indexed heavily
      />

      <div className="container mx-auto max-w-3xl">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-12"
        >
          <NavLink 
            to="/offers/website-10k" 
            className="group inline-flex items-center space-x-3 text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono uppercase tracking-widest font-bold">Back to Offer</span>
          </NavLink>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <FileText className="text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Offer Terms</h1>
          </div>
          <p className="text-lg text-white/50 font-light leading-relaxed">
            Please review the full details of our India Domestic Special offer. Transparency is core to how we operate at Frame n Flow Media.
          </p>
        </motion.div>

        <div className="space-y-8">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start space-x-6">
                 <div className="flex-shrink-0 mt-1">
                   <CheckCircle2 size={18} className="text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="space-y-3">
                   <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{term.title}</h3>
                   <p className="text-white/40 font-light leading-relaxed">{term.detail}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-2xl bg-accent/5 border border-accent/20 text-center"
        >
          <p className="text-white/60 mb-8 font-light italic">
            By proceeding with the payment, you agree to all the terms mentioned above.
          </p>
          <Button 
            className="px-10"
            onClick={() => window.open("https://wa.me/919963844853?text=Hi,%20I've%20read%20the%20terms%20and%20want%20to%20proceed%20with%20the%20₹10,000%20Website%20Offer.", '_blank')}
          >
            Accept & Secure Offer
          </Button>
        </motion.div>

        <div className="mt-12 text-center text-white/20 text-[10px] font-mono uppercase tracking-widest">
           Last Updated: April 2026 • Dominance Always.
        </div>
      </div>
    </div>
  );
};

export default WebsiteTerms;
