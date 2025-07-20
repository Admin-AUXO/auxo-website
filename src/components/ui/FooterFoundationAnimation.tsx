'use client';

import { useEffect, useRef, useCallback } from 'react';

interface FoundationElement {
  x: number;
  y: number;
  element: HTMLElement;
  pulsePhase: number;
  pulseDelay: number;
  type: 'grid' | 'pillar' | 'anchor' | 'beam' | 'cornerstone';
  size: number;
  strength: number;
  glowElement?: HTMLElement;
}

interface FooterFoundationAnimationProps {
  className?: string;
}

/**
 * Footer Section: Enhanced Digital Bedrock Animation
 * 
 * Emotional Goal: Security and permanence of partnership
 * 
 * Visual Feel: Like watching a massive digital fortress foundation emerge
 * with glowing energy conduits, pulsing cornerstone nodes, structural beams,
 * and cascading stability waves that create unshakeable confidence.
 */
export default function FooterFoundationAnimation({ className = '' }: FooterFoundationAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FoundationElement[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const GRID_DENSITY = 0.4;
  const PULSE_INTERVAL = 3500;
  const STABILITY_FACTOR = 0.95;
  const FOUNDATION_HEIGHT = 80;
  const CORNERSTONE_COUNT = 4;
  const BEAM_COUNT = 6;

  const createFoundationBackground = useCallback((container: HTMLElement) => {
    const bgElement = document.createElement('div');
    bgElement.className = 'absolute inset-0 pointer-events-none';
    bgElement.style.cssText = `
      background: 
        linear-gradient(0deg, rgba(10, 58, 74, 0.3) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 100%, rgba(154, 205, 50, 0.05) 0%, transparent 60%),
        linear-gradient(90deg, 
          rgba(10, 58, 74, 0.1) 0%, 
          rgba(10, 58, 74, 0.2) 50%, 
          rgba(10, 58, 74, 0.1) 100%
        );
      opacity: 0.8;
      will-change: opacity;
    `;
    container.appendChild(bgElement);
    backgroundRef.current = bgElement;
  }, []);

  const createFoundationGrid = useCallback((container: HTMLElement) => {
    const elements: FoundationElement[] = [];
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create enhanced grid pattern with varying sizes
    const gridSpacing = 35;
    const cols = Math.floor(containerWidth / gridSpacing);
    const rows = Math.floor(containerHeight / gridSpacing);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() < GRID_DENSITY) {
          const element = document.createElement('div');
          element.className = 'absolute rounded-full pointer-events-none foundation-grid';
          
          const size = 1.5 + Math.random() * 2.5;
          const strength = Math.random();
          const opacity = 0.2 + strength * 0.3;
          
          element.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
              rgba(10, 58, 74, ${opacity}), 
              rgba(10, 58, 74, ${opacity * 0.3})
            );
            transform: translate(-50%, -50%) translate3d(0, 0, 0);
            will-change: opacity, transform;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 2}px rgba(10, 58, 74, ${opacity * 0.5});
          `;
          
          container.appendChild(element);
          
          const x = col * gridSpacing + gridSpacing / 2 + (Math.random() - 0.5) * 10;
          const y = row * gridSpacing + gridSpacing / 2 + (Math.random() - 0.5) * 10;
          
          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
          
          elements.push({
            x,
            y,
            element,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseDelay: Math.random() * PULSE_INTERVAL,
            type: 'grid',
            size,
            strength,
          });
        }
      }
    }
    
    return elements;
  }, []);

  const createFoundationPillars = useCallback((container: HTMLElement) => {
    const elements: FoundationElement[] = [];
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create vertical foundation pillars
    const pillarCount = 5;
    const pillarSpacing = containerWidth / (pillarCount + 1);
    
    for (let i = 0; i < pillarCount; i++) {
      const pillar = document.createElement('div');
      pillar.className = 'absolute pointer-events-none foundation-pillar';
      
      const width = 2;
      const height = FOUNDATION_HEIGHT;
      
      pillar.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        background: linear-gradient(to top, 
          rgba(154, 205, 50, 0.4), 
          rgba(154, 205, 50, 0.2), 
          rgba(154, 205, 50, 0.1)
        );
        left: ${pillarSpacing * (i + 1)}px;
        bottom: 0px;
        transform: translateX(-50%) translate3d(0, 0, 0);
        will-change: opacity, transform;
        opacity: 0.6;
      `;
      
      container.appendChild(pillar);
      
      elements.push({
        x: pillarSpacing * (i + 1),
        y: containerHeight - height / 2,
        element: pillar,
        pulsePhase: i * (Math.PI / pillarCount),
        pulseDelay: i * 1000,
        type: 'pillar',
        size: height,
        strength: 0.8,
      });
    }
    
    return elements;
  }, []);

  const createAnchorPoints = useCallback((container: HTMLElement) => {
    const elements: FoundationElement[] = [];
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create anchor points at strategic locations
    const anchorPositions = [
      { x: 0.2, y: 0.8 },
      { x: 0.5, y: 0.9 },
      { x: 0.8, y: 0.8 },
      { x: 0.1, y: 0.6 },
      { x: 0.9, y: 0.6 },
    ];
    
    anchorPositions.forEach((pos, index) => {
      const anchor = document.createElement('div');
      anchor.className = 'absolute rounded-full pointer-events-none foundation-anchor';
      
      const size = 4 + Math.random() * 2;
      anchor.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: rgba(154, 205, 50, 0.6);
        transform: translate(-50%, -50%) translate3d(0, 0, 0);
        will-change: opacity, transform;
        opacity: 0.5;
        box-shadow: 0 0 ${size * 2}px rgba(154, 205, 50, 0.3);
      `;
      
      container.appendChild(anchor);
      
      const x = pos.x * containerWidth;
      const y = pos.y * containerHeight;
      
      anchor.style.left = `${x}px`;
      anchor.style.top = `${y}px`;
      
      elements.push({
        x,
        y,
        element: anchor,
        pulsePhase: index * (Math.PI / 3),
        pulseDelay: index * 800,
        type: 'anchor',
        size,
        strength: 0.8,
      });
    });
    
    return elements;
  }, []);

  const createCornerstones = useCallback((container: HTMLElement) => {
    const elements: FoundationElement[] = [];
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create powerful cornerstone elements at the corners
    const cornerstonePositions = [
      { x: 0.05, y: 0.95 },
      { x: 0.95, y: 0.95 },
      { x: 0.05, y: 0.75 },
      { x: 0.95, y: 0.75 },
    ];
    
    cornerstonePositions.forEach((pos, index) => {
      const cornerstone = document.createElement('div');
      cornerstone.className = 'absolute pointer-events-none foundation-cornerstone';
      
      const size = 8 + Math.random() * 3;
      
      // Glow element
      const glowElement = document.createElement('div');
      glowElement.className = 'absolute rounded-full pointer-events-none';
      glowElement.style.cssText = `
        width: ${size * 3}px;
        height: ${size * 3}px;
        background: radial-gradient(circle, rgba(154, 205, 50, 0.1), transparent);
        transform: translate(-50%, -50%) translate3d(0, 0, 0);
        will-change: transform, opacity;
        opacity: 0.6;
        left: 50%;
        top: 50%;
      `;
      
      cornerstone.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(154, 205, 50, 0.9), rgba(154, 205, 50, 0.5));
        border-radius: 2px;
        transform: translate(-50%, -50%) translate3d(0, 0, 0);
        will-change: opacity, transform;
        opacity: 0.7;
        box-shadow: 0 0 ${size * 4}px rgba(154, 205, 50, 0.4);
        left: ${pos.x * containerWidth}px;
        top: ${pos.y * containerHeight}px;
      `;
      
      cornerstone.appendChild(glowElement);
      container.appendChild(cornerstone);
      
      elements.push({
        x: pos.x * containerWidth,
        y: pos.y * containerHeight,
        element: cornerstone,
        glowElement,
        pulsePhase: index * (Math.PI / 2),
        pulseDelay: index * 600,
        type: 'cornerstone',
        size,
        strength: 1.2,
      });
    });
    
    return elements;
  }, []);

  const createStructuralBeams = useCallback((container: HTMLElement) => {
    const elements: FoundationElement[] = [];
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create horizontal structural beams
    for (let i = 0; i < BEAM_COUNT; i++) {
      const beam = document.createElement('div');
      beam.className = 'absolute pointer-events-none foundation-beam';
      
      const width = containerWidth * (0.6 + Math.random() * 0.3);
      const height = 1;
      const x = (containerWidth - width) / 2;
      const y = containerHeight * (0.7 + i * 0.05);
      
      beam.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        background: linear-gradient(90deg, 
          transparent, 
          rgba(10, 58, 74, 0.6) 20%, 
          rgba(10, 58, 74, 0.8) 50%, 
          rgba(10, 58, 74, 0.6) 80%, 
          transparent
        );
        left: ${x}px;
        top: ${y}px;
        will-change: opacity;
        opacity: 0.4;
      `;
      
      container.appendChild(beam);
      
      elements.push({
        x: x + width / 2,
        y,
        element: beam,
        pulsePhase: i * (Math.PI / BEAM_COUNT),
        pulseDelay: i * 400,
        type: 'beam',
        size: width,
        strength: 0.6,
      });
    }
    
    return elements;
  }, []);

  const updateFoundationElements = useCallback((deltaTime: number) => {
    const time = Date.now();
    
    elementsRef.current.forEach((element) => {
      element.pulsePhase += deltaTime * 0.001 * element.strength;
      
      // Different pulse behaviors for different element types
      let pulseIntensity: number;
      let baseOpacity: number;
      
      switch (element.type) {
        case 'grid':
          // Subtle, stable pulsing
          pulseIntensity = Math.sin(element.pulsePhase) * 0.2 + 0.8;
          baseOpacity = 0.2 + element.strength * 0.2;
          element.element.style.opacity = (baseOpacity * pulseIntensity * STABILITY_FACTOR).toString();
          break;
          
        case 'pillar':
          // Gentle vertical emphasis
          pulseIntensity = Math.sin(element.pulsePhase) * 0.3 + 0.7;
          baseOpacity = 0.6;
          const scaleY = 0.9 + pulseIntensity * 0.1;
          element.element.style.opacity = (baseOpacity * pulseIntensity).toString();
          element.element.style.transform = `translateX(-50%) translate3d(0, 0, 0) scaleY(${scaleY})`;
          break;
          
        case 'anchor':
          // Confident, steady pulsing
          pulseIntensity = Math.sin(element.pulsePhase) * 0.4 + 0.6;
          baseOpacity = 0.5 * element.strength;
          const scale = 0.8 + pulseIntensity * 0.3;
          element.element.style.opacity = (baseOpacity * pulseIntensity).toString();
          element.element.style.transform = `translate(-50%, -50%) translate3d(0, 0, 0) scale(${scale})`;
          break;
          
        case 'cornerstone':
          // Powerful, commanding presence
          pulseIntensity = Math.sin(element.pulsePhase) * 0.5 + 0.5;
          baseOpacity = 0.7;
          const cornerstoneScale = 0.9 + pulseIntensity * 0.2;
          element.element.style.opacity = (baseOpacity * pulseIntensity).toString();
          element.element.style.transform = `translate(-50%, -50%) translate3d(0, 0, 0) scale(${cornerstoneScale})`;
          
          // Enhanced glow for cornerstones
          if (element.glowElement) {
            element.glowElement.style.opacity = (pulseIntensity * 0.8).toString();
            element.glowElement.style.transform = `translate(-50%, -50%) translate3d(0, 0, 0) scale(${1 + pulseIntensity * 0.3})`;
          }
          break;
          
        case 'beam':
          // Structural stability waves
          pulseIntensity = Math.sin(element.pulsePhase) * 0.3 + 0.7;
          baseOpacity = 0.4 * element.strength;
          element.element.style.opacity = (baseOpacity * pulseIntensity).toString();
          break;
      }
    });

    // Update background pulse
    if (backgroundRef.current) {
      const bgPulse = Math.sin(time * 0.0005) * 0.1 + 0.8;
      backgroundRef.current.style.opacity = bgPulse.toString();
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    if (!containerRef.current) return;

    const deltaTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    if (deltaTime > 0 && deltaTime < 100) {
      updateFoundationElements(deltaTime);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateFoundationElements]);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.className += ' bg-gradient-to-t from-petrol-ink/40 via-gray-900 to-black';
      return;
    }

    // Clear existing elements
    elementsRef.current.forEach(element => {
      if (element.element.parentNode) {
        element.element.parentNode.removeChild(element.element);
      }
    });
    elementsRef.current = [];

    if (backgroundRef.current && backgroundRef.current.parentNode) {
      backgroundRef.current.parentNode.removeChild(backgroundRef.current);
    }

    // Create enhanced foundation background
    createFoundationBackground(container);

    // Create all foundation elements
    const gridElements = createFoundationGrid(container);
    const pillarElements = createFoundationPillars(container);
    const anchorElements = createAnchorPoints(container);
    const cornerstoneElements = createCornerstones(container);
    const beamElements = createStructuralBeams(container);
    
    elementsRef.current = [
      ...gridElements, 
      ...pillarElements, 
      ...anchorElements, 
      ...cornerstoneElements, 
      ...beamElements
    ];

    // Start animation
    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    createFoundationBackground,
    createFoundationGrid, 
    createFoundationPillars, 
    createAnchorPoints, 
    createCornerstones, 
    createStructuralBeams, 
    animate
  ]);

  useEffect(() => {
    initializeAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup elements
      elementsRef.current.forEach(element => {
        if (element.element.parentNode) {
          element.element.parentNode.removeChild(element.element);
        }
      });
      elementsRef.current = [];
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