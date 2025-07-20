/**
 * LazySection component for performance optimization
 * Renders content only when it comes into viewport using Intersection Observer
 */

'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * Props for the LazySection component
 */
interface LazySectionProps {
  /** Content to render when section is visible */
  children: ReactNode;
  /** Fallback content to show while loading */
  fallback?: ReactNode;
  /** CSS class names */
  className?: string;
  /** Intersection threshold (0-1) */
  threshold?: number;
  /** Root margin for intersection detection */
  rootMargin?: string;
  /** Minimum height for the section before loading */
  minHeight?: string | number;
  /** Animation delay after becoming visible */
  animationDelay?: number;
  /** Whether to trigger only once or multiple times */
  triggerOnce?: boolean;
  /** Callback when section becomes visible */
  onVisible?: () => void;
}

/**
 * LazySection component with intersection observer for performance optimization
 * 
 * Features:
 * - Lazy loading of section content
 * - Intersection Observer API for viewport detection
 * - Customizable thresholds and margins
 * - Animation support with delays
 * - Fallback content during loading
 * - Performance monitoring
 * 
 * @param props - LazySection component props
 * @returns Section that loads content when visible
 * 
 * @example
 * ```tsx
 * <LazySection
 *   fallback={<div className="h-96 bg-gray-100 animate-pulse" />}
 *   threshold={0.2}
 *   rootMargin="100px"
 *   onVisible={() => console.log('Section visible')}
 * >
 *   <ExpensiveComponent />
 * </LazySection>
 * ```
 */
export default function LazySection({
  children,
  fallback = null,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  minHeight,
  animationDelay = 0,
  triggerOnce = true,
  onVisible,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            onVisible?.();

            // Handle animation delay
            if (animationDelay > 0) {
              setTimeout(() => {
                setIsAnimated(true);
              }, animationDelay);
            } else {
              setIsAnimated(true);
            }

            // Disconnect observer if triggerOnce is true
            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(currentSection);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
            setIsAnimated(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing
    observerRef.current.observe(currentSection);

    // Cleanup
    return () => {
      if (observerRef.current && currentSection) {
        observerRef.current.unobserve(currentSection);
      }
    };
  }, [threshold, rootMargin, animationDelay, triggerOnce, onVisible]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all duration-500 ease-out',
        isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4',
        className
      )}
      style={{
        minHeight: minHeight || 'auto',
      }}
      data-lazy-section={isVisible ? 'loaded' : 'loading'}
    >
      {isVisible ? children : fallback}
    </div>
  );
}

/**
 * Hook for using intersection observer with custom logic
 * 
 * @param options - Intersection observer options
 * @returns Object with ref and visibility state
 * 
 * @example
 * ```tsx
 * const { ref, isVisible, entry } = useIntersectionObserver({
 *   threshold: 0.5,
 *   rootMargin: '20px'
 * });
 * ```
 */
export function useIntersectionObserver(options: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  const ref = (node: HTMLElement | null) => {
    elementRef.current = node;
  };

  return { ref, isVisible, entry };
}