'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, Suspense } from 'react';
import { siteContent } from '@/lib/constants';
import { staggerContainer, sectionVariants } from '@/lib/animations';
import { lazy } from 'react';

// Lazy load new emotional progression animation
const ChallengeBleedAnimation = lazy(() => import('@/components/ui/ChallengeBleedAnimation'));

export default function ChallengeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="challenge" 
      ref={ref} 
      className="py-32 bg-gradient-to-b from-rich-black via-red-950/20 to-gray-900 relative overflow-hidden"
      aria-label="Business challenges and data problems"
      role="region"
    >
      {/* New Emotional Progression Animation - Value Drain */}
      <Suspense 
        fallback={
          <div 
            className="absolute inset-0 bg-gradient-to-b from-rich-black to-dark-bg"
            aria-hidden="true"
          />
        }
      >
        <ChallengeBleedAnimation />
      </Suspense>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          {/* Eyebrow text */}
          <motion.p
            variants={sectionVariants}
            className="text-auxo-green text-sm md:text-base font-semibold uppercase tracking-wider mb-4"
          >
            {siteContent.challenge.eyebrow}
          </motion.p>

          <motion.h2 
            variants={sectionVariants}
            className="text-4xl md:text-6xl font-bold text-pure-white mb-6 font-montserrat leading-tight"
          >
            {siteContent.challenge.headline}
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            className="text-xl md:text-2xl text-auxo-green font-semibold mb-8 max-w-4xl mx-auto"
          >
            {siteContent.challenge.subheadline}
          </motion.p>
          
          <motion.div
            variants={sectionVariants}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-limestone leading-relaxed font-montserrat mb-8">
              {siteContent.challenge.bodyText}
            </p>
            
            {/* Animated emphasis */}
            <motion.div
              className="inline-flex items-center space-x-3 bg-auxo-green/10 px-6 py-3 rounded-full border border-auxo-green/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-3 h-3 bg-auxo-green rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-auxo-green font-semibold">
                {siteContent.challenge.emphasisText}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* The Real Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {siteContent.challenge.costBreakdown.items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-dark-bg/50 backdrop-blur-sm border border-limestone/20 rounded-xl p-6 hover:border-auxo-green/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="text-auxo-green text-sm font-semibold mb-2">{item.impact}</div>
              <h3 className="text-xl font-bold text-pure-white mb-3">{item.title}</h3>
              <p className="text-limestone leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* The Solution Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-petrol-ink/30 via-petrol-ink/20 to-petrol-ink/30 rounded-2xl p-8 border border-petrol-ink/40 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-pure-white mb-4">
              {siteContent.challenge.transitionText}
            </h3>
            <p className="text-limestone text-lg mb-6 max-w-3xl mx-auto">
              {siteContent.challenge.visionText}
            </p>
            <motion.div
              className="flex items-center justify-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-auxo-green font-semibold text-lg">See how we make this reality</span>
              <motion.svg
                className="w-6 h-6 text-auxo-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}