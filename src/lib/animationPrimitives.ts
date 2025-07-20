/**
 * Animation Primitives
 * 
 * Reusable particle systems, utilities, and animation building blocks
 * Optimized for performance with hardware acceleration
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  element: HTMLElement;
  active: boolean;
}

export interface ParticleSystemConfig {
  count: number;
  colors: string[];
  size: { min: number; max: number };
  speed: { min: number; max: number };
  opacity: { min: number; max: number };
  lifetime: number;
}

/**
 * Deterministic pseudo-random function for consistent server/client rendering
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate consistent positions for animations
 */
export const generatePositions = (count: number, seedOffset: number = 0) => 
  Array.from({ length: count }, (_, i) => ({
    left: seededRandom((i + seedOffset) * 7.3) * 100,
    top: seededRandom((i + seedOffset) * 11.7) * 100,
    x1: seededRandom((i + seedOffset) * 13.1) * 150 - 75,
    y1: seededRandom((i + seedOffset) * 17.9) * 150 - 75,
    x2: seededRandom((i + seedOffset) * 19.3) * 100 - 50,
    y2: seededRandom((i + seedOffset) * 23.7) * 100 - 50,
    duration: 12 + seededRandom((i + seedOffset) * 29.1) * 8,
  }));

/**
 * Particle System Class
 * Manages particle lifecycle with object pooling for performance
 */
export class ParticleSystem {
  private particles: Particle[] = [];
  private particlePool: Particle[] = [];
  private container: HTMLElement;
  private config: ParticleSystemConfig;
  private animationFrame: number = 0;
  private isRunning: boolean = false;

  constructor(container: HTMLElement, config: ParticleSystemConfig) {
    this.container = container;
    this.config = config;
    this.createPool();
  }

  /**
   * Create particle pool for object reuse
   */
  private createPool(): void {
    for (let i = 0; i < this.config.count; i++) {
      const element = this.createParticleElement(i);
      const particle: Particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        opacity: 0,
        scale: 1,
        element,
        active: false
      };
      this.particlePool.push(particle);
    }
  }

  /**
   * Create DOM element for particle
   */
  private createParticleElement(index: number): HTMLElement {
    const element = document.createElement('div');
    element.className = 'absolute pointer-events-none';
    element.style.cssText = `
      width: ${this.config.size.min + seededRandom(index * 7) * (this.config.size.max - this.config.size.min)}px;
      height: ${this.config.size.min + seededRandom(index * 11) * (this.config.size.max - this.config.size.min)}px;
      background-color: ${this.config.colors[Math.floor(seededRandom(index * 13) * this.config.colors.length)]};
      border-radius: 50%;
      transform: translate3d(0, 0, 0);
      will-change: transform, opacity;
      backface-visibility: hidden;
    `;
    this.container.appendChild(element);
    return element;
  }

  /**
   * Get particle from pool or create new one
   */
  private getParticle(): Particle | null {
    const particle = this.particlePool.pop();
    if (particle) {
      particle.active = true;
      this.particles.push(particle);
      return particle;
    }
    return null;
  }

  /**
   * Return particle to pool
   */
  private returnParticle(particle: Particle): void {
    particle.active = false;
    particle.element.style.opacity = '0';
    const index = this.particles.indexOf(particle);
    if (index > -1) {
      this.particles.splice(index, 1);
      this.particlePool.push(particle);
    }
  }

  /**
   * Spawn a new particle
   */
  public spawnParticle(x: number, y: number, vx: number = 0, vy: number = 0): void {
    const particle = this.getParticle();
    if (!particle) return;

    particle.x = x;
    particle.y = y;
    particle.vx = vx;
    particle.vy = vy;
    particle.opacity = this.config.opacity.min + Math.random() * (this.config.opacity.max - this.config.opacity.min);
    particle.scale = 0.5 + Math.random() * 0.5;

    this.updateParticleElement(particle);
  }

  /**
   * Update particle position and appearance
   */
  private updateParticleElement(particle: Particle): void {
    const { element, x, y, opacity, scale } = particle;
    element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    element.style.opacity = opacity.toString();
  }

  /**
   * Update all particles
   */
  private updateParticles(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      
      // Update opacity (fade out over time)
      particle.opacity -= deltaTime / this.config.lifetime;
      
      // Remove if faded out or out of bounds
      if (particle.opacity <= 0 || 
          particle.x < -50 || particle.x > this.container.offsetWidth + 50 ||
          particle.y < -50 || particle.y > this.container.offsetHeight + 50) {
        this.returnParticle(particle);
        continue;
      }
      
      this.updateParticleElement(particle);
    }
  }

  /**
   * Animation loop
   */
  private animate = (currentTime: number): void => {
    if (!this.isRunning) return;

    const deltaTime = Math.min((currentTime - (this.lastTime || currentTime)) / 1000, 0.016); // Cap at 60fps
    this.lastTime = currentTime;

    this.updateParticles(deltaTime);
    this.animationFrame = requestAnimationFrame(this.animate);
  };

  private lastTime: number = 0;

  /**
   * Start particle system
   */
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  /**
   * Stop particle system
   */
  public stop(): void {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
    }
  }

  /**
   * Reset particle system
   */
  public reset(): void {
    this.stop();
    
    // Return all active particles to pool
    while (this.particles.length > 0) {
      this.returnParticle(this.particles[0]);
    }
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    this.reset();
    
    // Remove all particle elements
    [...this.particlePool, ...this.particles].forEach(particle => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    
    this.particles = [];
    this.particlePool = [];
  }
}

/**
 * Flow Animation Utility
 * Creates flowing particle streams
 */
