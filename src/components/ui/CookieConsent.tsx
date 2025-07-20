'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield, BarChart3 } from 'lucide-react'
import { trackCookieConsent } from '../../lib/analytics'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
        trackCookieConsent('shown')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('analytics-consent', 'true')
    setShowBanner(false)
    trackCookieConsent('accepted')
    // Initialize analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    localStorage.setItem('analytics-consent', 'false')
    setShowBanner(false)
    trackCookieConsent('declined')
    // Deny analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-rich-black/95 backdrop-blur-sm border-t border-dark-border"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="w-5 h-5 text-auxo-green" />
                <h3 className="text-lg font-semibold text-pure-white">
                  Strategic Intelligence Requires Your Consent
                </h3>
              </div>
              
              <p className="text-limestone text-sm mb-4 max-w-2xl">
                We use cookies to optimize your experience and analyze site performance. 
                Your data privacy is as important to us as your business intelligence.
              </p>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-2 gap-4 mb-4 p-4 bg-graphite/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-auxo-green mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-pure-white mb-1">Essential Cookies</h4>
                          <p className="text-limestone text-sm">
                            Required for site functionality, security, and your scheduled consultations.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-auxo-green mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-pure-white mb-1">Analytics Cookies</h4>
                          <p className="text-limestone text-sm">
                            Help us understand how executives engage with our strategic content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={acceptAll}
                  className="bg-auxo-green text-rich-black px-6 py-2 rounded-lg font-semibold hover:bg-auxo-green/90 transition-colors"
                >
                  Accept All
                </button>
                
                <button
                  onClick={acceptEssential}
                  className="bg-transparent text-pure-white px-6 py-2 rounded-lg font-semibold border border-dark-border hover:bg-dark-border/50 transition-colors"
                >
                  Essential Only
                </button>
                
                <button
                  onClick={toggleDetails}
                  className="text-limestone hover:text-pure-white transition-colors text-sm underline"
                >
                  {showDetails ? 'Hide Details' : 'Cookie Details'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="text-limestone hover:text-pure-white transition-colors p-1"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

