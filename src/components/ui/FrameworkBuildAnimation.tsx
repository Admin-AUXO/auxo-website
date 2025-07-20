'use client';

import { useEffect, useRef, useCallback } from 'react';

interface BuildBlock {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  element: HTMLElement;
  isSettled: boolean;
  animationDelay: number;
  connectionLines: HTMLElement[];
  glowElement: HTMLElement;
  pulsePhase: number;
  blockType: 'core' | 'support' | 'connector';
  size: number;
}

interface FrameworkBuildAnimationProps {
  className?: string;
}

/**
 * Framework Section: Premium Holographic Blueprint Animation
 * 
 * Emotional Goal: Executive confidence through systematic transformation
 * 
 * Visual Feel: Like watching a sophisticated holographic blueprint materialize
 * with glowing energy conduits, cascading assembly sequences, and intelligent
 * construction patterns that demonstrate systematic, premium transformation.
 */
export default function FrameworkBuildAnimation({ className = '' }: FrameworkBuildAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<BuildBlock[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);
  const backgroundGridRef = useRef<HTMLDivElement | null>(null);
  const blueprintLinesRef = useRef<HTMLElement[]>([]);

  const BLOCK_COUNT = 45;
  const ASSEMBLY_DELAY = 120;
  const CONNECTION_DELAY = 250;
  const SETTLE_DURATION = 1500;
  const GRID_COLS = 9;
  const GRID_ROWS = 5;
  const BLUEPRINT_LINE_COUNT = 12;

  const createBackgroundGrid = useCallback((container: HTMLElement) => {
    const gridElement = document.createElement('div');
    gridElement.className = 'absolute inset-0 pointer-events-none';
    gridElement.style.cssText = `
      background: 
        linear-gradient(rgba(10, 58, 74, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(10, 58, 74, 0.15) 1px, transparent 1px),
        radial-gradient(ellipse at 30% 30%, rgba(154, 205, 50, 0.05) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 70%, rgba(10, 58, 74, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(45, 45, 45, 0.3) 0%, 
          rgba(26, 26, 26, 0.6) 50%, 
          rgba(45, 45, 45, 0.3) 100%
        );
      background-size: 40px 40px, 40px 40px, 100% 100%, 100% 100%, 100% 100%;
      opacity: 0.4;
      will-change: opacity;
    `;
    container.appendChild(gridElement);
    backgroundGridRef.current = gridElement;

    // Create blueprint construction lines
    for (let i = 0; i < BLUEPRINT_LINE_COUNT; i++) {
      const line = document.createElement('div');
      line.className = 'absolute pointer-events-none blueprint-line';
      
      const isHorizontal = Math.random() > 0.5;
      const length = (0.3 + Math.random() * 0.4) * (isHorizontal ? container.offsetWidth : container.offsetHeight);
      
      line.style.cssText = `
        ${isHorizontal ? 'width' : 'height'}: ${length}px;
        ${isHorizontal ? 'height' : 'width'}: 1px;
        background: linear-gradient(${isHorizontal ? '90deg' : '0deg'}, 
          transparent, 
          rgba(154, 205, 50, 0.3) 20%, 
          rgba(154, 205, 50, 0.6) 50%, 
          rgba(154, 205, 50, 0.3) 80%, 
          transparent
        );
        left: ${Math.random() * (container.offsetWidth - (isHorizontal ? length : 0))}px;
        top: ${Math.random() * (container.offsetHeight - (isHorizontal ? 0 : length))}px;
        opacity: 0.2;
        will-change: opacity;
      `;
      
      container.appendChild(line);
      blueprintLinesRef.current.push(line);
    }
  }, []);

  const createBuildBlock = useCallback((container: HTMLElement, index: number): BuildBlock => {
    // Determine block type based on position
    const col = index % GRID_COLS;
    const row = Math.floor(index / GRID_COLS);
    const isCenter = Math.abs(col - Math.floor(GRID_COLS / 2)) <= 1 && Math.abs(row - Math.floor(GRID_ROWS / 2)) <= 1;
    const isEdge = col === 0 || col === GRID_COLS - 1 || row === 0 || row === GRID_ROWS - 1;
    
    let blockType: 'core' | 'support' | 'connector';
    let size: number;
    let color: string;
    
    if (isCenter) {
      blockType = 'core';
      size = 12 + Math.random() * 4;
      color = 'rgba(154, 205, 50, 0.9)';
    } else if (isEdge) {
      blockType = 'connector';
      size = 6 + Math.random() * 2;
      color = 'rgba(10, 58, 74, 0.8)';
    } else {
      blockType = 'support';
      size = 8 + Math.random() * 3;
      color = 'rgba(154, 205, 50, 0.7)';
    }

    // Main element
    const element = document.createElement('div');
    element.className = 'absolute pointer-events-none';
    element.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, ${color}, ${color.replace('0.', '0.4')});
      border-radius: ${blockType === 'core' ? '50%' : '2px'};
      transform: translate3d(0, 0, 0) scale(0) rotate(${Math.random() * 360}deg);
      will-change: transform, opacity;
      opacity: 0;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    // Glow element
    const glowElement = document.createElement('div');
    glowElement.className = 'absolute pointer-events-none';
    glowElement.style.cssText = `
      width: ${size * 2}px;
      height: ${size * 2}px;
      background: radial-gradient(circle, ${color.replace('0.', '0.2')}, transparent);
      border-radius: 50%;
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      will-change: transform, opacity;
      opacity: 0;
      left: ${size / 2}px;
      top: ${size / 2}px;
    `;
    
    element.appendChild(glowElement);
    container.appendChild(element);

    // Calculate grid position with some variation
    const cellWidth = container.offsetWidth / (GRID_COLS + 1);
    const cellHeight = container.offsetHeight / (GRID_ROWS + 1);
    
    const targetX = cellWidth * (col + 1) - size / 2 + (Math.random() - 0.5) * 20;
    const targetY = cellHeight * (row + 1) - size / 2 + (Math.random() - 0.5) * 20;

    // Start from random position outside viewport
    const startX = Math.random() * container.offsetWidth;
    const startY = Math.random() * container.offsetHeight;

    return {
      x: startX,
      y: startY,
      targetX,
      targetY,
      element,
      glowElement,
      isSettled: false,
      animationDelay: index * ASSEMBLY_DELAY + (blockType === 'core' ? 0 : blockType === 'support' ? 200 : 400),
      connectionLines: [],
      pulsePhase: Math.random() * Math.PI * 2,
      blockType,
      size,
    };
  }, []);

  const createConnectionLine = useCallback((container: HTMLElement, from: BuildBlock, to: BuildBlock): HTMLElement => {
    const line = document.createElement('div');
    line.className = 'absolute pointer-events-none';
    
    const dx = to.targetX - from.targetX;
    const dy = to.targetY - from.targetY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    line.style.cssText = `
      width: ${length}px;
      height: 1px;
      background: linear-gradient(90deg, rgba(154, 205, 50, 0.3), rgba(10, 58, 74, 0.5));
      left: ${from.targetX + 4}px;
      top: ${from.targetY + 4}px;
      transform: rotate(${angle}deg);
      transform-origin: 0 0;
      opacity: 0;
      transform: rotate(${angle}deg) scaleX(0);
      will-change: transform, opacity;
    `;
    
    container.appendChild(line);
    return line;
  }, []);

  const animateBlockAssembly = useCallback((block: BuildBlock, currentTime: number) => {
    if (currentTime < block.animationDelay) return;

    const progress = Math.min(1, (currentTime - block.animationDelay) / SETTLE_DURATION);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    // Animate position with magnetic snap effect
    const currentX = block.x + (block.targetX - block.x) * easeOut;
    const currentY = block.y + (block.targetY - block.y) * easeOut;

    // Enhanced scale and rotation with overshoot
    const scale = progress < 0.8 ? easeOut : easeOut * (1 + Math.sin((progress - 0.8) * Math.PI * 5) * 0.1);
    const rotation = (1 - easeOut) * (block.blockType === 'core' ? 180 : 90);

    // Pulsing effect for settled blocks
    if (block.isSettled) {
      block.pulsePhase += 0.02;
      const pulseIntensity = Math.sin(block.pulsePhase) * 0.2 + 0.8;
      const finalScale = scale * pulseIntensity;
      
      block.element.style.transform = `translate3d(${block.targetX}px, ${block.targetY}px, 0) scale(${finalScale}) rotate(0deg)`;
      block.glowElement.style.opacity = (pulseIntensity * 0.6).toString();
      
      // Enhanced glow for core blocks
      if (block.blockType === 'core') {
        block.element.style.boxShadow = `0 0 ${block.size * 3 * pulseIntensity}px rgba(154, 205, 50, 0.8)`;
      }
    } else {
      block.element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      block.element.style.opacity = easeOut.toString();
      block.glowElement.style.opacity = (easeOut * 0.4).toString();
    }

    // Mark as settled when animation completes
    if (progress >= 1 && !block.isSettled) {
      block.isSettled = true;
      
      // Dramatic settling effect with energy burst
      block.element.style.transform = `translate3d(${block.targetX}px, ${block.targetY}px, 0) scale(1.3) rotate(0deg)`;
      block.glowElement.style.opacity = '0.8';
      
      setTimeout(() => {
        block.element.style.transform = `translate3d(${block.targetX}px, ${block.targetY}px, 0) scale(1) rotate(0deg)`;
        block.element.style.transition = 'transform 0.3s ease-out';
      }, 150);
    }
  }, []);

  const animateConnections = useCallback((currentTime: number) => {
    const settledBlocks = blocksRef.current.filter(block => block.isSettled);
    
    if (settledBlocks.length < 2) return;

    settledBlocks.forEach((block, index) => {
      if (block.connectionLines.length === 0) {
        // Create connections to nearby blocks
        const nearbyBlocks = settledBlocks.filter((other, otherIndex) => {
          if (otherIndex === index) return false;
          const dx = other.targetX - block.targetX;
          const dy = other.targetY - block.targetY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 120 && distance > 0;
        });

        // Connect to 1-2 nearby blocks
        const connectionsToMake = Math.min(2, nearbyBlocks.length);
        for (let i = 0; i < connectionsToMake; i++) {
          if (containerRef.current) {
            const line = createConnectionLine(containerRef.current, block, nearbyBlocks[i]);
            block.connectionLines.push(line);
            
            // Animate line appearance
            setTimeout(() => {
              line.style.opacity = '1';
              line.style.transform = line.style.transform.replace('scaleX(0)', 'scaleX(1)');
              line.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            }, CONNECTION_DELAY + index * 100);
          }
        }
      }
    });
  }, [createConnectionLine]);

  const animate = useCallback((currentTime: number) => {
    if (!containerRef.current || !isInitializedRef.current) return;

    const deltaTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    if (deltaTime > 0 && deltaTime < 100) {
      // Animate block assembly
      blocksRef.current.forEach(block => {
        animateBlockAssembly(block, currentTime);
      });

      // Animate connections
      animateConnections(currentTime);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animateBlockAssembly, animateConnections]);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current || isInitializedRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.className += ' bg-gradient-to-br from-petrol-ink/20 to-dark-bg';
      return;
    }

    // Clear existing blocks
    blocksRef.current.forEach(block => {
      if (block.element.parentNode) {
        block.element.parentNode.removeChild(block.element);
      }
      block.connectionLines.forEach(line => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      });
    });
    blocksRef.current = [];

    // Create blocks
    for (let i = 0; i < BLOCK_COUNT; i++) {
      blocksRef.current.push(createBuildBlock(container, i));
    }

    isInitializedRef.current = true;
    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [createBuildBlock, animate]);

  // Use Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInitializedRef.current) {
            // Small delay to ensure smooth transition
            setTimeout(() => {
              initializeAnimation();
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup blocks and connections
      blocksRef.current.forEach(block => {
        if (block.element.parentNode) {
          block.element.parentNode.removeChild(block.element);
        }
        block.connectionLines.forEach(line => {
          if (line.parentNode) {
            line.parentNode.removeChild(line);
          }
        });
      });
      blocksRef.current = [];
      isInitializedRef.current = false;
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