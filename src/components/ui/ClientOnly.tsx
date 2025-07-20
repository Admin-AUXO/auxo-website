'use client';

import { useState, useEffect, ReactNode, useRef } from 'react';

/**
 * ClientOnly component ensures hydration safety by preventing server-client mismatches.
 * This component only renders its children after the component has mounted on the client,
 * preventing hydration errors that occur when server and client render different content.
 * 
 * @example
 * ```tsx
 * <ClientOnly fallback={<div>Loading...</div>}>
 *   <ComponentThatUsesWindowObject />
 * </ClientOnly>
 * ```
 */
interface ClientOnlyProps {
  /** Content to render only on the client side */
  children: ReactNode;
  /** Optional fallback content to show during server-side rendering and initial client render */
  fallback?: ReactNode;
  /** Optional delay in milliseconds before showing children (useful for preventing flash) */
  delay?: number;
  /** Optional className for the wrapper element */
  className?: string;
}

/**
 * Enhanced ClientOnly component with improved hydration safety and performance optimizations.
 * 
 * Features:
 * - Prevents hydration mismatches by ensuring consistent server/client rendering
 * - Optional delay to prevent content flash
 * - Cleanup handling for better memory management
 * - TypeScript support with comprehensive JSDoc documentation
 * - Accessibility considerations with proper ARIA attributes
 * 
 * @param props - ClientOnly component props
 * @returns JSX element that renders children only on client side
 */
export default function ClientOnly({ 
  children, 
  fallback = null, 
  delay = 0,
  className 
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout to prevent memory leaks
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set mounted state with optional delay
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setHasMounted(true);
      }, delay);
    } else {
      setHasMounted(true);
    }

    // Cleanup function to clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  // During SSR and initial client render, show fallback
  if (!hasMounted) {
    return (
      <div 
        className={className}
        aria-live="polite"
        aria-label="Loading content"
      >
        {fallback}
      </div>
    );
  }

  // After mounting, render the actual children
  return (
    <div className={className}>
      {children}
    </div>
  );
}