'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';
import { siteContent } from '@/lib/constants';
import { staggerContainer, sectionVariants } from '@/lib/animations';
import SchedulingEmbed from '@/components/ui/SchedulingEmbed';

// Lazy load new emotional progression animation
const EngagementNetworkAnimation = lazy(() => import('@/components/ui/EngagementNetworkAnimation'));

export default function EngagementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="engagement" 
      ref={ref} 
      className="py-32 bg-gradient-to-b from-petrol-ink via-petrol-ink to-petrol-ink/95 relative overflow-hidden"
      aria-label="Schedule consultation and engagement"
      role="region"
    >
      {/* New Emotional Progression Animation - Neural Awakening */}
      <Suspense 
        fallback={
          <div 
            className="absolute inset-0 bg-gradient-to-br from-dark-bg to-petrol-ink/20"
            aria-hidden="true"
          />
        }
      >
        <EngagementNetworkAnimation />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            {siteContent.engagement.eyebrow}
          </motion.p>

          <motion.h2 
            variants={sectionVariants}
            className="text-4xl md:text-6xl font-bold text-pure-white mb-8 font-montserrat"
          >
            {siteContent.engagement.headline}
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            className="text-xl md:text-2xl text-auxo-green font-semibold mb-8 max-w-4xl mx-auto"
          >
            {siteContent.engagement.subheadline}
          </motion.p>
          
          <motion.p 
            variants={sectionVariants}
            className="text-xl text-pure-white/90 leading-relaxed font-montserrat max-w-4xl mx-auto mb-8"
          >
            {siteContent.engagement.bodyText}
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            variants={sectionVariants}
            className="flex flex-wrap justify-center items-center gap-8 mb-12"
          >
            {siteContent.engagement.trustIndicators.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-petrol-ink/50 px-4 py-2 rounded-full border border-auxo-green/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(154, 205, 50, 0.4)' }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-auxo-green font-medium text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content Grid - Adjusted for better calendar space */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Value Proposition (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-petrol-ink/50 backdrop-blur-sm rounded-2xl p-8 border border-auxo-green/20">
              <h3 className="text-2xl font-bold text-pure-white mb-6">
                What to Expect
              </h3>
              
              <div className="space-y-6">
                {siteContent.engagement.processSteps.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  >
                    <div className="w-8 h-8 bg-auxo-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-auxo-green font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-pure-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-pure-white/80 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial/Social Proof */}
            <motion.div
              className="bg-gradient-to-r from-auxo-green/10 via-auxo-green/5 to-auxo-green/10 rounded-2xl p-6 border border-auxo-green/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-auxo-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-auxo-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-pure-white italic mb-3 leading-relaxed">
                    &ldquo;{siteContent.engagement.socialProof.quote}&rdquo;
                  </p>
                  <div className="text-auxo-green font-medium">
                    — {siteContent.engagement.socialProof.attribution}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Scheduling Interface (3 columns for more space) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <SchedulingEmbed />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-petrol-ink/50 via-petrol-ink/30 to-petrol-ink/50 rounded-2xl p-8 border border-auxo-green/20 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-pure-white mb-4">
              {siteContent.engagement.urgencyStatement}
            </h3>
            <p className="text-limestone text-lg max-w-3xl mx-auto">
              {siteContent.engagement.urgencyDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}