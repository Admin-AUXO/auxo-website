'use client';

import { useEffect, useRef, useCallback } from 'react';

interface FlowParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  element: HTMLElement;
  pathPhase: number;
  orbitRadius: number;
  orbitSpeed: number;
  centerX: number;
  centerY: number;
  color: string;
  trail: { x: number; y: number; opacity: number; size: number }[];
  energy: number;
  pulsePhase: number;
}

interface EnergyWave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  element: HTMLElement;
  maxRadius: number;
}

interface ImpactFlowAnimationProps {
  className?: string;
}

/**
 * Impact Section: Premium Success Constellation Animation
 * 
 * Emotional Goal: Executive pride and excitement from measurable achievement
 * 
 * Visual Feel: Like watching a sophisticated financial dashboard come alive
 * with flowing success metrics, golden achievement particles, dynamic ROI
 * indicators, and synchronized constellation bursts that visualize premium
 * business transformation and measurable competitive advantage.
 */
export default function ImpactFlowAnimation({ className = '' }: ImpactFlowAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<FlowParticle[]>([]);
  const energyWavesRef = useRef<EnergyWave[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const syncPulseRef = useRef<number>(0);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const achievementBurstsRef = useRef<HTMLElement[]>([]);

  const STREAM_COUNT = 75;
  const CONSTELLATION_POINTS = 15;
  const PULSE_SYNC_INTERVAL = 3500;
  const ORBIT_RADIUS_MIN = 50;
  const ORBIT_RADIUS_MAX = 140;
  const FLOW_SPEED = 1.2;
  const TRAIL_LENGTH = 15;
  const ENERGY_WAVE_COUNT = 5;
  const ACHIEVEMENT_BURST_COUNT = 8;

  const colors = [
    'rgba(154, 205, 50, 0.7)', // auxo-green
    'rgba(255, 215, 0, 0.6)',  // gold
    'rgba(154, 205, 50, 0.5)', // auxo-green lighter
    'rgba(255, 215, 0, 0.4)',  // gold lighter
  ];

  const createDynamicBackground = useCallback((container: HTMLElement) => {
    const bgElement = document.createElement('div');
    bgElement.className = 'absolute inset-0 pointer-events-none';
    bgElement.style.cssText = `
      background: radial-gradient(ellipse at 30% 40%, 
        rgba(154, 205, 50, 0.08) 0%, 
        transparent 50%
      ),
      radial-gradient(ellipse at 70% 60%, 
        rgba(255, 215, 0, 0.06) 0%, 
        transparent 50%
      ),
      linear-gradient(135deg, 
        rgba(10, 58, 74, 0.1) 0%, 
        rgba(0, 0, 0, 0.3) 50%, 
        rgba(10, 58, 74, 0.1) 100%
      );
      opacity: 0.7;
      will-change: opacity;
    `;
    container.appendChild(bgElement);
    backgroundRef.current = bgElement;
  }, []);

  const createEnergyWave = useCallback((container: HTMLElement, x: number, y: number): EnergyWave => {
    const element = document.createElement('div');
    element.className = 'absolute rounded-full pointer-events-none';
    element.style.cssText = `
      width: 4px;
      height: 4px;
      border: 2px solid rgba(154, 205, 50, 0.6);
      background: transparent;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      will-change: transform, opacity;
      opacity: 0.8;
    `;
    
    container.appendChild(element);

    return {
      x,
      y,
      radius: 4,
      opacity: 0.8,
      element,
      maxRadius: 100 + Math.random() * 50,
    };
  }, []);

  const createFlowParticle = useCallback((container: HTMLElement, index: number): FlowParticle => {
    const element = document.createElement('div');
    element.className = 'absolute rounded-full pointer-events-none';
    
    const size = 3 + Math.random() * 4;
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    const isGold = color.includes('255, 215, 0');
    
    element.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, ${color}, ${color.replace('0.', '0.3')});
      transform: translate3d(0, 0, 0);
      will-change: transform, opacity;
      box-shadow: 0 0 ${size * 3}px ${color};
      filter: blur(0.3px);
    `;
    
    container.appendChild(element);

    // Create orbital motion around invisible anchor points
    const centerX = (Math.random() * 0.6 + 0.2) * container.offsetWidth;
    const centerY = (Math.random() * 0.6 + 0.2) * container.offsetHeight;
    const orbitRadius = ORBIT_RADIUS_MIN + Math.random() * (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN);
    const pathPhase = Math.random() * Math.PI * 2;

    return {
      x: centerX + Math.cos(pathPhase) * orbitRadius,
      y: centerY + Math.sin(pathPhase) * orbitRadius,
      vx: (Math.random() - 0.5) * FLOW_SPEED,
      vy: (Math.random() - 0.5) * FLOW_SPEED,
      opacity: 0.6 + Math.random() * 0.4,
      size,
      element,
      pathPhase,
      orbitRadius,
      orbitSpeed: 0.0008 + Math.random() * 0.0012,
      centerX,
      centerY,
      color,
      trail: [],
      energy: isGold ? 1.5 : 1.0,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }, []);

  const createConstellationPoints = useCallback((container: HTMLElement) => {
    for (let i = 0; i < CONSTELLATION_POINTS; i++) {
      const point = document.createElement('div');
      point.className = 'absolute rounded-full pointer-events-none constellation-point';
      
      const size = 4 + Math.random() * 2;
      point.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: rgba(154, 205, 50, 0.8);
        left: ${Math.random() * container.offsetWidth}px;
        top: ${Math.random() * container.offsetHeight}px;
        transform: translate(-50%, -50%) translate3d(0, 0, 0);
        will-change: transform, opacity;
        box-shadow: 0 0 ${size * 3}px rgba(154, 205, 50, 0.6);
      `;
      
      container.appendChild(point);
    }
  }, []);

  const updateParticles = useCallback((deltaTime: number, containerWidth: number, containerHeight: number) => {
    const time = Date.now();
    syncPulseRef.current = time;

    particlesRef.current.forEach((particle, index) => {
      // Update orbital motion
      particle.pathPhase += particle.orbitSpeed * deltaTime;
      
      // Calculate orbital position
      const orbitX = particle.centerX + Math.cos(particle.pathPhase) * particle.orbitRadius;
      const orbitY = particle.centerY + Math.sin(particle.pathPhase) * particle.orbitRadius;
      
      // Add flowing motion
      particle.x = orbitX + particle.vx * deltaTime * 0.1;
      particle.y = orbitY + particle.vy * deltaTime * 0.1;

      // Boundary wrapping with smooth transitions
      if (particle.x < -10) {
        particle.x = containerWidth + 10;
        particle.centerX = containerWidth - particle.orbitRadius;
      }
      if (particle.x > containerWidth + 10) {
        particle.x = -10;
        particle.centerX = particle.orbitRadius;
      }
      if (particle.y < -10) {
        particle.y = containerHeight + 10;
        particle.centerY = containerHeight - particle.orbitRadius;
      }
      if (particle.y > containerHeight + 10) {
        particle.y = -10;
        particle.centerY = particle.orbitRadius;
      }

      // Synchronized pulsing for "success moments"
      const pulsePhase = (time % PULSE_SYNC_INTERVAL) / PULSE_SYNC_INTERVAL;
      const pulseIntensity = Math.sin(pulsePhase * Math.PI * 2) * 0.3 + 0.7;
      
      // Individual particle variation
      const individualPulse = Math.sin((time + index * 1000) * 0.003) * 0.2 + 0.8;
      
      const finalOpacity = particle.opacity * pulseIntensity * individualPulse;
      const finalScale = 0.8 + pulseIntensity * 0.4;

      // Color transitions during pulse moments
      let currentColor = particle.color;
      if (pulsePhase > 0.8 || pulsePhase < 0.2) {
        // Transition to gold during peak success moments
        currentColor = currentColor.replace('154, 205, 50', '255, 215, 0');
      }

      // Update DOM element
      particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${finalScale})`;
      particle.element.style.opacity = finalOpacity.toString();
      particle.element.style.background = currentColor;
      particle.element.style.boxShadow = `0 0 ${particle.size * 2 * finalScale}px ${currentColor}`;
    });
  }, []);

  const updateConstellationPoints = useCallback(() => {
    if (!containerRef.current) return;

    const constellationPoints = containerRef.current.querySelectorAll('.constellation-point');
    const time = Date.now();
    const pulsePhase = (time % PULSE_SYNC_INTERVAL) / PULSE_SYNC_INTERVAL;
    
    constellationPoints.forEach((point, index) => {
      const element = point as HTMLElement;
      const individualPhase = (time + index * 800) * 0.002;
      const pulseIntensity = Math.sin(pulsePhase * Math.PI * 2) * 0.4 + 0.6;
      const individualPulse = Math.sin(individualPhase) * 0.3 + 0.7;
      
      const finalScale = 0.8 + pulseIntensity * individualPulse * 0.6;
      const finalOpacity = 0.6 + pulseIntensity * 0.4;
      
      element.style.transform = `translate(-50%, -50%) translate3d(0, 0, 0) scale(${finalScale})`;
      element.style.opacity = finalOpacity.toString();
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
      updateConstellationPoints();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, updateConstellationPoints]);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.className += ' bg-gradient-to-r from-dark-bg via-petrol-ink/10 to-dark-bg';
      return;
    }

    // Clear existing particles
    particlesRef.current.forEach(particle => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    particlesRef.current = [];

    // Clear existing constellation points
    const existingPoints = container.querySelectorAll('.constellation-point');
    existingPoints.forEach(point => {
      if (point.parentNode) {
        point.parentNode.removeChild(point);
      }
    });

    // Create constellation points
    createConstellationPoints(container);

    // Create flow particles
    for (let i = 0; i < STREAM_COUNT; i++) {
      particlesRef.current.push(createFlowParticle(container, i));
    }

    // Start animation
    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [createFlowParticle, createConstellationPoints, animate]);

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

      // Cleanup constellation points
      if (containerRef.current) {
        const constellationPoints = containerRef.current.querySelectorAll('.constellation-point');
        constellationPoints.forEach(point => {
          if (point.parentNode) {
            point.parentNode.removeChild(point);
          }
        });
      }
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