'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { siteContent } from '@/lib/constants';
import {
  staggerContainer,
  sectionVariants,
  impactSlideVariants,
  impactSlideTransition
} from '@/lib/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Lazy load new emotional progression animation
const ImpactFlowAnimation = lazy(() => import('@/components/ui/ImpactFlowAnimation'));



// Single Impact Story Component with Smooth Carousel
function ImpactStory({ story, direction }: {
  story: (typeof siteContent.impact.stories)[number];
  direction: number;
}) {
  return (
    <motion.div
      key={story.id}
      custom={direction}
      variants={impactSlideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={impactSlideTransition}
      className="absolute inset-0 w-full flex items-center justify-center"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className={`bg-gradient-to-br ${story.color} backdrop-blur-sm border border-auxo-green/20 rounded-3xl p-8 md:p-12 relative overflow-hidden`}>

          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-auxo-green/5 via-transparent to-petrol-ink/5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Industry badge */}
          <motion.div
            className="inline-block px-4 py-2 bg-auxo-green/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-auxo-green text-sm font-semibold uppercase tracking-wider">
              {story.industry}
            </span>
          </motion.div>

          {/* Client name */}
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-pure-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {story.client}
          </motion.h3>

          {/* Challenge & Outcome */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h4 className="text-auxo-green text-sm font-semibold uppercase tracking-wider mb-3">
                Challenge
              </h4>
              <p className="text-limestone/90 text-lg leading-relaxed">
                {story.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h4 className="text-auxo-green text-sm font-semibold uppercase tracking-wider mb-3">
                Outcome
              </h4>
              <p className="text-pure-white text-lg font-medium leading-relaxed">
                {story.outcome}
              </p>
            </motion.div>
          </div>

          {/* Key Metrics */}
          <motion.div
            className="grid grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {story.keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-petrol-ink/30 rounded-2xl border border-auxo-green/10 hover:border-auxo-green/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-auxo-green mb-2">
                  {metric.value}
                </div>
                <div className="text-limestone text-sm font-medium uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Success indicator */}
          <motion.div
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-auxo-green/60 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-auxo-green/40 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % siteContent.impact.stories.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const nextStory = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % siteContent.impact.stories.length);
  };

  const prevStory = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + siteContent.impact.stories.length) % siteContent.impact.stories.length);
  };

  return (
    <section 
      id="impact" 
      ref={ref} 
      className="py-24 bg-gradient-to-b from-slate-900 via-gray-800 to-rich-black relative overflow-hidden"
      aria-label="Client success stories and impact metrics"
      role="region"
    >
      {/* New Emotional Progression Animation - Success Streams */}
      <Suspense 
        fallback={
          <div 
            className="absolute inset-0 bg-gradient-to-r from-dark-bg via-petrol-ink/10 to-dark-bg"
            aria-hidden="true"
          />
        }
      >
        <ImpactFlowAnimation />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={sectionVariants}
            className="text-auxo-green text-sm md:text-base font-semibold uppercase tracking-wider mb-4"
          >
            {siteContent.impact.eyebrow}
          </motion.p>

          <motion.h2
            variants={sectionVariants}
            className="text-4xl md:text-6xl font-bold text-pure-white mb-8 font-montserrat"
          >
            {siteContent.impact.headline}
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            className="text-xl text-limestone leading-relaxed font-montserrat max-w-4xl mx-auto"
          >
            {siteContent.impact.subheadline}
          </motion.p>

          {/* Animated divider */}
          <motion.div
            className="relative mx-auto mt-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: "8rem" } : { width: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="h-1 bg-gradient-to-r from-auxo-green to-petrol-ink rounded-full" />
            <motion.div
              className="absolute inset-0 h-1 bg-auxo-green/50 rounded-full"
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Impact Story Carousel */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 -ml-4">
            <motion.button
              onClick={prevStory}
              className="w-12 h-12 bg-auxo-green/20 hover:bg-auxo-green/30 rounded-full flex items-center justify-center border border-auxo-green/30 hover:border-auxo-green/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-auxo-green" />
            </motion.button>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 -mr-4">
            <motion.button
              onClick={nextStory}
              className="w-12 h-12 bg-auxo-green/20 hover:bg-auxo-green/30 rounded-full flex items-center justify-center border border-auxo-green/30 hover:border-auxo-green/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-auxo-green" />
            </motion.button>
          </div>

          {/* Story Display */}
          <div className="min-h-[500px] flex items-center justify-center relative">
            <AnimatePresence mode="wait" custom={direction}>
              <ImpactStory
                key={siteContent.impact.stories[activeIndex].id}
                story={siteContent.impact.stories[activeIndex]}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {siteContent.impact.stories.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-auxo-green scale-125'
                  : 'bg-auxo-green/30 hover:bg-auxo-green/50'
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-limestone/95 via-limestone/90 to-limestone/95 rounded-3xl p-10 border border-limestone/50 backdrop-blur-sm overflow-hidden max-w-4xl mx-auto">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-rich-black mb-4">
                {siteContent.impact.closingStatement}
              </h3>
              <p className="text-graphite text-lg md:text-xl leading-relaxed">
                {siteContent.impact.closingDescription}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}