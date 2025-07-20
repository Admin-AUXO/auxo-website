/**
 * Utility functions for the Next.js application
 * Provides common functionality for styling, DOM manipulation, and performance optimization
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * Handles conditional classes and resolves Tailwind CSS conflicts
 * 
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'text-white')
 * // Returns: "px-4 py-2 bg-blue-500 text-white"
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to an element by ID with performance optimization
 * Uses requestAnimationFrame for better performance and checks element existence
 * 
 * @param elementId - ID of the target element to scroll to
 * @param offset - Optional offset from the top of the element (default: 0)
 * @param behavior - Scroll behavior ('smooth' | 'auto' | 'instant')
 * 
 * @example
 * ```tsx
 * scrollToElement('hero-section', -80, 'smooth'); // Account for fixed header
 * ```
 */
export function scrollToElement(
  elementId: string, 
  offset: number = 0, 
  behavior: ScrollBehavior = 'smooth'
): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior
    });
  }
}

/**
 * Checks if an element is currently visible in the viewport
 * Useful for lazy loading and scroll-based animations
 * 
 * @param element - DOM element to check
 * @param threshold - Percentage of element that must be visible (0-1)
 * @returns Boolean indicating if element is in viewport
 * 
 * @example
 * ```tsx
 * const isVisible = isInViewport(myElement, 0.5); // 50% visible
 * ```
 */
export function isInViewport(element: Element, threshold: number = 0): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const verticalVisible = (rect.bottom >= windowHeight * threshold) && 
                         (rect.top <= windowHeight * (1 - threshold));
  const horizontalVisible = (rect.right >= windowWidth * threshold) && 
                           (rect.left <= windowWidth * (1 - threshold));
  
  return verticalVisible && horizontalVisible;
}

/**
 * Debounces function calls to improve performance
 * Prevents excessive function calls during rapid events (scroll, resize, input)
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 * 
 * @example
 * ```tsx
 * const debouncedSearch = debounce(searchFunction, 300);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles function calls to limit execution frequency
 * Ensures function is called at most once per specified interval
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 * 
 * @example
 * ```tsx
 * const throttledScroll = throttle(handleScroll, 16); // ~60fps
 * ```
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Formats numbers with appropriate suffixes for better readability
 * Useful for displaying large numbers in UI components
 * 
 * @param num - Number to format
 * @param precision - Decimal places to show (default: 1)
 * @returns Formatted number string
 * 
 * @example
 * ```tsx
 * formatNumber(1500) // "1.5K"
 * formatNumber(1000000) // "1.0M"
 * ```
 */
export function formatNumber(num: number, precision: number = 1): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.log10(Math.abs(num)) / 3 | 0;
  
  if (tier === 0) return num.toString();
  
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;
  
  return scaled.toFixed(precision) + suffix;
}

/**
 * Safely parses JSON with error handling
 * Returns default value if parsing fails
 * 
 * @param jsonString - JSON string to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed object or default value
 * 
 * @example
 * ```tsx
 * const data = safeJsonParse(localStorage.getItem('settings'), {});
 * ```
 */
export function safeJsonParse<T>(jsonString: string | null, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return defaultValue;
  }
}

/**
 * Generates a random ID string for component keys or unique identifiers
 * 
 * @param length - Length of the generated ID (default: 8)
 * @returns Random alphanumeric string
 * 
 * @example
 * ```tsx
 * const uniqueId = generateId(12); // "a1b2c3d4e5f6"
 * ```
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}