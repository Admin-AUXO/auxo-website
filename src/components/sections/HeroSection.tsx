'use client';

import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { siteContent } from '../../lib/constants';
import { heroVariants, heroTextVariants, heroHeadlineVariants, buttonVariants } from '../../lib/animations';
import { trackPerformanceMetric } from '../../lib/performance';

// Lazy load new emotional progression animation
const HeroScatterAnimation = lazy(() => import('../ui/HeroScatterAnimation'));

/**
 * Props for the HeroSection component
 */
interface HeroSectionProps {
  /** Optional callback for CTA button click */
  onCTAClick?: () => void;
}

/**
 * Enhanced HeroSection component with performance optimizations
 * 
 * Features:
 * - Lazy-loaded animated background for better initial load performance
 * - Performance tracking for user interactions
 * - Optimized animations with Framer Motion
 * - Accessibility improvements
 * - Responsive design with mobile-first approach
 * 
 * @param props - HeroSection component props
 * @returns Hero section with optimized performance and animations
 */
export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  /**
   * Handle CTA button click with performance tracking
   */
  const handleCTAClick = () => {
    const startTime = performance.now();
    
    if (onCTAClick) {
      onCTAClick();
    } else {
      // Default behavior: scroll to challenge section
      if (typeof window !== 'undefined') {
        const challengeSection = document.getElementById('challenge');
        if (challengeSection) {
          challengeSection.scrollIntoView({ behavior: 'smooth' });
          
          // Track scroll performance
          const scrollTime = performance.now() - startTime;
          trackPerformanceMetric('Hero CTA Scroll', scrollTime, 100);
        }
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section with main call to action"
      role="banner"
    >
      {/* New Emotional Progression Animation - Digital Scatter */}
      <Suspense 
        fallback={
          <div 
            className="absolute inset-0 bg-gradient-to-br from-rich-black via-graphite to-dark-bg"
            aria-hidden="true"
          />
        }
      >
        <HeroScatterAnimation />
      </Suspense>
      
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-headline - Executive positioning */}
        <motion.p
          className="text-auxo-green text-sm md:text-base font-semibold uppercase tracking-wider mb-6"
          variants={heroTextVariants}
        >
          {siteContent.hero.preHeadline}
        </motion.p>

        {/* Main headline with enhanced typography */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-pure-white uppercase tracking-tight mb-8 leading-tight"
          variants={heroHeadlineVariants}
        >
          {siteContent.hero.headline}
        </motion.h1>

        {/* Sub-headline with better readability */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-limestone max-w-5xl mx-auto leading-relaxed mb-12 font-light"
          variants={heroTextVariants}
        >
          {siteContent.hero.subheadline}
        </motion.p>

        {/* Enhanced CTA with subtext */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          variants={buttonVariants}
        >
          <motion.button
            className="bg-auxo-green text-rich-black px-10 py-5 rounded-xl font-bold text-xl hover:bg-auxo-green/90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-auxo-green focus:ring-opacity-50 shadow-2xl hover:shadow-auxo-green/20"
            whileHover="hover"
            whileTap="tap"
            onClick={handleCTAClick}
            aria-label="Discover what you're missing - Schedule strategic assessment"
          >
            {siteContent.hero.ctaText}
          </motion.button>
          
          <motion.p
            className="text-limestone/80 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {siteContent.hero.ctaSubtext}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}