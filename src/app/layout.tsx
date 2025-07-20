import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { seoMetadata } from "../lib/constants";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Analytics from "../components/ui/Analytics";
import PerformanceMonitoring from "../components/ui/PerformanceMonitoring";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import ErrorTracking from "../components/ui/ErrorTracking";
import ClientOnly from "../components/ui/ClientOnly";

// Lazy load CookieConsent for better initial page load performance
import dynamic from 'next/dynamic';
const CookieConsent = dynamic(() => import("../components/ui/CookieConsent"), {
  ssr: false,
  loading: () => null,
});

/**
 * Optimized Montserrat font configuration with performance enhancements
 * - Uses font-display: swap for better loading performance
 * - Preloads only necessary font weights
 * - Optimizes for Latin subset to reduce bundle size
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

/**
 * Optimized Cairo font configuration for Arabic/international support
 * - Uses font-display: swap for better loading performance
 * - Reduced weight variants for better performance
 * - Fallback fonts for better loading experience
 */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false, // Secondary font, loaded on demand
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL(seoMetadata.url),
  title: seoMetadata.title,
  description: seoMetadata.description,
  keywords: seoMetadata.keywords,
  authors: [{ name: "AUXO Data Co." }],
  creator: "AUXO Data Co.",
  publisher: "AUXO Data Co.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "AUXO Data Co. - Strategic Data Intelligence",
      },
    ],
    type: "website",
    url: seoMetadata.url,
    siteName: "AUXO Data Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: [seoMetadata.ogImage],
  },
  alternates: {
    canonical: seoMetadata.url,
  },
};

/**
 * Structured data schema for organization information
 * Helps search engines understand the business context and improves SEO
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AUXO Data Co.",
  description: "Strategic data intelligence and consulting",
  url: seoMetadata.url,
  logo: `${seoMetadata.url}/logo.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English",
  },
  sameAs: [],
};

/**
 * Root layout component for the Next.js application
 * 
 * Features:
 * - Optimized font loading with Next.js font optimization
 * - Performance monitoring and analytics integration
 * - Error boundary for graceful error handling
 * - Lazy-loaded components for better initial page load
 * - SEO optimization with structured data
 * - Accessibility improvements with proper HTML structure
 * - Security headers and CSP configuration
 * 
 * @param props - Layout component props
 * @param props.children - Child components to render in the layout
 * @returns Root HTML structure with optimized performance and SEO
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${cairo.variable} font-montserrat antialiased bg-dark-bg text-pure-white`}
      >
        {/* Skip to content link for keyboard navigation accessibility */}
        <a 
          href="#main-content" 
          className="skip-to-content"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        
        <Analytics />
        <PerformanceMonitoring />
        <ErrorTracking />
        
        <ErrorBoundary>
          <Header />
          <main id="main-content" role="main" className="content-layer">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
        
        {/* Wrap CookieConsent in ClientOnly for hydration safety */}
        <ClientOnly>
          <CookieConsent />
        </ClientOnly>
      </body>
    </html>
  );
}