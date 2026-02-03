import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

const TermsOfService: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-background">
            <SEO
                title="Terms of Service | Frame n Flow Media"
                description="Terms of Service for Frame n Flow Media. Read our terms and conditions for using our website and services."
                canonical="/terms-of-service"
            />

            <div className="container mx-auto px-6 max-w-4xl pb-24">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Terms of Service</h1>
                    <p className="text-white/50 mb-12">Last Updated: February 2026</p>
                </FadeIn>

                <div className="space-y-12 text-white/70 leading-relaxed">
                    <FadeIn delay={0.1}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the Frame n Flow Media website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
                            <p>
                                Frame n Flow Media provides marketing strategy, business intelligence, performance marketing, AI product visuals, and growth systems. The specific scope of services will be defined in individual service agreements with clients.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                            <p className="mb-4">When using our services, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the confidentiality of your account credentials</li>
                                <li>Use our services in compliance with applicable laws</li>
                                <li>Not engage in any activity that disrupts or interferes with our services</li>
                                <li>Respect intellectual property rights</li>
                            </ul>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                            <p>
                                All content, materials, and intellectual property created by Frame n Flow Media remain our property unless otherwise specified in a written agreement. Client-specific deliverables are governed by individual service contracts.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms</h2>
                            <p>
                                Payment terms, pricing, and billing cycles are specified in individual service agreements. Late payments may result in service suspension or termination.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.6}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                            <p>
                                Frame n Flow Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.7}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Service Modifications</h2>
                            <p>
                                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. We will provide reasonable notice of significant changes when possible.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.8}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
                            <p>
                                Either party may terminate services according to the terms specified in individual service agreements. We reserve the right to terminate access to our website for violations of these terms.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.9}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
                            <p>
                                These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={1.0}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
                            <p>
                                We may update these Terms of Service from time to time. Continued use of our services after changes constitutes acceptance of the modified terms.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={1.1}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
                            <p>
                                For questions about these Terms of Service, please contact us through our website's contact page.
                            </p>
                        </section>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
