// Analytics utilities and event tracking

// Define analytics events
export const analyticsEvents = {
  // Page events
  PAGE_VIEW: 'page_view',
  
  // Engagement events
  CTA_CLICK: 'cta_click',
  SECTION_VIEW: 'section_view',
  PILLAR_TAB_CLICK: 'pillar_tab_click',
  IMPACT_CARD_HOVER: 'impact_card_hover',
  
  // Conversion events
  SCHEDULE_CLICK: 'schedule_click',
  CALENDAR_OPEN: 'calendar_open',
  MEETING_SCHEDULED: 'meeting_scheduled',
  
  // Performance events
  PERFORMANCE_ISSUE: 'performance_issue',
  ERROR_OCCURRED: 'error_occurred',
  
  // Cookie consent events
  COOKIE_CONSENT_SHOWN: 'cookie_consent_shown',
  COOKIE_CONSENT_ACCEPTED: 'cookie_consent_accepted',
  COOKIE_CONSENT_DECLINED: 'cookie_consent_declined',
} as const

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return
  
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: Date.now(),
    })
  }
  
  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters)
  }
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  trackEvent(analyticsEvents.PAGE_VIEW, {
    page_location: url,
    page_title: title,
  })
}

// Track CTA clicks
export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent(analyticsEvents.CTA_CLICK, {
    cta_text: ctaText,
    cta_location: location,
  })
}

// Track section views (scroll-based)
export const trackSectionView = (sectionName: string, timeSpent?: number) => {
  trackEvent(analyticsEvents.SECTION_VIEW, {
    section_name: sectionName,
    time_spent: timeSpent,
  })
}

// Track pillar tab interactions
export const trackPillarTabClick = (pillarId: string, pillarTitle: string) => {
  trackEvent(analyticsEvents.PILLAR_TAB_CLICK, {
    pillar_id: pillarId,
    pillar_title: pillarTitle,
  })
}

// Track impact card interactions
export const trackImpactCardHover = (cardIndex: number, client: string) => {
  trackEvent(analyticsEvents.IMPACT_CARD_HOVER, {
    card_index: cardIndex,
    client_type: client,
  })
}

// Track scheduling interactions
export const trackSchedulingEvent = (eventType: 'click' | 'open' | 'scheduled', details?: Record<string, unknown>) => {
  const eventMap = {
    click: analyticsEvents.SCHEDULE_CLICK,
    open: analyticsEvents.CALENDAR_OPEN,
    scheduled: analyticsEvents.MEETING_SCHEDULED,
  }
  
  trackEvent(eventMap[eventType], details)
}

// Track performance issues
export const trackPerformanceIssue = (metric: string, value: number, threshold: number) => {
  trackEvent(analyticsEvents.PERFORMANCE_ISSUE, {
    metric_name: metric,
    metric_value: value,
    threshold_value: threshold,
    severity: value > threshold * 1.5 ? 'high' : 'medium',
  })
}

// Track errors
export const trackError = (errorMessage: string, errorStack?: string, errorType?: string) => {
  trackEvent(analyticsEvents.ERROR_OCCURRED, {
    error_message: errorMessage,
    error_stack: errorStack,
    error_type: errorType,
  })
}

// Track cookie consent
export const trackCookieConsent = (action: 'shown' | 'accepted' | 'declined') => {
  const eventMap = {
    shown: analyticsEvents.COOKIE_CONSENT_SHOWN,
    accepted: analyticsEvents.COOKIE_CONSENT_ACCEPTED,
    declined: analyticsEvents.COOKIE_CONSENT_DECLINED,
  }
  
  trackEvent(eventMap[action])
}