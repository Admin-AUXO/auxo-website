'use client';

import { useEffect, useState } from 'react';

interface ScreenReaderAnnouncementsProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

/**
 * Screen Reader Announcements Component
 * 
 * Provides live region announcements for screen readers to communicate
 * important state changes and navigation updates.
 */
export default function ScreenReaderAnnouncements({ 
  message, 
  priority = 'polite' 
}: ScreenReaderAnnouncementsProps) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      
      // Clear announcement after a short delay to allow for re-announcements
      const timer = setTimeout(() => {
        setAnnouncement('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
}

/**
 * Hook for managing screen reader announcements
 */
export function useScreenReaderAnnouncement() {
  const [message, setMessage] = useState('');

  const announce = (text: string) => {
    setMessage(text);
  };

  return { message, announce };
}