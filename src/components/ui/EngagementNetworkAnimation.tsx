'use client';

import { useEffect, useRef, useCallback } from 'react';

interface NetworkNode {
  x: number;
  y: number;
  element: HTMLElement;
  glowElement: HTMLElement;
  connections: Connection[];
  pulsePhase: number;
  isActive: boolean;
  nodeType: 'core' | 'hub' | 'endpoint';
  size: number;
  energy: number;
  activationLevel: number;
}

interface Connection {
  from: NetworkNode;
  to: NetworkNode;
  element: HTMLElement;
  pulseElement: HTMLElement;
  length: number;
  angle: number;
  dataPackets: DataPacket[];
  bandwidth: number;
}

interface DataPacket {
  progress: number;
  speed: number;
  element: HTMLElement;
  color: string;
  size: number;
}

interface EngagementNetworkAnimationProps {
  className?: string;
}

/**
 * Engagement Section: Enhanced Neural Awakening Animation
 * 
 * Emotional Goal: Trust and excitement for intelligent connection
 * 
 * Visual Feel: Like watching an advanced AI neural network come online with
 * cascading data flows, pulsing energy nodes, synchronized thinking bursts,
 * and dynamic connection pathways that create a sense of living intelligence.
 */
export default function EngagementNetworkAnimation({ className = '' }: EngagementNetworkAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<NetworkNode[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const thinkingMomentRef = useRef<number>(0);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const NODE_COUNT = 18;
  const CONNECTION_COUNT = 28;
  const PULSE_SPEED = 1.8;
  const THINKING_INTERVAL = 5000;
  const CONNECTION_DISTANCE = 180;
  const DATA_PACKET_COUNT = 3;

  const nodePositions = [
    { x: 15, y: 25, type: 'hub' }, { x: 85, y: 20, type: 'endpoint' }, { x: 25, y: 45, type: 'hub' },
    { x: 75, y: 40, type: 'hub' }, { x: 45, y: 30, type: 'core' }, { x: 55, y: 60, type: 'core' },
    { x: 20, y: 70, type: 'endpoint' }, { x: 80, y: 75, type: 'endpoint' }, { x: 35, y: 85, type: 'hub' },
    { x: 65, y: 80, type: 'hub' }, { x: 50, y: 15, type: 'core' }, { x: 10, y: 55, type: 'endpoint' },
    { x: 90, y: 45, type: 'endpoint' }, { x: 30, y: 15, type: 'hub' }, { x: 70, y: 25, type: 'hub' },
    { x: 15, y: 85, type: 'endpoint' }, { x: 85, y: 85, type: 'endpoint' }, { x: 50, y: 75, type: 'hub' }
  ];

  const createNeuralBackground = useCallback((container: HTMLElement) => {
    const bgElement = document.createElement('div');
    bgElement.className = 'absolute inset-0 pointer-events-none';
    bgElement.style.cssText = `
      background: 
        radial-gradient(ellipse at 25% 25%, rgba(154, 205, 50, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 75% 75%, rgba(0, 191, 255, 0.03) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(10, 58, 74, 0.08) 0%, transparent 70%);
      opacity: 0.8;
      will-change: opacity;
    `;
    container.appendChild(bgElement);
    backgroundRef.current = bgElement;
  }, []);

  const createNetworkNode = useCallback((container: HTMLElement, index: number): NetworkNode => {
    const pos = nodePositions[index] || { 
      x: 20 + Math.random() * 60, 
      y: 20 + Math.random() * 60,
      type: 'endpoint'
    };

    const nodeType = pos.type as 'core' | 'hub' | 'endpoint';
    let size: number;
    let color: string;
    let glowSize: number;

    switch (nodeType) {
      case 'core':
        size = 10;
        color = 'rgba(154, 205, 50, 0.95)';
        glowSize = 20;
        break;
      case 'hub':
        size = 7;
        color = 'rgba(0, 191, 255, 0.8)';
        glowSize = 14;
        break;
      case 'endpoint':
        size = 5;
        color = 'rgba(154, 205, 50, 0.7)';
        glowSize = 10;
        break;
    }

    // Main node element
    const element = document.createElement('div');
    element.className = 'absolute rounded-full pointer-events-none network-node';
    element.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, ${color}, ${color.replace('0.', '0.4')});
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      will-change: transform, opacity;
      box-shadow: 0 0 ${glowSize}px ${color};
      border: 1px solid ${color.replace('0.', '0.3')};
    `;
    
    // Glow element
    const glowElement = document.createElement('div');
    glowElement.className = 'absolute rounded-full pointer-events-none';
    glowElement.style.cssText = `
      width: ${size * 3}px;
      height: ${size * 3}px;
      background: radial-gradient(circle, ${color.replace('0.', '0.1')}, transparent);
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      will-change: transform, opacity;
      opacity: 0.6;
      left: 50%;
      top: 50%;
    `;
    
    element.appendChild(glowElement);
    container.appendChild(element);

    const x = (pos.x / 100) * container.offsetWidth;
    const y = (pos.y / 100) * container.offsetHeight;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    return {
      x,
      y,
      element,
      glowElement,
      connections: [],
      pulsePhase: Math.random() * Math.PI * 2,
      isActive: false,
      nodeType,
      size,
      energy: nodeType === 'core' ? 1.5 : nodeType === 'hub' ? 1.2 : 1.0,
      activationLevel: 0,
    };
  }, []);

  const createConnection = useCallback((container: HTMLElement, from: NetworkNode, to: NetworkNode): Connection => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    // Connection line
    const lineElement = document.createElement('div');
    lineElement.className = 'absolute pointer-events-none connection-line';
    lineElement.style.cssText = `
      width: ${length}px;
      height: 1px;
      background: linear-gradient(90deg, 
        rgba(154, 205, 50, 0.2), 
        rgba(154, 205, 50, 0.4), 
        rgba(154, 205, 50, 0.2)
      );
      left: ${from.x}px;
      top: ${from.y}px;
      transform: rotate(${angle}deg);
      transform-origin: 0 0;
      opacity: 0.3;
      will-change: opacity;
    `;
    
    container.appendChild(lineElement);

    // Traveling pulse
    const pulseElement = document.createElement('div');
    pulseElement.className = 'absolute rounded-full pointer-events-none connection-pulse';
    pulseElement.style.cssText = `
      width: 4px;
      height: 4px;
      background: rgba(154, 205, 50, 0.9);
      left: ${from.x}px;
      top: ${from.y}px;
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      opacity: 0;
      will-change: transform, opacity;
      box-shadow: 0 0 8px rgba(154, 205, 50, 0.6);
    `;
    
    container.appendChild(pulseElement);

    return {
      from,
      to,
      element: lineElement,
      pulseElement,
      length,
      angle,
      dataPackets: [],
      bandwidth: 1.0,
    };
  }, []);

  const createNetworkConnections = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Clear existing connections
    connectionsRef.current.forEach(connection => {
      if (connection.element.parentNode) {
        connection.element.parentNode.removeChild(connection.element);
      }
      if (connection.pulseElement.parentNode) {
        connection.pulseElement.parentNode.removeChild(connection.pulseElement);
      }
    });
    connectionsRef.current = [];

    // Create connections between nearby nodes
    const connections: Connection[] = [];
    
    for (let i = 0; i < nodesRef.current.length; i++) {
      const node = nodesRef.current[i];
      const nearbyNodes = nodesRef.current.filter((other, otherIndex) => {
        if (otherIndex === i) return false;
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < CONNECTION_DISTANCE;
      });

      // Connect to 1-3 nearby nodes
      const connectionsToMake = Math.min(3, nearbyNodes.length);
      for (let j = 0; j < connectionsToMake; j++) {
        const targetNode = nearbyNodes[j];
        
        // Avoid duplicate connections
        const existingConnection = connections.find(conn => 
          (conn.from === node && conn.to === targetNode) ||
          (conn.from === targetNode && conn.to === node)
        );
        
        if (!existingConnection && connections.length < CONNECTION_COUNT) {
          const connection = createConnection(container, node, targetNode);
          connections.push(connection);
          node.connections.push(connection);
          targetNode.connections.push(connection);
        }
      }
    }

    connectionsRef.current = connections;
  }, [createConnection]);

  const animatePulses = useCallback((deltaTime: number) => {
    const time = Date.now();
    
    connectionsRef.current.forEach((connection, index) => {
      const pulseSpeed = PULSE_SPEED + Math.sin(index * 0.5) * 0.3;
      const pulsePhase = (time * 0.001 * pulseSpeed + index * 0.5) % 1;
      
      // Calculate pulse position along connection
      const pulseX = connection.from.x + (connection.to.x - connection.from.x) * pulsePhase;
      const pulseY = connection.from.y + (connection.to.y - connection.from.y) * pulsePhase;
      
      // Pulse visibility based on phase
      const pulseOpacity = Math.sin(pulsePhase * Math.PI) * 0.8;
      
      connection.pulseElement.style.left = `${pulseX}px`;
      connection.pulseElement.style.top = `${pulseY}px`;
      connection.pulseElement.style.opacity = pulseOpacity.toString();
    });
  }, []);

  const animateNodes = useCallback((deltaTime: number) => {
    const time = Date.now();
    
    nodesRef.current.forEach((node, index) => {
      node.pulsePhase += deltaTime * 0.002;
      
      // Individual node pulsing
      const pulseIntensity = Math.sin(node.pulsePhase) * 0.3 + 0.7;
      const scale = 0.8 + pulseIntensity * 0.4;
      const opacity = 0.6 + pulseIntensity * 0.4;
      
      node.element.style.transform = `translate(-50%, -50%) translate3d(0, 0, 0) scale(${scale})`;
      node.element.style.opacity = opacity.toString();
    });
  }, []);

  const triggerThinkingMoment = useCallback(() => {
    // Synchronized "thinking" moment where multiple connections light up
    const activeConnections = connectionsRef.current
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(connectionsRef.current.length * 0.4));
    
    activeConnections.forEach((connection, index) => {
      setTimeout(() => {
        // Brighten connection line
        connection.element.style.opacity = '0.8';
        connection.element.style.background = 'linear-gradient(90deg, rgba(154, 205, 50, 0.6), rgba(154, 205, 50, 0.9), rgba(154, 205, 50, 0.6))';
        
        // Activate connected nodes
        connection.from.isActive = true;
        connection.to.isActive = true;
        
        connection.from.element.style.boxShadow = '0 0 20px rgba(154, 205, 50, 0.8)';
        connection.to.element.style.boxShadow = '0 0 20px rgba(154, 205, 50, 0.8)';
        
        // Reset after thinking moment
        setTimeout(() => {
          connection.element.style.opacity = '0.3';
          connection.element.style.background = 'linear-gradient(90deg, rgba(154, 205, 50, 0.2), rgba(154, 205, 50, 0.4), rgba(154, 205, 50, 0.2))';
          
          connection.from.isActive = false;
          connection.to.isActive = false;
          
          connection.from.element.style.boxShadow = '0 0 12px rgba(154, 205, 50, 0.4)';
          connection.to.element.style.boxShadow = '0 0 12px rgba(154, 205, 50, 0.4)';
        }, 1500);
        
      }, index * 100);
    });
  }, []);

  const animate = useCallback((currentTime: number) => {
    if (!containerRef.current) return;

    const deltaTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    if (deltaTime > 0 && deltaTime < 100) {
      animatePulses(deltaTime);
      animateNodes(deltaTime);
      
      // Trigger thinking moments
      thinkingMomentRef.current += deltaTime;
      if (thinkingMomentRef.current >= THINKING_INTERVAL) {
        thinkingMomentRef.current = 0;
        triggerThinkingMoment();
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animatePulses, animateNodes, triggerThinkingMoment]);

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.className += ' bg-gradient-to-br from-blue-900/10 via-gray-900 to-petrol-ink/30';
      return;
    }

    // Clear existing elements
    nodesRef.current.forEach(node => {
      if (node.element.parentNode) {
        node.element.parentNode.removeChild(node.element);
      }
    });
    nodesRef.current = [];

    connectionsRef.current.forEach(connection => {
      if (connection.element.parentNode) {
        connection.element.parentNode.removeChild(connection.element);
      }
      if (connection.pulseElement.parentNode) {
        connection.pulseElement.parentNode.removeChild(connection.pulseElement);
      }
    });
    connectionsRef.current = [];

    if (backgroundRef.current && backgroundRef.current.parentNode) {
      backgroundRef.current.parentNode.removeChild(backgroundRef.current);
    }

    // Create enhanced neural background
    createNeuralBackground(container);

    // Create network nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodesRef.current.push(createNetworkNode(container, i));
    }

    // Create connections between nodes
    createNetworkConnections();

    // Reset timers
    thinkingMomentRef.current = 0;
    lastFrameTimeRef.current = performance.now();

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [createNetworkNode, createNetworkConnections, createNeuralBackground, animate]);

  useEffect(() => {
    initializeAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup nodes
      nodesRef.current.forEach(node => {
        if (node.element.parentNode) {
          node.element.parentNode.removeChild(node.element);
        }
      });
      nodesRef.current = [];

      // Cleanup connections
      connectionsRef.current.forEach(connection => {
        if (connection.element.parentNode) {
          connection.element.parentNode.removeChild(connection.element);
        }
        if (connection.pulseElement.parentNode) {
          connection.pulseElement.parentNode.removeChild(connection.pulseElement);
        }
      });
      connectionsRef.current = [];
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