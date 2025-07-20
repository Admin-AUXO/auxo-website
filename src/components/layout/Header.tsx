'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import AuxoLogo from '../ui/AuxoLogo';
import { siteContent } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-auxo-green focus:ring-opacity-50 rounded-lg p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="AUXO Data Co. - Return to top"
            >
              <AuxoLogo size="md" />
              <span className="text-pure-white font-bold text-xl tracking-tight">
                {siteContent.navigation.logo}
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {siteContent.navigation.menuItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-limestone hover:text-pure-white transition-colors duration-200 font-medium"
                  whileHover={{ y: -2 }}
                  title={item.description}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#engagement"
                className="bg-auxo-green text-rich-black px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {siteContent.navigation.ctaButton}
              </motion.a>
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-auxo-green focus:ring-opacity-50"
              onClick={() => setIsMobileMenuOpen(true)}
              whileTap={{ scale: 0.95 }}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-limestone" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-dark-bg/90 backdrop-blur-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
               <div className="flex justify-end mb-8">
                <motion.button
                  onClick={closeMenu}
                  whileTap={{ scale: 0.95 }}
                  className="p-2"
                  aria-label="Close navigation menu"
                >
                  <X className="w-8 h-8 text-limestone" />
                </motion.button>
              </div>

              <nav className="flex flex-col items-center space-y-8">
                {siteContent.navigation.menuItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="text-2xl text-limestone hover:text-pure-white transition-colors duration-200 font-semibold"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + siteContent.navigation.menuItems.indexOf(item) * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#engagement"
                  onClick={closeMenu}
                  className="mt-4 bg-auxo-green text-rich-black px-8 py-3 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-all duration-200"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + siteContent.navigation.menuItems.length * 0.1 }}
                >
                  {siteContent.navigation.ctaButton}
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}