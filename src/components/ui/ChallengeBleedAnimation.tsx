'use client';

import { useEffect, useRef, useCallback } from 'react';

interface BleedParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  element: HTMLElement;
  isCounterFlow: boolean;
  lifetime: number;
  maxLifetime: number;
  trail: { x: number; y: number; opacity: number }[];
  pulsePhase: number;
  color: string;
}

interface ChallengeBleedAnimationProps {
  className?: string;
}

/**
 * Challenge Section: Premium Data Hemorrhage Animation
 * 
 * Emotional Goal: Executive-level urgency about hidden costs
 * 
 * Visual Feel: Like watching premium opportunities and capital drain away
 * through data fragmentation - sophisticated particle streams with currency
 * symbols, opportunity indicators, and dramatic loss visualization that
 * creates executive-level urgency without being overwhelming.
 */
export default function ChallengeBleedAnimation({ className = '' }: ChallengeBleedAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<BleedParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const backgroundPulseRef = useRef<HTMLDivElement | null>(null);
  const dataFragmentsRef = useRef<HTMLElement[]>([]);

  const PARTICLE_COUNT = 80;
  const SPAWN_RATE = 300; // milliseconds between spawns
  const COUNTER_FLOW_PROBABILITY = 0.12;
  const FLOW_SPEED_MIN = 0.8;
  const FLOW_SPEED_MAX = 2.8;
  const FADE_DISTANCE = 150;
  const TRAIL_LENGTH = 12;
  const DATA_FRAGMENT_COUNT = 15;

  const createDataFragment = useCallback((container: HTMLElement, index: number) => {
    const fragment = document.createElement('div');
    const symbols = ['$', '€', '£', '¥', '%', '△', '▲', '◆', '●', '■'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    fragment.className = 'absolute pointer-events-none data-fragment';
    fragment.textContent = symbol;
    fragment.style.cssText = `
      font-size: ${8 + Math.random() * 6}px;
      font-weight: bold;
      color: rgba(220, 38, 38, 0.4);
      left: ${Math.random() * container.offsetWidth}px;
      top: ${Math.random() * container.offsetHeight}px;
      transform: translate3d(0, 0, 0);
      will-change: transform, opacity;
      opacity: 0.3;
      font-family: 'Courier New', monospace;
    `;
    
    container.appendChild(fragment);
    return fragment;
  }, []);

  const createBleedParticle = useCallback((container: HTMLElement): BleedParticle => {
    const isCounterFlow = Math.random() < COUNTER_FLOW_PROBABILITY;
    const element = document.createElement('div');
    
    // Enhanced particle types for executive appeal
    const particleTypes = {
      loss: {
        sizes: [2, 3, 4, 5],
        colors: [
          'rgba(220, 38, 38, 0.9)', // Deep red - critical loss
          'rgba(239, 68, 68, 0.8)', // Bright red - urgent loss  
          'rgba(185, 28, 28, 0.7)', // Dark red - systemic loss
          'rgba(255, 87, 87, 0.6)'  // Light red - opportunity loss
        ],
        shapes: ['circle', 'diamond', 'square']
      },
      hope: {
        sizes: [3, 4, 5, 6],
        colors: [
          'rgba(154, 205, 50, 1.0)', // Bright auxo-green - strong hope
          'rgba(132, 204, 22, 0.9)', // Vibrant green - growth
          'rgba(101, 163, 13, 0.8)', // Deep green - stability
          'rgba(34, 197, 94, 0.7)'   // Emerald - prosperity
        ],
        shapes: ['circle', 'star', 'triangle']
      }
    };
    
    const type = isCounterFlow ? particleTypes.hope : particleTypes.loss;
    const size = type.sizes[Math.floor(Math.random() * type.sizes.length)];
    const color = type.colors[Math.floor(Math.random() * type.colors.length)];
    const shape = type.shapes[Math.floor(Math.random() * type.shapes.length)];
    
    element.className = 'absolute pointer-events-none premium-particle';
    
    // Create sophisticated particle shapes
    if (shape === 'diamond') {
      element.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, ${color}, ${color.replace('0.', '0.4')});
        transform: translate3d(0, 0, 0) rotate(45deg);
        will-change: transform, opacity;
        box-shadow: 0 0 ${size * 3}px ${color}, inset 0 0 ${size}px ${color.replace('0.', '0.2')};
        border-radius: 2px;
      `;
    } else if (shape === 'square') {
      element.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, ${color}, ${color.replace('0.', '0.3')});
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;
        box-shadow: 0 0 ${size * 2}px ${color};
        border-radius: 1px;
        border: 1px solid ${color.replace('0.', '0.6')};
      `;
    } else {
      element.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}, ${color.replace('0.', '0.3')});
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;
        box-shadow: 0 0 ${size * 2}px ${color};
        border-radius: 50%;
      `;
    }
    
    container.appendChild(element);

    const startY = isCounterFlow ? container.offsetHeight + 10 : -10;
    const speed = FLOW_SPEED_MIN + Math.random() * (FLOW_SPEED_MAX - FLOW_SPEED_MIN);
    const maxLifetime = isCounterFlow ? 5000 + Math.random() * 3000 : 10000 + Math.random() * 5000;

    return {
      x: Math.random() * container.offsetWidth,
      y: startY,
      vx: (Math.random() - 0.5) * 0.4, // Enhanced horizontal drift
      vy: isCounterFlow ? -speed : speed,
      opacity: isCounterFlow ? 0.8 + Math.random() * 0.2 : 0.6 + Math.random() * 0.3,
      size,
      element,
      isCounterFlow,
      lifetime: 0,
      maxLifetime,
      trail: [],
      pulsePhase: Math.random() * Math.PI * 2,
      color,
    };
  }, []);

  const createBackgroundPulse = useCallback((container: HTMLElement) => {
    const pulseElement = document.createElement('div');
    pulseElement.className = 'absolute inset-0 pointer-events-none';
    pulseElement.style.cssText = `
      background: 
        radial-gradient(ellipse at 20% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(185, 28, 28, 0.12) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(17, 17, 17, 0.8) 0%, 
          rgba(45, 45, 45, 0.6) 30%, 
          rgba(26, 26, 26, 0.9) 70%, 
          rgba(17, 17, 17, 0.8) 100%
        );
      opacity: 0.4;
      will-change: opacity;
    `;
    container.appendChild(pulseElement);
    backgroundPulseRef.current = pulseElement;

    // Create floating data fragments
    for (let i = 0; i < DATA_FRAGMENT_COUNT; i++) {
      dataFragmentsRef.current.push(createDataFragment(container, i));
    }
  }, [createDataFragment]);

  const updateParticles = useCallback((deltaTime: number, containerWidth: number, containerHeight: number) => {
    const time = Date.now();
    
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.lifetime += deltaTime;
      particle.pulsePhase += deltaTime * 0.003;
      
      // Update position with drift
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Add trail effect
      particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
      if (particle.trail.length > TRAIL_LENGTH) {
        particle.trail.shift();
      }

      // Boundary wrapping for horizontal drift
      if (particle.x < -10) particle.x = containerWidth + 10;
      if (particle.x > containerWidth + 10) particle.x = -10;

      // Pulsing effect
      const pulseIntensity = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
      
      // Calculate fade based on position and lifetime
      let fadeOpacity = particle.opacity * pulseIntensity;
      
      if (particle.isCounterFlow) {
        // Counter-flow particles fade as they move up
        const distanceFromBottom = containerHeight - particle.y;
        if (distanceFromBottom > FADE_DISTANCE) {
          fadeOpacity *= Math.max(0, 1 - (distanceFromBottom - FADE_DISTANCE) / FADE_DISTANCE);
        }
      } else {
        // Downward particles fade as they approach bottom
        const distanceFromBottom = containerHeight - particle.y;
        if (distanceFromBottom < FADE_DISTANCE) {
          fadeOpacity *= Math.max(0, distanceFromBottom / FADE_DISTANCE);
        }
      }

      // Lifetime-based fading
      const lifetimeRatio = particle.lifetime / particle.maxLifetime;
      if (lifetimeRatio > 0.6) {
        fadeOpacity *= Math.max(0, 1 - (lifetimeRatio - 0.6) / 0.4);
      }

      // Remove particles that are out of bounds or expired
      if (
        particle.y > containerHeight + 30 || 
        particle.y < -30 || 
        particle.lifetime > particle.maxLifetime ||
        fadeOpacity <= 0.01
      ) {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
        return false;
      }

      // Update DOM element with enhanced effects
      const finalScale = 0.8 + pulseIntensity * 0.4;
      particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${finalScale})`;
      particle.element.style.opacity = fadeOpacity.toString();
      
      // Dynamic glow intensity
      const glowIntensity = particle.isCounterFlow ? pulseIntensity * 1.5 : pulseIntensity;
      particle.element.style.boxShadow = `0 0 ${particle.size * 3 * glowIntensity}px ${particle.color}`;

      return true;
    });

    // Update background pulse
    if (backgroundPulseRef.current) {
      const pulsePhase = (time * 0.001) % 4;
      const intensity = Math.sin(pulsePhase * Math.PI * 0.5) * 0.2 + 0.3;
      backgroundPulseRef.current.style.opacity = intensity.toString();
    }
  }, []);

  const spawnParticles = useCallback((deltaTime: number) => {
    if (!containerRef.current) return;

    spawnTimerRef.current += deltaTime;
    
    if (spawnTimerRef.current >= SPAWN_RATE) {
      spawnTimerRef.current = 0;
      
      // Spawn 2-4 particles at once for streaming effect
      const spawnCount = 2 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < spawnCount; i++) {
        if (particlesRef.current.length < PARTICLE_COUNT) {
          setTimeout(() => {
            if (containerRef.current) {
              particlesRef.current.push(createBleedParticle(containerRef.current));
            }
          }, i * 100); // Stagger spawning slightly
        }
      }
    }
  }, [createBleedParticle]);

  const animate = useCallback((currentTime: number) => {
    if (!containerRef.current) return;

    const deltaTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    if (deltaTime > 0 && deltaTime < 100) { // Prevent large jumps
      updateParticles(deltaTime, containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      spawnParticles(deltaTime);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, spawnParticles]);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.className += ' bg-gradient-to-b from-red-900/20 via-gray-900 to-black';
      return;
    }

    // Clear existing particles and background
    particlesRef.current.forEach(particle => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    particlesRef.current = [];

    if (backgroundPulseRef.current && backgroundPulseRef.current.parentNode) {
      backgroundPulseRef.current.parentNode.removeChild(backgroundPulseRef.current);
    }

    // Create enhanced dark background with bleeding effect
    createBackgroundPulse(container);

    // Reset timers
    spawnTimerRef.current = 0;
    lastFrameTimeRef.current = performance.now();

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate, createBackgroundPulse]);

  useEffect(() => {
    initializeAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup particles
      particlesRef.current.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      particlesRef.current = [];
    };
  }, [initializeAnimation]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}