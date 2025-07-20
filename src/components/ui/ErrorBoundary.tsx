'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo)
    
    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { errorInfo } })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center bg-limestone/10 rounded-lg border border-dark-border">
          <div className="text-center p-8 max-w-md">
            <AlertTriangle className="w-12 h-12 text-auxo-green mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-pure-white mb-2">
              Something went wrong
            </h3>
            <p className="text-limestone mb-6">
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 bg-auxo-green text-rich-black px-6 py-3 rounded-lg font-semibold hover:bg-auxo-green/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-limestone cursor-pointer hover:text-pure-white">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-rich-black rounded text-xs text-limestone overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}