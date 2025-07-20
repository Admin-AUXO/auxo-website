'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';
import { staggerContainer, sectionVariants } from '@/lib/animations';
import { siteContent } from '@/lib/constants';

// Lazy load new emotional progression animation
const FrameworkBuildAnimation = lazy(() => import('@/components/ui/FrameworkBuildAnimation'));

export default function FrameworkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="framework" 
      ref={ref} 
      className="py-32 bg-gradient-to-b from-gray-900 via-petrol-ink/30 to-slate-900 relative overflow-hidden"
      aria-label="AUXO framework and methodology"
      role="region"
    >
      {/* New Emotional Progression Animation - Systematic Assembly */}
      <Suspense 
        fallback={
          <div 
            className="absolute inset-0 bg-gradient-to-br from-petrol-ink/20 to-dark-bg"
            aria-hidden="true"
          />
        }
      >
        <FrameworkBuildAnimation />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          {/* Eyebrow text */}
          <motion.p
            variants={sectionVariants}
            className="text-auxo-green text-sm md:text-base font-semibold uppercase tracking-wider mb-4"
          >
            {siteContent.framework.eyebrow}
          </motion.p>

          <motion.h2 
            variants={sectionVariants}
            className="text-4xl md:text-6xl font-bold text-pure-white mb-8 font-montserrat"
          >
            {siteContent.framework.headline}
          </motion.h2>
          
          <motion.p 
            variants={sectionVariants}
            className="text-xl text-limestone leading-relaxed font-montserrat max-w-4xl mx-auto"
          >
            {siteContent.framework.subheadline}
          </motion.p>
        </motion.div>

        {/* Framework Pillars - Modular Design */}
        <div className="space-y-16">
          {siteContent.framework.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Pillar Number & Visual */}
              <div className="flex-shrink-0">
                <motion.div
                  className="relative w-32 h-32 bg-gradient-to-br from-auxo-green to-auxo-green/70 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl font-bold text-rich-black">{pillar.number}</span>
                  
                  {/* Connecting line to next pillar */}
                  {index < siteContent.framework.pillars.length - 1 && (
                    <motion.div
                      className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-auxo-green/30"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: "4rem" } : { height: 0 }}
                      transition={{ delay: index * 0.3 + 0.8, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Pillar Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-pure-white mb-2">
                  {pillar.title}
                </h3>
                <h4 className="text-lg font-medium text-auxo-green mb-4">
                  {pillar.subtitle}
                </h4>
                <p className="text-lg text-limestone leading-relaxed mb-6">
                  {pillar.description}
                </p>
                
                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {pillar.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefitIndex}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.3 + benefitIndex * 0.1 + 0.8, duration: 0.4 }}
                    >
                      <div className="w-2 h-2 bg-auxo-green rounded-full flex-shrink-0" />
                      <span className="text-limestone text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Services */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {pillar.services.map((service, serviceIndex) => (
                    <motion.span
                      key={serviceIndex}
                      className="px-4 py-2 bg-dark-bg border border-auxo-green/30 rounded-full text-sm text-auxo-green"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: index * 0.3 + serviceIndex * 0.1 + 1, duration: 0.4 }}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(154, 205, 50, 0.6)' }}
                    >
                      {service}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Framework Integration Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-petrol-ink/20 via-petrol-ink/10 to-petrol-ink/20 rounded-2xl p-8 border border-petrol-ink/30 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-pure-white mb-4">
              {siteContent.framework.closingStatement}
            </h3>
            <p className="text-limestone text-lg max-w-3xl mx-auto">
              {siteContent.framework.closingDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}