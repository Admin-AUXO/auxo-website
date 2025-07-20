'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { useEffect, useRef } from 'react'
import { trackPerformanceIssue } from '../../lib/analytics'
import { trackPerformanceMetric } from '../../lib/performance'

/**
 * Enhanced Performance Monitoring component with comprehensive metrics tracking
 * 
 * Features:
 * - Core Web Vitals monitoring (LCP, FID, CLS, FCP, TTFB)
 * - Long task detection and reporting
 * - Memory usage monitoring
 * - Resource loading performance
 * - Navigation timing metrics
 * - Error boundary integration
 * - Vercel Analytics and Speed Insights integration
 * 
 * @returns Performance monitoring components and observers
 */
export default function PerformanceMonitoring() {
  const observersRef = useRef<PerformanceObserver[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Initialize performance monitoring only on client side
    if (typeof window === 'undefined') return;

    /**
     * Monitor Core Web Vitals using Performance Observer API
     * Tracks LCP, FID, CLS, FCP, and TTFB metrics
     */
    const initializeCoreWebVitals = () => {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            trackPerformanceMetric('LCP', lastEntry.startTime, 2500);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        observersRef.current.push(lcpObserver);

        // First Input Delay (FID) - using event timing
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Type assertion for PerformanceEventTiming
            const eventEntry = entry as any;
            if (eventEntry.processingStart && eventEntry.startTime) {
              const fidValue = eventEntry.processingStart - eventEntry.startTime;
              trackPerformanceMetric('FID', fidValue, 100);
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        observersRef.current.push(fidObserver);

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (clsValue > 0) {
            trackPerformanceMetric('CLS', clsValue * 1000, 100); // Convert to milliseconds for consistency
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        observersRef.current.push(clsObserver);

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              trackPerformanceMetric('FCP', entry.startTime, 1800);
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        observersRef.current.push(fcpObserver);

      } catch (error) {
        console.warn('Core Web Vitals monitoring not supported:', error);
      }
    };

    /**
     * Monitor long tasks that block the main thread
     * Tasks longer than 50ms are considered performance issues
     */
    const initializeLongTaskMonitoring = () => {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'longtask') {
              trackPerformanceIssue('Long Task', entry.duration, 50);
              trackPerformanceMetric('Long Task', entry.duration, 50);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        observersRef.current.push(longTaskObserver);
      } catch (error) {
        console.warn('Long task monitoring not supported:', error);
      }
    };

    /**
     * Monitor resource loading performance
     * Tracks slow-loading resources and potential bottlenecks
     */
    const initializeResourceMonitoring = () => {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resource = entry as PerformanceResourceTiming;
            const loadTime = resource.responseEnd - resource.startTime;
            
            // Track slow resources (>1000ms)
            if (loadTime > 1000) {
              trackPerformanceIssue('Slow Resource', loadTime, 1000);
              console.warn(`Slow resource detected: ${resource.name} (${loadTime.toFixed(2)}ms)`);
            }

            // Track specific resource types
            if (resource.initiatorType === 'img' && loadTime > 500) {
              trackPerformanceMetric('Image Load Time', loadTime, 500);
            } else if (resource.initiatorType === 'script' && loadTime > 800) {
              trackPerformanceMetric('Script Load Time', loadTime, 800);
            } else if (resource.initiatorType === 'css' && loadTime > 300) {
              trackPerformanceMetric('CSS Load Time', loadTime, 300);
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        observersRef.current.push(resourceObserver);
      } catch (error) {
        console.warn('Resource monitoring not supported:', error);
      }
    };

    /**
     * Monitor memory usage and detect potential memory leaks
     * Checks heap size and warns about high memory usage
     */
    const initializeMemoryMonitoring = () => {
      interface PerformanceWithMemory extends Performance {
        memory?: {
          usedJSHeapSize: number;
          jsHeapSizeLimit: number;
          totalJSHeapSize: number;
        };
      }

      const performanceWithMemory = performance as PerformanceWithMemory;
      
      if (performanceWithMemory.memory) {
        const checkMemory = () => {
          const memory = performanceWithMemory.memory!;
          const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
          
          // Track memory usage
          trackPerformanceMetric('Memory Usage', memory.usedJSHeapSize / 1024 / 1024, 50); // MB
          
          // Warn about high memory usage (>80%)
          if (usagePercentage > 80) {
            trackPerformanceIssue('High Memory Usage', usagePercentage, 80);
            console.warn(`High memory usage detected: ${usagePercentage.toFixed(2)}%`);
          }
        };

        // Check memory every 30 seconds
        const memoryInterval = setInterval(checkMemory, 30000);
        intervalsRef.current.push(memoryInterval);
        
        // Initial check
        checkMemory();
      }
    };

    /**
     * Monitor navigation timing for page load performance
     * Tracks various phases of page loading
     */
    const initializeNavigationMonitoring = () => {
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const navigation = entry as PerformanceNavigationTiming;
            
            // Time to First Byte (TTFB)
            if (navigation.responseStart && navigation.requestStart) {
              const ttfb = navigation.responseStart - navigation.requestStart;
              trackPerformanceMetric('TTFB', ttfb, 600);
            }
            
            // DOM Content Loaded
            if (navigation.domContentLoadedEventEnd && navigation.fetchStart) {
              const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
              trackPerformanceMetric('DOM Content Loaded', domContentLoaded, 1500);
            }
            
            // Page Load Complete
            if (navigation.loadEventEnd && navigation.fetchStart) {
              const pageLoad = navigation.loadEventEnd - navigation.fetchStart;
              trackPerformanceMetric('Page Load Complete', pageLoad, 3000);
            }
            
            // DNS Lookup Time
            if (navigation.domainLookupEnd && navigation.domainLookupStart) {
              const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart;
              if (dnsTime > 0) {
                trackPerformanceMetric('DNS Lookup', dnsTime, 200);
              }
            }
            
            // Connection Time
            if (navigation.connectEnd && navigation.connectStart) {
              const connectionTime = navigation.connectEnd - navigation.connectStart;
              if (connectionTime > 0) {
                trackPerformanceMetric('Connection Time', connectionTime, 300);
              }
            }
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        observersRef.current.push(navigationObserver);
      } catch (error) {
        console.warn('Navigation monitoring not supported:', error);
      }
    };

    // Initialize all monitoring systems
    initializeCoreWebVitals();
    initializeLongTaskMonitoring();
    initializeResourceMonitoring();
    initializeMemoryMonitoring();
    initializeNavigationMonitoring();

    // Cleanup function
    return () => {
      // Disconnect all observers
      observersRef.current.forEach(observer => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer:', error);
        }
      });
      observersRef.current = [];

      // Clear all intervals
      intervalsRef.current.forEach(interval => {
        clearInterval(interval);
      });
      intervalsRef.current = [];
    };
  }, []);

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}