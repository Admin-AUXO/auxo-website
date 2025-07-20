/**
 * Enhanced Next.js configuration with comprehensive performance optimizations,
 * security headers, and conditional bundle analysis support.
 * 
 * Features:
 * - Package import optimization for reduced bundle size
 * - Advanced image optimization with multiple formats
 * - Comprehensive security headers
 * - Performance monitoring integration
 * - Conditional bundle analysis
 * - Code splitting optimizations
 * 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'framer-motion', 
      'lucide-react', 
      '@vercel/analytics',
      '@vercel/speed-insights'
    ],
    // Enable modern bundling optimizations
    esmExternals: true,
    // Optimize server components
    serverComponentsExternalPackages: ['sharp'],
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Performance budgets and optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Image optimization configuration (modified for static export)
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers for enhanced protection
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://calendly.com https://*.calendly.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://www.google-analytics.com https://calendly.com https://*.calendly.com https://vitals.vercel-insights.com",
              "frame-src https://calendly.com https://*.calendly.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  },

  // Compression and optimization settings
  compress: true,
  poweredByHeader: false,
};

// Conditionally add webpack configuration for bundle analysis
// Only when ANALYZE environment variable is set to 'true'
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}