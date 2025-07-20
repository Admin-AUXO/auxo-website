/**
 * Performance optimization utilities for Next.js application
 * Provides lazy loading, code splitting, and performance monitoring helpers
 */

import React, { lazy, ComponentType, LazyExoticComponent, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

/**
 * Enhanced lazy loading with error boundaries and loading states
 * 
 * @param importFn - Function that returns a dynamic import promise
 * @param fallback - Optional fallback component during loading
 * @returns Lazy-loaded component with error handling
 * 
 * @example
 * ```tsx
 * const LazyComponent = createLazyComponent(
 *   () => import('./HeavyComponent'),
 *   () => <div>Loading...</div>
 * );
 * ```
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
): LazyExoticComponent<T> {
  const ErrorFallback = () => React.createElement('div', null, 'Failed to load component');
  
  return lazy(async () => {
    try {
      const componentModule = await importFn();
      return componentModule;
    } catch (error) {
      console.error('Failed to load component:', error);
      // Return a fallback component in case of error
      return {
        default: (fallback || ErrorFallback) as T
      };
    }
  });
}

/**
 * Next.js dynamic import with optimized loading options
 * 
 * @param importFn - Function that returns a dynamic import promise
 * @param options - Dynamic import options
 * @returns Dynamically imported component
 * 
 * @example
 * ```tsx
 * const DynamicComponent = createDynamicComponent(
 *   () => import('./HeavyComponent'),
 *   { loading: () => <Spinner /> }
 * );
 * ```
 */
export function createDynamicComponent<T = {}>(
  importFn: () => Promise<any>,
  options: {
    loading?: () => React.ReactElement | null;
    ssr?: boolean;
    suspense?: boolean;
  } = {}
) {
  const DefaultLoading = () => React.createElement('div', { className: 'animate-pulse' }, 'Loading...');
  
  return dynamic(importFn, {
    loading: options.loading || DefaultLoading,
    ssr: options.ssr ?? true,
    suspense: options.suspense ?? false,
  });
}

/**
 * Intersection Observer hook for lazy loading elements
 * 
 * @param threshold - Intersection threshold (0-1)
 * @param rootMargin - Root margin for intersection detection
 * @returns Ref and visibility state
 * 
 * @example
 * ```tsx
 * const { ref, isVisible } = useIntersectionObserver();
 * return <div ref={ref}>{isVisible && <ExpensiveComponent />}</div>;
 * ```
 */
export function useIntersectionObserver(
  threshold: number = 0.1,
  rootMargin: string = '50px'
) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, threshold, rootMargin]);

  const ref = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  return { ref, isVisible };
}

/**
 * Debounce hook for performance optimization
 * 
 * @param value - Value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced value
 * 
 * @example
 * ```tsx
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Performance metrics tracking
 * 
 * @param metricName - Name of the metric to track
 * @param value - Metric value
 * @param threshold - Performance threshold for warnings
 */
export function trackPerformanceMetric(
  metricName: string,
  value: number,
  threshold?: number
): void {
  // Log performance metric
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance Metric - ${metricName}: ${value}ms`);
    
    if (threshold && value > threshold) {
      console.warn(`Performance Warning - ${metricName} exceeded threshold: ${value}ms > ${threshold}ms`);
    }
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_metric', {
      metric_name: metricName,
      metric_value: value,
      custom_parameter: threshold ? value > threshold : false
    });
  }
}

/**
 * Image preloader for performance optimization
 * 
 * @param imageSources - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 * 
 * @example
 * ```tsx
 * useEffect(() => {
 *   preloadImages(['/hero-bg.jpg', '/logo.png']);
 * }, []);
 * ```
 */
export function preloadImages(imageSources: string[]): Promise<void[]> {
  const imagePromises = imageSources.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  });

  return Promise.all(imagePromises);
}

/**
 * Resource hints for performance optimization
 * Adds preload, prefetch, and preconnect hints to the document head
 * 
 * @param resources - Array of resource hint objects
 * 
 * @example
 * ```tsx
 * useEffect(() => {
 *   addResourceHints([
 *     { href: '/api/data', as: 'fetch', type: 'prefetch' },
 *     { href: 'https://fonts.googleapis.com', type: 'preconnect' }
 *   ]);
 * }, []);
 * ```
 */
export function addResourceHints(
  resources: Array<{
    href: string;
    as?: string;
    type: 'preload' | 'prefetch' | 'preconnect';
    crossOrigin?: boolean;
  }>
): void {
  if (typeof document === 'undefined') return;

  resources.forEach(({ href, as, type, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = type;
    link.href = href;
    
    if (as) link.as = as;
    if (crossOrigin) link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
  });
}

