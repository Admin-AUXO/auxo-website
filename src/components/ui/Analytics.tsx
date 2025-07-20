'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Define gtag types
interface GtagQueue {
  q?: unknown[][]
}

declare global {
  interface Window {
    gtag: {
      (...args: unknown[]): void
    } & GtagQueue
    dataLayer: unknown[]
  }
}

export default function Analytics() {
  useEffect(() => {
    // Initialize gtag with consent mode
    if (typeof window !== 'undefined') {
      window.gtag = window.gtag || function(...args: unknown[]) {
        window.gtag.q = window.gtag.q || []
        window.gtag.q.push(args)
      }
      window.gtag('js', new Date())
      
      // Set default consent state
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
      })

      // Check for existing consent
      const analyticsConsent = localStorage.getItem('analytics-consent')
      if (analyticsConsent === 'true') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      }

      // Configure GA
      if (GA_MEASUREMENT_ID) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
        })
      }
    }
  }, [])

  // Don't render scripts if no measurement ID
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500,
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}