export class FlowAnimation {
  private container: HTMLElement;
  private paths: SVGPathElement[] = [];
  private particles: HTMLElement[] = [];
  private animationFrame: number = 0;
  private isRunning: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Create SVG path for particle flow
   */
  public createPath(pathData: string, className: string = ''): SVGPathElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', `absolute inset-0 pointer-events-none ${className}`);
    svg.style.cssText = 'width: 100%; height: 100%;';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'transparent');
    
    svg.appendChild(path);
    this.container.appendChild(svg);
    this.paths.push(path);
    
    return path;
  }

  /**
   * Animate particle along path
   */
  public animateAlongPath(path: SVGPathElement, particleClass: string, duration: number = 3000): void {
    const particle = document.createElement('div');
    particle.className = `absolute pointer-events-none ${particleClass}`;
    particle.style.cssText = `
      width: 4px;
      height: 4px;
      border-radius: 50%;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    `;
    
    this.container.appendChild(particle);
    this.particles.push(particle);

    const pathLength = path.getTotalLength();
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      
      const point = path.getPointAtLength(progress * pathLength);
      particle.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      particle.style.opacity = Math.sin(progress * Math.PI).toString();
      
      if (this.isRunning) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Start flow animation
   */
  public start(): void {
    this.isRunning = true;
  }

  /**
   * Stop flow animation
   */
  public stop(): void {
    this.isRunning = false;
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    this.stop();
    
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    
    this.paths.forEach(path => {
      const svg = path.parentNode;
      if (svg && svg.parentNode) {
        svg.parentNode.removeChild(svg);
      }
    });
    
    this.particles = [];
    this.paths = [];
  }
}

/**
 * Connection Network Utility
 * Creates neural network-style connections
 */
export class ConnectionNetwork {
  private container: HTMLElement;
  private nodes: { x: number; y: number; element: HTMLElement }[] = [];
  private connections: SVGLineElement[] = [];
  private svg: SVGSVGElement;
  private pulseAnimations: number[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.svg = this.createSVG();
  }

  private createSVG(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'absolute inset-0 pointer-events-none');
    svg.style.cssText = 'width: 100%; height: 100%;';
    this.container.appendChild(svg);
    return svg;
  }

  /**
   * Add node to network
   */
  public addNode(x: number, y: number, className: string = ''): void {
    const element = document.createElement('div');
    element.className = `absolute pointer-events-none w-2 h-2 bg-auxo-green/60 rounded-full ${className}`;
    element.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
      will-change: transform, opacity;
    `;
    
    this.container.appendChild(element);
    this.nodes.push({ x, y, element });
  }

  /**
   * Connect two nodes
   */
  public connectNodes(nodeIndex1: number, nodeIndex2: number): void {
    if (nodeIndex1 >= this.nodes.length || nodeIndex2 >= this.nodes.length) return;

    const node1 = this.nodes[nodeIndex1];
    const node2 = this.nodes[nodeIndex2];
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${node1.x}%`);
    line.setAttribute('y1', `${node1.y}%`);
    line.setAttribute('x2', `${node2.x}%`);
    line.setAttribute('y2', `${node2.y}%`);
    line.setAttribute('stroke', 'rgba(154, 205, 50, 0.3)');
    line.setAttribute('stroke-width', '1');
    
    this.svg.appendChild(line);
    this.connections.push(line);
  }

  /**
   * Animate pulse along connection
   */
  public pulseConnection(connectionIndex: number, duration: number = 2000): void {
    if (connectionIndex >= this.connections.length) return;

    const connection = this.connections[connectionIndex];
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      
      const opacity = 0.3 + 0.7 * Math.sin(progress * Math.PI * 2);
      connection.setAttribute('stroke', `rgba(154, 205, 50, ${opacity})`);
      
      const animationId = requestAnimationFrame(animate);
      this.pulseAnimations.push(animationId);
    };

    requestAnimationFrame(animate);
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    this.pulseAnimations.forEach(id => cancelAnimationFrame(id));
    this.pulseAnimations = [];
    
    this.nodes.forEach(node => {
      if (node.element.parentNode) {
        node.element.parentNode.removeChild(node.element);
      }
    });
    
    if (this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
    
    this.nodes = [];
    this.connections = [];
  }
}

/**
 * Geometric Transformation Utilities
 */
export class GeometricTransforms {
  /**
   * Create organized grid positions from chaos
   */
  static organizeToGrid(
    chaosPositions: { x: number; y: number }[],
    gridCols: number,
    gridRows: number,
    containerWidth: number,
    containerHeight: number
  ): { x: number; y: number }[] {
    const organized: { x: number; y: number }[] = [];
    const cellWidth = containerWidth / gridCols;
    const cellHeight = containerHeight / gridRows;
    
    for (let i = 0; i < Math.min(chaosPositions.length, gridCols * gridRows); i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      
      organized.push({
        x: col * cellWidth + cellWidth / 2,
        y: row * cellHeight + cellHeight / 2
      });
    }
    
    return organized;
  }

  /**
   * Create curved path between two points
   */
  static createCurvedPath(
    x1: number, y1: number,
    x2: number, y2: number,
    curvature: number = 0.5
  ): string {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const controlOffset = distance * curvature;
    
    // Calculate perpendicular offset for curve
    const angle = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
    const controlX = midX + Math.cos(angle) * controlOffset;
    const controlY = midY + Math.sin(angle) * controlOffset;
    
    return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
  }

  /**
   * Generate orbital positions around a center point
   */
  static generateOrbitalPositions(
    centerX: number,
    centerY: number,
    radius: number,
    count: number,
    offset: number = 0
  ): { x: number; y: number; angle: number }[] {
    const positions: { x: number; y: number; angle: number }[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + offset;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      positions.push({ x, y, angle });
    }
    
    return positions;
  }
}