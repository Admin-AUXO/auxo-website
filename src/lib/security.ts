// Security utilities and configurations

// Content Security Policy configuration
export const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://calendly.com",
    "https://*.calendly.com"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:",
    "blob:"
  ],
  'connect-src': [
    "'self'",
    "https://www.google-analytics.com",
    "https://calendly.com",
    "https://*.calendly.com",
    "https://vitals.vercel-insights.com"
  ],
  'frame-src': [
    "https://calendly.com",
    "https://*.calendly.com"
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
}

// Generate CSP header string
export const generateCSPHeader = (): string => {
  return Object.entries(cspConfig)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive.replace('-', '-')
      }
      return `${directive} ${sources.join(' ')}`
    })
    .join('; ')
}

// Security headers configuration
export const securityHeaders = [
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
    value: generateCSPHeader()
  }
]

// Validate environment variables for security
export const validateSecurityConfig = () => {
  const warnings: string[] = []
  
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      warnings.push('Google Analytics measurement ID not configured')
    }
    
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      warnings.push('Site URL not configured for production')
    }
    
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
      warnings.push('Error tracking (Sentry) not configured')
    }
  }
  
  return warnings
}

// Rate limiting configuration (for API routes if needed)
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
}