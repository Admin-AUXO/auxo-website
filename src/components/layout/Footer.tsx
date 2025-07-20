'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense, lazy } from 'react';
import AuxoLogo from '../ui/AuxoLogo';
import { staggerContainer, sectionVariants } from '@/lib/animations';
import { siteContent } from '@/lib/constants';

// Lazy load new emotional progression animation
const FooterFoundationAnimation = lazy(() => import('../ui/FooterFoundationAnimation'));

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer 
      className="relative bg-gradient-to-b from-petrol-ink to-rich-black text-pure-white py-20 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer with contact information and navigation"
    >
      {/* New Emotional Progression Animation - Digital Bedrock */}
      <Suspense 
        fallback={
          <div 
            className="absolute inset-0 bg-gradient-to-t from-petrol-ink to-dark-bg"
            aria-hidden="true"
          />
        }
      >
        <FooterFoundationAnimation />
      </Suspense>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={sectionVariants}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <AuxoLogo size="lg" />
            <span className="text-pure-white font-bold text-2xl tracking-tight">
              {siteContent.footer.companyName}
            </span>
          </motion.div>
          
          <motion.p 
            variants={sectionVariants}
            className="text-limestone text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {siteContent.footer.tagline}
          </motion.p>
          
          <motion.p 
            variants={sectionVariants}
            className="text-limestone/80 text-base max-w-2xl mx-auto mb-8"
          >
            {siteContent.footer.description}
          </motion.p>
          
          {/* Call to Action */}
          <motion.div
            variants={sectionVariants}
            className="mb-12"
          >
            <motion.a
              href="#hero"
              className="inline-flex items-center px-8 py-4 bg-auxo-green text-rich-black font-semibold rounded-lg hover:bg-auxo-green/90 transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {siteContent.footer.ctaText}
              <motion.svg
                className="ml-3 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {siteContent.footer.navigationLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              variants={sectionVariants}
              className="text-limestone hover:text-auxo-green transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div variants={sectionVariants} className="space-y-4">
            <motion.a
              href={`mailto:${siteContent.footer.contactEmail}`}
              className="block text-limestone hover:text-auxo-green transition-colors duration-200 text-lg"
              whileHover={{ scale: 1.05 }}
            >
              {siteContent.footer.contactEmail}
            </motion.a>
            <motion.a
              href={siteContent.footer.privacyLink}
              className="block text-limestone hover:text-auxo-green transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-graphite/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
            <p className="text-limestone text-sm">
              © {currentYear} {siteContent.footer.companyName}. All rights reserved.
            </p>
            <p className="text-limestone text-sm font-medium">
              {siteContent.footer.taglineBottom}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}