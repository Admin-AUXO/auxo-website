'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteContent } from '@/lib/constants';

interface SchedulingEmbedProps {
  className?: string;
}

export default function SchedulingEmbed({ className = '' }: SchedulingEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for demo purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Loading State */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          className="absolute inset-0 bg-petrol-ink/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
        >
          <div className="text-center">
            <motion.div
              className="w-12 h-12 border-3 border-auxo-green border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-pure-white font-medium">{siteContent.scheduling.loadingText}</p>
          </div>
        </motion.div>
      )}

      {/* Scheduling Interface - Custom Dark Theme */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-petrol-ink/90 to-petrol-ink/70 backdrop-blur-sm rounded-2xl border border-auxo-green/20 p-8 min-h-[600px]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-pure-white mb-2">
            {siteContent.scheduling.title}
          </h3>
          <p className="text-limestone">
            {siteContent.scheduling.subtitle}
          </p>
        </div>

        {/* Mock Calendar Interface */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-petrol-ink/50 rounded-xl p-6 border border-auxo-green/10">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-pure-white">January 2025</h4>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-auxo-green/20 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-auxo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-auxo-green/20 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-auxo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={`${day}-${index}`} className="text-center text-limestone text-sm font-medium p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6; // Start from previous month
                const isCurrentMonth = day > 0 && day <= 31;
                const isAvailable = isCurrentMonth && [8, 9, 15, 16, 22, 23, 29, 30].includes(day);
                const isSelected = day === 15;

                return (
                  <motion.button
                    key={i}
                    className={`
                      p-2 text-sm rounded-lg transition-all duration-200
                      ${!isCurrentMonth ? 'text-limestone/30' : 
                        isSelected ? 'bg-auxo-green text-rich-black font-semibold' :
                        isAvailable ? 'text-pure-white hover:bg-auxo-green/20 hover:text-auxo-green' :
                        'text-limestone/50 cursor-not-allowed'
                      }
                    `}
                    whileHover={isAvailable ? { scale: 1.1 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    disabled={!isAvailable}
                  >
                    {isCurrentMonth ? day : ''}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-petrol-ink/50 rounded-xl p-6 border border-auxo-green/10">
            <h4 className="text-lg font-semibold text-pure-white mb-6">{siteContent.scheduling.availableTimesTitle}</h4>
            <div className="space-y-3">
              {[
                '9:00 AM - 10:00 AM',
                '11:00 AM - 12:00 PM',
                '2:00 PM - 3:00 PM',
                '3:30 PM - 4:30 PM',
                '4:00 PM - 5:00 PM'
              ].map((time, index) => (
                <motion.button
                  key={time}
                  className={`
                    w-full p-4 text-left rounded-xl border transition-all duration-200
                    ${index === 1 ? 
                      'bg-auxo-green/20 border-auxo-green text-auxo-green font-medium' :
                      'bg-petrol-ink/30 border-auxo-green/20 text-pure-white hover:bg-auxo-green/10 hover:border-auxo-green/40'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{time}</span>
                    {index === 1 && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Confirm Button */}
            <motion.button
              className="w-full mt-8 bg-gradient-to-r from-auxo-green to-auxo-green/80 text-rich-black font-semibold py-4 px-6 rounded-xl hover:from-auxo-green/90 hover:to-auxo-green/70 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {siteContent.scheduling.confirmButton}
            </motion.button>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="mt-8 p-6 bg-petrol-ink/30 rounded-xl border border-auxo-green/10">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-auxo-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-auxo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="text-pure-white font-semibold mb-2">{siteContent.scheduling.meetingTitle}</h5>
              <p className="text-limestone text-sm leading-relaxed">
                {siteContent.scheduling.meetingDescription}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}