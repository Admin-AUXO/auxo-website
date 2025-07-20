'use client';

import { useEffect, useRef, useCallback } from 'react';
import { animationController, AnimationErrorHandler } from '@/lib/animationController';
import { ParticleSystem, generatePositions } from '@/lib/animationPrimitives';

interface AnimatedBackgroundProps {
  className?: string;
  sectionType?: 'hero' | 'challenge' | 'framework' | 'impact' | 'engagement' | 'footer';
}

/**
 * Optimized AnimatedBackground component using the new animation system
 * 
 * Features:
 * - Hardware-accelerated animations
 * - Automatic performance monitoring
 * - Reduced motion support
 * - Error handling with graceful fallbacks
 * - Memory-efficient particle systems
 */
export default function AnimatedBackground({ 
  className = '', 
  sectionType = 'hero' 
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const animationFrameRef = useRef<number>(0);

  const initializeSectionAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      applyStaticFallback();
      return;
    }

    switch (sectionType) {
      case 'hero':
        initializeHeroAnimation(container);
        break;
      case 'challenge':
        initializeChallengeAnimation(container);
        break;
      case 'framework':
        initializeFrameworkAnimation(container);
        break;
      case 'impact':
        initializeImpactAnimation(container);
        break;
      case 'engagement':
        initializeEngagementAnimation(container);
        break;
      case 'footer':
        initializeFooterAnimation(container);
        break;
      default:
        initializeHeroAnimation(container);
    }
  }, [sectionType]);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Initialize animation controller
      animationController.init();

      // Create section-specific animation
      initializeSectionAnimation();

      return () => {
        // Cleanup
        if (particleSystemRef.current) {
          particleSystemRef.current.cleanup();
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } catch (error) {
      AnimationErrorHandler.handleAnimationError(error as Error, sectionType);
    }
  }, [sectionType, initializeSectionAnimation]);

  const initializeHeroAnimation = (container: HTMLElement) => {
    // Create optimized particle system for hero section
    particleSystemRef.current = new ParticleSystem(container, {
      count: 60,
      colors: ['rgba(154, 205, 50, 0.4)', 'rgba(241, 241, 240, 0.3)'],
      size: { min: 2, max: 4 },
      speed: { min: 0.5, max: 1.5 },
      opacity: { min: 0.3, max: 0.8 },
      lifetime: 8000
    });

    // Create central pulse effect
    createCentralPulse(container);
    
    // Create ripple rings
    createRippleRings(container);
    
    // Start particle system
    particleSystemRef.current.start();
    
    // Spawn particles periodically
    const spawnParticles = () => {
      if (particleSystemRef.current) {
        const positions = generatePositions(3, Date.now());
        positions.forEach((pos, i) => {
          setTimeout(() => {
            if (particleSystemRef.current) {
              particleSystemRef.current.spawnParticle(
                pos.left * container.offsetWidth / 100,
                pos.top * container.offsetHeight / 100,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
              );
            }
          }, i * 200);
        });
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        setTimeout(spawnParticles, 2000);
      });
    };
    
    spawnParticles();
  };

  const initializeChallengeAnimation = (container: HTMLElement) => {
    // Create bleeding effect particles
    particleSystemRef.current = new ParticleSystem(container, {
      count: 35,
      colors: ['rgba(255, 107, 107, 0.4)', 'rgba(154, 205, 50, 0.3)'],
      size: { min: 1, max: 3 },
      speed: { min: 0.8, max: 2.0 },
      opacity: { min: 0.4, max: 0.8 },
      lifetime: 6000
    });

    particleSystemRef.current.start();
    
    // Create downward flowing streams
    const createBleedingStreams = () => {
      if (particleSystemRef.current) {
        for (let i = 0; i < 5; i++) {
          particleSystemRef.current.spawnParticle(
            Math.random() * container.offsetWidth,
            0,
            0,
            1 + Math.random() * 0.5
          );
        }
      }
      setTimeout(createBleedingStreams, 800);
    };
    
    createBleedingStreams();
  };

  const initializeFrameworkAnimation = (container: HTMLElement) => {
    // Create organized building blocks
    createBuildingBlocks(container);
  };

  const initializeImpactAnimation = (container: HTMLElement) => {
    // Create success flow particles
    particleSystemRef.current = new ParticleSystem(container, {
      count: 40,
      colors: ['rgba(154, 205, 50, 0.6)', 'rgba(255, 215, 0, 0.4)'],
      size: { min: 2, max: 5 },
      speed: { min: 0.3, max: 1.0 },
      opacity: { min: 0.5, max: 0.9 },
      lifetime: 10000
    });

    particleSystemRef.current.start();
    
    // Create flowing success streams
    const createSuccessStreams = () => {
      if (particleSystemRef.current) {
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2;
          particleSystemRef.current.spawnParticle(
            centerX + Math.cos(angle) * 100,
            centerY + Math.sin(angle) * 100,
            Math.cos(angle + Math.PI/2) * 0.5,
            Math.sin(angle + Math.PI/2) * 0.5
          );
        }
      }
      setTimeout(createSuccessStreams, 1500);
    };
    
    createSuccessStreams();
  };

  const initializeEngagementAnimation = (container: HTMLElement) => {
    // Create neural network connections
    createNeuralNetwork(container);
  };

  const initializeFooterAnimation = (container: HTMLElement) => {
    // Create stable foundation grid
    createFoundationGrid(container);
  };

  const createCentralPulse = (container: HTMLElement) => {
    const pulse = document.createElement('div');
    pulse.className = 'absolute top-1/2 left-1/2 w-4 h-4 bg-auxo-green/60 rounded-full transform -translate-x-1/2 -translate-y-1/2';
    pulse.style.cssText += `
      animation: pulse 3s ease-in-out infinite;
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      will-change: transform, opacity;
    `;
    container.appendChild(pulse);
  };

  const createRippleRings = (container: HTMLElement) => {
    for (let i = 0; i < 4; i++) {
      const ring = document.createElement('div');
      ring.className = 'absolute top-1/2 left-1/2 border border-auxo-green/20 rounded-full';
      ring.style.cssText = `
        width: ${(i + 1) * 100}px;
        height: ${(i + 1) * 100}px;
        left: calc(50% - ${(i + 1) * 50}px);
        top: calc(50% - ${(i + 1) * 50}px);
        animation: ripple 4s ease-out infinite;
        animation-delay: ${i * 0.8}s;
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;
      `;
      container.appendChild(ring);
    }
  };

  const createBuildingBlocks = (container: HTMLElement) => {
    const positions = generatePositions(25, 0);
    positions.forEach((pos, i) => {
      const block = document.createElement('div');
      block.className = 'absolute w-2 h-2 bg-auxo-green/40 rounded-sm';
      block.style.cssText = `
        left: ${pos.left}%;
        top: ${pos.top}%;
        animation: buildBlock 1s ease-out forwards;
        animation-delay: ${i * 0.05}s;
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(0);
        will-change: transform, opacity;
      `;
      container.appendChild(block);
    });
  };

  const createNeuralNetwork = (container: HTMLElement) => {
    // Create connection nodes
    const nodePositions = [
      { x: 20, y: 30 }, { x: 80, y: 25 }, { x: 30, y: 70 },
      { x: 70, y: 75 }, { x: 50, y: 50 }, { x: 15, y: 60 }
    ];
    
    nodePositions.forEach((pos, i) => {
      const node = document.createElement('div');
      node.className = 'absolute w-2 h-2 bg-auxo-green/60 rounded-full';
      node.style.cssText = `
        left: ${pos.x}%;
        top: ${pos.y}%;
        animation: nodeGlow 3s ease-in-out infinite;
        animation-delay: ${i * 0.5}s;
        transform: translate(-50%, -50%) translate3d(0, 0, 0);
        will-change: transform, opacity;
      `;
      container.appendChild(node);
    });
  };

  const createFoundationGrid = (container: HTMLElement) => {
    // Create stable grid pattern
    for (let i = 0; i < 20; i++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'absolute w-1 h-1 bg-petrol-ink/30 rounded-full';
      gridItem.style.cssText = `
        left: ${(i % 5) * 20 + 10}%;
        top: ${Math.floor(i / 5) * 25 + 20}%;
        animation: foundationPulse 5s ease-in-out infinite;
        animation-delay: ${i * 0.1}s;
        transform: translate3d(0, 0, 0);
        will-change: opacity;
      `;
      container.appendChild(gridItem);
    }
  };

  const applyStaticFallback = () => {
    if (!containerRef.current) return;
    
    const fallbackClasses = {
      hero: 'bg-gradient-to-br from-rich-black via-graphite to-dark-bg',
      challenge: 'bg-gradient-to-b from-rich-black to-dark-bg',
      framework: 'bg-gradient-to-br from-petrol-ink/20 to-dark-bg',
      impact: 'bg-gradient-to-r from-dark-bg via-petrol-ink/10 to-dark-bg',
      engagement: 'bg-gradient-to-br from-dark-bg to-petrol-ink/20',
      footer: 'bg-gradient-to-t from-petrol-ink to-dark-bg'
    };

    containerRef.current.className += ` ${fallbackClasses[sectionType]}`;
  };

  return (
    <>
      <div 
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.3; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes buildBlock {
          0% { transform: scale(0) rotate(45deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes nodeGlow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); }
        }
        
        @keyframes foundationPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}