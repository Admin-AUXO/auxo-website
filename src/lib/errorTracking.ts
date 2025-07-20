// Error tracking and monitoring utilities

interface ErrorReport {
  message: string
  stack?: string
  url: string
  userAgent: string
  timestamp: number
  userId?: string
  sessionId?: string
}

// Initialize error tracking
export const initErrorTracking = () => {
  if (typeof window === 'undefined') return

  // Global error handler
  window.addEventListener('error', (event) => {
    reportError({
      message: event.message,
      stack: event.error?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    })
  })

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    reportError({
      message: `Unhandled Promise Rejection: ${event.reason}`,
      stack: event.reason?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    })
  })
}

// Report error to monitoring service
export const reportError = (error: ErrorReport) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Report:', error)
    return
  }

  // In production, send to error tracking service
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Sentry integration would go here
    // Sentry.captureException(new Error(error.message), { extra: error })
  }

  // Send to Google Analytics as an event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
    })
  }

  // Send to custom error endpoint (if available)
  try {
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error),
    }).catch(() => {
      // Silently fail if error reporting fails
    })
  } catch {
    // Silently fail if fetch is not available
  }
}

// Manual error reporting
export const logError = (message: string, error?: Error) => {
  reportError({
    message,
    stack: error?.stack,
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    timestamp: Date.now(),
  })
}

// Performance issue reporting
export const reportPerformanceIssue = (metric: string, value: number, threshold: number) => {
  if (value > threshold) {
    logError(`Performance issue: ${metric} (${value}ms) exceeded threshold (${threshold}ms)`)
  }
}