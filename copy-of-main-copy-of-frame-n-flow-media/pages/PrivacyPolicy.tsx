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

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-background">
            <SEO
                title="Privacy Policy | Frame n Flow Media"
                description="Privacy Policy for Frame n Flow Media. Learn how we collect, use, and protect your personal information."
                canonical="/privacy-policy"
            />

            <div className="container mx-auto px-6 max-w-4xl pb-24">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Privacy Policy</h1>
                    <p className="text-white/50 mb-12">Last Updated: February 2026</p>
                </FadeIn>

                <div className="space-y-12 text-white/70 leading-relaxed">
                    <FadeIn delay={0.1}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p>
                                Frame n Flow Media ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                            <p className="mb-4">We may collect the following types of information:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Contact information (name, email address, phone number)</li>
                                <li>Business information (company name, industry, website)</li>
                                <li>Usage data (pages visited, time spent, browser type)</li>
                                <li>Communication preferences and feedback</li>
                            </ul>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">We use the collected information for:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Providing and improving our services</li>
                                <li>Responding to inquiries and support requests</li>
                                <li>Sending marketing communications (with your consent)</li>
                                <li>Analyzing website usage and performance</li>
                                <li>Complying with legal obligations</li>
                            </ul>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                            <p className="mb-4">
                                We may use third-party services for analytics, payment processing, and communication. These services have their own privacy policies:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Google Analytics</li>
                                <li>Calendly (for appointment scheduling)</li>
                                <li>Supabase (for data storage)</li>
                            </ul>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.6}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access your personal data</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Lodge a complaint with a supervisory authority</li>
                            </ul>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.7}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
                            <p>
                                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.8}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                            <p>
                                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
                            </p>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.9}>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                            <p>
                                If you have any questions about this privacy policy or our data practices, please contact us through our website's contact page.
                            </p>
                        </section>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
