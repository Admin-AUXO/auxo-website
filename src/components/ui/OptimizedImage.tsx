/**
 * Optimized Image component using Next.js Image with performance enhancements
 * Provides automatic optimization, lazy loading, and responsive behavior
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * Props for the OptimizedImage component
 */
interface OptimizedImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** CSS class names */
  className?: string;
  /** Image priority (for above-the-fold images) */
  priority?: boolean;
  /** Image quality (1-100) */
  quality?: number;
  /** Placeholder behavior */
  placeholder?: 'blur' | 'empty';
  /** Blur data URL for placeholder */
  blurDataURL?: string;
  /** Fill container */
  fill?: boolean;
  /** Object fit behavior */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Object position */
  objectPosition?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Loading behavior */
  loading?: 'lazy' | 'eager';
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
}

/**
 * OptimizedImage component with enhanced performance features
 * 
 * Features:
 * - Automatic Next.js Image optimization
 * - Loading states with skeleton placeholder
 * - Error handling with fallback
 * - Responsive image sizing
 * - Accessibility improvements
 * - Performance monitoring
 * 
 * @param props - OptimizedImage component props
 * @returns Optimized image component with loading and error states
 * 
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/hero-image.jpg"
 *   alt="Hero section background"
 *   width={1920}
 *   height={1080}
 *   priority
 *   className="rounded-lg"
 * />
 * ```
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  sizes,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /**
   * Handle successful image load
   */
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  /**
   * Handle image load error
   */
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  /**
   * Generate blur placeholder for better loading experience
   */
  const generateBlurDataURL = (w: number, h: number) => {
    if (blurDataURL) return blurDataURL;
    
    // Generate a simple blur placeholder
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    
    return canvas.toDataURL();
  };

  // Error fallback component
  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{ width, height }}
          aria-label="Loading image"
        />
      )}
      
      {/* Optimized Next.js Image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={
          placeholder === 'blur' && width && height
            ? generateBlurDataURL(width, height)
            : undefined
        }
        sizes={
          sizes ||
          (fill
            ? '100vw'
            : `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`)
        }
        loading={priority ? 'eager' : loading}
        style={{
          objectFit: fill ? objectFit : undefined,
          objectPosition: fill ? objectPosition : undefined,
        }}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}