'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  element: HTMLElement;
  pulsePhase: number;
  clusterTarget?: { x: number; y: number };
}

interface HeroScatterAnimationProps {
  className?: string;
}

/**
 * Hero Section: Digital Scatter Animation
 * 
 * Emotional Goal: Create productive anxiety that motivates action
 * 
 * Visual Feel: Data fragments float and drift like digital snow, 
 * occasionally forming glimpses of patterns before dissolving.
 * Creates mesmerizing yet unsettling effect of opportunities slipping away.
 */
export default function HeroScatterAnimation({ className = '' }: HeroScatterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const PARTICLE_COUNT = 65;
  const CLUSTER_PROBABILITY = 0.15;
  const PULSE_INTERVAL = 3500;
  const DRIFT_SPEED = 0.3;
  const CLUSTER_STRENGTH = 0.02;

  const createParticle = useCallback((container: HTMLElement, index: number): Particle => {
    const element = document.createElement('div');
    element.className = 'absolute rounded-full pointer-events-none';
    element.style.cssText = `
      width: ${2 + Math.random() * 2}px;
      height: ${2 + Math.random() * 2}px;
      background: ${Math.random() > 0.6 ? 'rgba(154, 205, 50, 0.4)' : 'rgba(241, 241, 240, 0.3)'};
      transform: translate3d(0, 0, 0);
      will-change: transform, opacity;
    `;
    
    container.appendChild(element);

    return {
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
      opacity: 0.3 + Math.random() * 0.5,
      scale: 0.5 + Math.random() * 0.5,
      element,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }, []);

  const updateParticles = useCallback((deltaTime: number, containerWidth: number, containerHeight: number) => {
    const time = Date.now();
    
    particlesRef.current.forEach((particle, index) => {
      // Drift behavior
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Boundary wrapping
      if (particle.x < -10) particle.x = containerWidth + 10;
      if (particle.x > containerWidth + 10) particle.x = -10;
      if (particle.y < -10) particle.y = containerHeight + 10;
      if (particle.y > containerHeight + 10) particle.y = -10;

      // Clustering behavior
      if (Math.random() < CLUSTER_PROBABILITY * deltaTime * 0.001) {
        if (!particle.clusterTarget) {
          // Find nearby particles to cluster with
          const nearbyParticles = particlesRef.current.filter((other, otherIndex) => {
            if (otherIndex === index) return false;
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            return Math.sqrt(dx * dx + dy * dy) < 100;
          });

          if (nearbyParticles.length > 0) {
            const target = nearbyParticles[Math.floor(Math.random() * nearbyParticles.length)];
            particle.clusterTarget = { x: target.x, y: target.y };
          }
        }
      }

      // Apply clustering force
      if (particle.clusterTarget) {
        const dx = particle.clusterTarget.x - particle.x;
        const dy = particle.clusterTarget.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          particle.vx += (dx / distance) * CLUSTER_STRENGTH;
          particle.vy += (dy / distance) * CLUSTER_STRENGTH;
        } else {
          // Reached cluster target, dissolve clustering
          particle.clusterTarget = undefined;
          particle.vx += (Math.random() - 0.5) * 0.1;
          particle.vy += (Math.random() - 0.5) * 0.1;
        }
      }

      // Velocity damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Pulse effects
      particle.pulsePhase += deltaTime * 0.002;
      const pulseIntensity = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
      
      // Random pulse moments
      if (Math.random() < 0.0002 * deltaTime) {
        particle.pulsePhase = 0;
      }

      // Update DOM element
      const finalOpacity = particle.opacity * pulseIntensity;
      const finalScale = particle.scale * (0.8 + pulseIntensity * 0.4);
      
      particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${finalScale})`;
      particle.element.style.opacity = finalOpacity.toString();
    });
  }, []);

  const animate = useCallback((currentTime: number) => {
    if (!containerRef.current) return;

    const deltaTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    if (deltaTime > 0 && deltaTime < 100) { // Prevent large jumps
      updateParticles(
        deltaTime,
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles]);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.className += ' bg-gradient-to-br from-rich-black via-graphite to-dark-bg';
      return;
    }

    // Clear existing particles
    particlesRef.current.forEach(particle => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    particlesRef.current = [];

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(createParticle(container, i));
    }

    // Start animation
    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [createParticle, animate]);

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