import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/sections/HeroSection';
import LazySection from '../components/ui/LazySection';

// Lazy load sections that are below the fold for better initial page load performance
const ChallengeSection = dynamic(() => import('../components/sections/ChallengeSection'), {
  loading: () => <div className="h-96 bg-graphite/20 animate-pulse" />,
  ssr: true,
});

const FrameworkSection = dynamic(() => import('../components/sections/FrameworkSection'), {
  loading: () => <div className="h-96 bg-graphite/20 animate-pulse" />,
  ssr: true,
});

const ImpactSection = dynamic(() => import('../components/sections/ImpactSection'), {
  loading: () => <div className="h-96 bg-graphite/20 animate-pulse" />,
  ssr: true,
});

const EngagementSection = dynamic(() => import('../components/sections/EngagementSection'), {
  loading: () => <div className="h-96 bg-graphite/20 animate-pulse" />,
  ssr: true,
});

/**
 * Home page component with performance optimizations
 * 
 * Features:
 * - Hero section loads immediately for above-the-fold content
 * - Below-the-fold sections are lazy-loaded for better initial page performance
 * - Intersection observer-based lazy loading for optimal user experience
 * - Loading states with skeleton placeholders
 * - Proper semantic HTML structure for accessibility
 * - Optimized for Core Web Vitals (LCP, FID, CLS)
 * 
 * @returns Optimized home page with lazy-loaded sections
 */
export default function Home() {
  return (
    <>
      <main 
        className="pt-16 overflow-x-hidden" 
        role="main"
        aria-label="AUXO Data Co. main content"
      >
        {/* Hero Section - Above the fold, loads immediately */}
        <HeroSection />
        
        {/* Challenge Section - Lazy loaded with intersection observer */}
        <LazySection
          fallback={<div className="h-96 bg-graphite/10 animate-pulse rounded-lg mx-4" />}
          threshold={0.2}
          rootMargin="100px"
          className="transition-opacity duration-700"
        >
          <Suspense fallback={<div className="h-96 bg-graphite/20 animate-pulse" />}>
            <ChallengeSection />
          </Suspense>
        </LazySection>
        
        {/* Framework Section - Lazy loaded */}
        <LazySection
          fallback={<div className="h-96 bg-graphite/10 animate-pulse rounded-lg mx-4" />}
          threshold={0.2}
          rootMargin="100px"
          className="transition-opacity duration-700"
        >
          <Suspense fallback={<div className="h-96 bg-graphite/20 animate-pulse" />}>
            <FrameworkSection />
          </Suspense>
        </LazySection>
        
        {/* Impact Section - Lazy loaded */}
        <LazySection
          fallback={<div className="h-96 bg-graphite/10 animate-pulse rounded-lg mx-4" />}
          threshold={0.2}
          rootMargin="100px"
          className="transition-opacity duration-700"
        >
          <Suspense fallback={<div className="h-96 bg-graphite/20 animate-pulse" />}>
            <ImpactSection />
          </Suspense>
        </LazySection>
        
        {/* Engagement Section - Lazy loaded */}
        <LazySection
          fallback={<div className="h-96 bg-graphite/10 animate-pulse rounded-lg mx-4" />}
          threshold={0.2}
          rootMargin="100px"
          className="transition-opacity duration-700"
        >
          <Suspense fallback={<div className="h-96 bg-graphite/20 animate-pulse" />}>
            <EngagementSection />
          </Suspense>
        </LazySection>
      </main>
    </>
  );
}