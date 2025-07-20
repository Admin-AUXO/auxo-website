import { Variants } from "framer-motion";

/**
 * Optimized Animation System
 * 
 * Consolidated Framer Motion variants and transitions for better performance
 * Focused on essential animations only - complex background animations moved to new system
 */

// ========================================
// HERO SECTION VARIANTS
// ========================================

export const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const heroHeadlineVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

// ========================================
// UNIVERSAL ANIMATION VARIANTS
// ========================================

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

export const lineVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export const pillarContentVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ========================================
// IMPACT SECTION CAROUSEL
// ========================================

export const impactSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
  })
};

export const impactSlideTransition = {
  x: { type: "spring" as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.4 },
  scale: { duration: 0.4 },
  rotateY: { duration: 0.4 }
};

export const impactBackgroundVariants = {
  constellation: {
    scale: [1, 1.8, 1],
    opacity: [0.2, 0.8, 0.2],
    rotate: [0, 180, 360],
  },
  orbitalRing: {
    scale: [1, 3, 1],
    opacity: [0.3, 0, 0.3],
    rotate: [0, -360, 0],
  },
  successStream: {
    x: ['0%', '50%', '100%'],
    opacity: [0, 0.6, 0],
    scaleX: [0.5, 1, 0.5],
  },
  particle: {
    scale: [0, 1, 0],
    opacity: [0, 0.8, 0],
  },
  trajectory: {
    pathLength: [0, 1, 0],
    opacity: [0, 0.6, 0],
  },
  metricEcho: {
    opacity: [0, 0.15, 0.08, 0.15],
    scale: [0.5, 1.2, 0.8, 1],
    rotate: [0, 360, 0],
    y: [0, -30, 0, -20, 0],
  },
  successIndicator: {
    scale: [1, 2, 1],
    opacity: [0.3, 0.9, 0.3],
    boxShadow: [
      '0 0 0 0 rgba(154, 205, 50, 0.3)',
      '0 0 0 20px rgba(154, 205, 50, 0)',
      '0 0 0 0 rgba(154, 205, 50, 0.3)'
    ],
  }
};

// ========================================
// LEGACY COMPATIBILITY (TEMPORARY)
// These will be removed in task 2 when sections are updated
// ========================================

export const challengeBleedingAnimations = {
  bleedingStreams: () => ({ y: [0, 100, 0], opacity: [0.8, 0.2, 0.8], scaleY: [1, 1.5, 1] }),
  lostOpportunities: () => ({ x: [0, -200], opacity: [1, 0], rotate: [0, -45] }),
  costIndicators: () => ({ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }),
  hemorrhage: () => ({ y: [0, 150], opacity: [0.6, 0], scaleX: [1, 0.3] }),
};

export const challengeTransitions = {
  bleedingStreams: (index: number) => ({ 
    duration: 3 + Math.sin(index * 7) * 2, 
    repeat: Infinity, 
    delay: index * 0.3, 
    ease: "easeInOut" as const 
  }),
  lostOpportunities: (index: number) => ({ 
    duration: 4 + index * 0.5, 
    repeat: Infinity, 
    delay: index * 0.8, 
    ease: "easeOut" as const 
  }),
  costIndicators: (index: number) => ({ 
    duration: 2 + Math.sin(index * 11), 
    repeat: Infinity, 
    delay: index * 0.2, 
    ease: "easeInOut" as const 
  }),
  hemorrhage: (index: number) => ({ 
    duration: 2, 
    repeat: Infinity, 
    delay: index * 0.1, 
    ease: "easeIn" as const 
  }),
};

// ========================================
// TEMPORARY STUB EXPORTS FOR COMPATIBILITY
// These will be removed in task 2 when sections are updated
// ========================================

export const footerFoundationAnimations = {
  foundationGrid: (index: number) => ({ opacity: Math.abs(Math.sin(index * 61)) * 0.3 }),
  structuredData: () => ({ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }),
  foundationPillars: () => ({ scaleY: [0, 1], opacity: [0, 0.4] }),
  stabilityIndicators: () => ({ y: [0, -5, 0], opacity: [0.4, 0.7, 0.4] }),
};

export const engagementNeuralAnimations = {
  neuralConnections: () => ({ x: ['-100%', '200%'], opacity: [0, 0.8, 0] }),
  conversationBubbles: () => ({ opacity: [0, 0.2, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }),
  dataFlowParticles: (index: number) => ({ x: [0, Math.sin(index * 41) * 200 - 100], y: [0, Math.cos(index * 43) * 200 - 100], opacity: [0, 0.6, 0], scale: [0, 1, 0] }),
  hexagonalPattern: (index: number) => ({ opacity: Math.abs(Math.sin(index * 53)) * 0.3, rotate: 360 }),
  connectionNodes: () => ({ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }),
  nodeRipples: () => ({ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }),
};

export const engagementTransitions = {
  neuralConnections: (index: number) => ({ duration: 6 + Math.abs(Math.sin(index * 31)) * 3, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" as const }),
  conversationBubbles: (delay: number) => ({ duration: 4 + Math.abs(Math.sin(delay * 37)) * 2, repeat: Infinity, delay, ease: "easeInOut" as const }),
  dataFlowParticles: (index: number) => ({ duration: 8 + Math.abs(Math.sin(index * 47)) * 4, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" as const }),
  hexagonalPattern: (index: number) => ({ duration: 10 + Math.abs(Math.sin(index * 59)) * 5, delay: index * 0.05, repeat: Infinity, ease: "linear" as const }),
  connectionNodes: (delay: number) => ({ duration: 3, repeat: Infinity, delay, ease: "easeInOut" as const }),
  nodeRipples: (delay: number) => ({ duration: 3, repeat: Infinity, delay, ease: "easeOut" as const }),
};

export const frameworkBuildingAnimations = {
  buildingBlocks: (index: number) => ({ scale: [0, 1], opacity: [0, 1], rotate: [Math.sin(index * 13) * 360, 0] }),
  structureFormation: (index: number) => ({ x: [Math.sin(index * 17) * 200 - 100, 0], y: [Math.cos(index * 19) * 200 - 100, 0], rotate: [Math.sin(index * 23) * 180, 0] }),
  pillarConnections: () => ({ scaleX: [0, 1], opacity: [0, 0.8] }),
  structuralNodes: () => ({ scale: [0, 1], rotate: [45, 0] }),
  modularAssembly: (index: number) => ({ y: [50, 0], opacity: [0, 1], rotate: [Math.sin(index * 29) * 90, 0] }),
};

export const frameworkTransitions = {
  buildingBlocks: (index: number) => ({ duration: 1, delay: index * 0.01, ease: "easeOut" as const }),
  structureFormation: (index: number) => ({ duration: 1, delay: index * 0.01, ease: "easeOut" as const }),
  pillarConnections: (index: number) => ({ duration: 2, delay: index * 0.5 + 1, ease: "easeInOut" as const }),
  structuralNodes: (delay: number) => ({ duration: 0.6, delay, ease: "easeOut" as const }),
  modularAssembly: (index: number) => ({ duration: 0.8, delay: index * 0.1, ease: "easeOut" as const }),
};