'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/lib/constants';
import { pillarContentVariants } from '@/lib/animations';

interface PillarTabsProps {
  activePillar: string;
  onPillarChange: (pillar: string) => void;
}

export default function PillarTabs({ activePillar, onPillarChange }: PillarTabsProps) {
  const { pillars } = siteContent.framework;
  
  const activePillarData = pillars.find(pillar => pillar.id === activePillar);

  // Calculate the position for the animated line based on active pillar
  const getLinePosition = () => {
    const pillarIndex = pillars.findIndex(p => p.id === activePillar);
    const totalPillars = pillars.length;
    const percentage = ((pillarIndex + 1) / (totalPillars + 1)) * 100;
    return { left: `${percentage}%` };
  };

  return (
    <div className="w-full">
      {/* Pillar Navigation */}
      <div className="relative mb-12">
        <div className="flex justify-center space-x-8 md:space-x-16 lg:space-x-20">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => onPillarChange(pillar.id)}
              className={`relative text-lg md:text-xl font-semibold font-montserrat transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-auxo-green focus:ring-opacity-50 rounded px-2 py-1 ${
                activePillar === pillar.id 
                  ? 'text-auxo-green' 
                  : 'text-limestone hover:text-auxo-green'
              }`}
              aria-selected={activePillar === pillar.id}
              role="tab"
            >
              {pillar.title}
            </button>
          ))}
        </div>
        
        {/* Animated accent line */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-auxo-green"
          initial={false}
          animate={getLinePosition()}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ width: '60px', transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Pillar Content */}
      <div className="min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            variants={pillarContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center max-w-3xl"
          >
            <p className="text-lg md:text-xl text-limestone leading-relaxed font-montserrat">
              {activePillarData?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}