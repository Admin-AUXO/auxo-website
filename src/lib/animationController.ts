/**
 * Central Animation Controller
 * 
 * Manages all animations across the website with:
 * - Intersection Observer for performance
 * - Reduced motion detection
 * - Performance monitoring
 * - Error handling and graceful fallbacks
 */

export interface AnimationConfig {
  particleCount: number;
  animationDuration: number;
  colors: string[];
  respectsReducedMotion: boolean;
  performanceThreshold: number;
}

export interface SectionAnimation {
  config: AnimationConfig;
  init(container: HTMLElement): void;
  start(): void;
  pause(): void;
  cleanup(): void;
}

export interface AnimationState {
  isActive: boolean;
  currentSection: string;
  performanceMetrics: PerformanceMetrics;
  reducedMotionEnabled: boolean;
  visibleSections: Set<string>;
}

export interface PerformanceMetrics {
  frameRate: number;
  memoryUsage: number;
  animationCount: number;
  lastFrameTime: number;
}

class AnimationController {
  private static instance: AnimationController;
  private intersectionObserver: IntersectionObserver | null = null;
  private animations: Map<string, SectionAnimation> = new Map();
  private state: AnimationState;
  private performanceMonitorId: number | null = null;
  private frameRateThreshold = 30;
  private memoryThreshold = 50; // MB

  private constructor() {
    this.state = {
      isActive: true,
      currentSection: '',
      performanceMetrics: {
        frameRate: 60,
        memoryUsage: 0,
        animationCount: 0,
        lastFrameTime: performance.now()
      },
      reducedMotionEnabled: this.detectReducedMotion(),
      visibleSections: new Set()
    };
  }

  public static getInstance(): AnimationController {
    if (!AnimationController.instance) {
      AnimationController.instance = new AnimationController();
    }
    return AnimationController.instance;
  }

  /**
   * Initialize the animation system
   */
  public init(): void {
    if (typeof window === 'undefined') return;

    this.setupIntersectionObserver();
    this.startPerformanceMonitoring();
    this.setupReducedMotionListener();
  }

  /**
   * Register a section animation
   */
  public registerSection(sectionId: string, animation: SectionAnimation): void {
    this.animations.set(sectionId, animation);
    this.state.performanceMetrics.animationCount = this.animations.size;
  }

  /**
   * Unregister a section animation
   */
  public unregisterSection(sectionId: string): void {
    const animation = this.animations.get(sectionId);
    if (animation) {
      animation.cleanup();
      this.animations.delete(sectionId);
      this.state.visibleSections.delete(sectionId);
      this.state.performanceMetrics.animationCount = this.animations.size;
    }
  }

  /**
   * Handle intersection observer changes
   */
  public handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      const animation = this.animations.get(sectionId);
      
      if (!animation) return;

      if (entry.isIntersecting) {
        this.state.visibleSections.add(sectionId);
        this.state.currentSection = sectionId;
        
        if (!this.state.reducedMotionEnabled && this.state.isActive) {
          animation.start();
        }
      } else {
        this.state.visibleSections.delete(sectionId);
        animation.pause();
      }
    });
  }

  /**
   * Get current animation state
   */
  public getState(): AnimationState {
    return { ...this.state };
  }

  /**
   * Enable or disable animations globally
   */
  public setActive(active: boolean): void {
    this.state.isActive = active;
    
    if (!active) {
      // Pause all animations
      this.animations.forEach(animation => animation.pause());
    } else if (!this.state.reducedMotionEnabled) {
      // Resume visible animations
      this.state.visibleSections.forEach(sectionId => {
        const animation = this.animations.get(sectionId);
        if (animation) animation.start();
      });
    }
  }

  /**
   * Cleanup all resources
   */
  public destroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.performanceMonitorId) {
      cancelAnimationFrame(this.performanceMonitorId);
      this.performanceMonitorId = null;
    }

    this.animations.forEach(animation => animation.cleanup());
    this.animations.clear();
    this.state.visibleSections.clear();
  }

  /**
   * Setup intersection observer for performance optimization
   */
  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, animations will run continuously');
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        root: null,
        rootMargin: '50px',
        threshold: [0.1, 0.5]
      }
    );

    // Observe all sections with animations
    document.querySelectorAll('section[id]').forEach(section => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(section);
      }
    });
  }

  /**
   * Monitor performance and adjust animations accordingly
   */
  private startPerformanceMonitoring(): void {
    const monitor = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.state.performanceMetrics.lastFrameTime;
      
      // Calculate frame rate
      this.state.performanceMetrics.frameRate = 1000 / deltaTime;
      this.state.performanceMetrics.lastFrameTime = currentTime;

      // Check memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        this.state.performanceMetrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024;
      }

      // Performance degradation handling
      if (this.state.performanceMetrics.frameRate < this.frameRateThreshold) {
        this.handlePerformanceDegradation('low_framerate');
      }

      if (this.state.performanceMetrics.memoryUsage > this.memoryThreshold) {
        this.handlePerformanceDegradation('high_memory');
      }

      this.performanceMonitorId = requestAnimationFrame(monitor);
    };

    this.performanceMonitorId = requestAnimationFrame(monitor);
  }

  /**
   * Handle performance degradation
   */
  private handlePerformanceDegradation(reason: 'low_framerate' | 'high_memory'): void {
    console.warn(`Performance degradation detected: ${reason}`, this.state.performanceMetrics);
    
    // Reduce animation complexity or disable animations
    if (this.state.performanceMetrics.frameRate < 15) {
      this.setActive(false);
      console.warn('Animations disabled due to severe performance issues');
    }
  }

  /**
   * Detect reduced motion preference
   */
  private detectReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Setup reduced motion preference listener
   */
  private setupReducedMotionListener(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      this.state.reducedMotionEnabled = e.matches;
      
      if (e.matches) {
        // Disable animations
        this.animations.forEach(animation => animation.pause());
      } else if (this.state.isActive) {
        // Re-enable animations for visible sections
        this.state.visibleSections.forEach(sectionId => {
          const animation = this.animations.get(sectionId);
          if (animation) animation.start();
        });
      }
    };

    mediaQuery.addEventListener('change', handleChange);
  }
}

/**
 * Animation Error Handler
 */
export class AnimationErrorHandler {
  static handleAnimationError(error: Error, sectionId: string): void {
    console.warn(`Animation error in ${sectionId}:`, error);
    
    // Apply static fallback
    this.applyStaticFallback(sectionId);
    
    // Disable problematic section
    const controller = AnimationController.getInstance();
    controller.unregisterSection(sectionId);
  }

  static applyStaticFallback(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Apply static background gradients based on section
    const fallbackClasses = {
      hero: 'bg-gradient-to-br from-rich-black via-graphite to-dark-bg',
      challenge: 'bg-gradient-to-b from-rich-black to-dark-bg',
      framework: 'bg-gradient-to-br from-petrol-ink/20 to-dark-bg',
      impact: 'bg-gradient-to-r from-dark-bg via-petrol-ink/10 to-dark-bg',
      engagement: 'bg-gradient-to-br from-dark-bg to-petrol-ink/20',
      footer: 'bg-gradient-to-t from-petrol-ink to-dark-bg'
    };

    const fallbackClass = fallbackClasses[sectionId as keyof typeof fallbackClasses] || 'bg-dark-bg';
    section.classList.add(fallbackClass);
  }
}

// Export singleton instance
export const animationController = AnimationController.getInstance();