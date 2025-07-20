'use client'

import { useEffect } from 'react'
import { initErrorTracking } from '../../lib/errorTracking'

export default function ErrorTracking() {
  useEffect(() => {
    // Initialize error tracking on client side
    initErrorTracking()
  }, [])

  // This component doesn't render anything
  return null
}