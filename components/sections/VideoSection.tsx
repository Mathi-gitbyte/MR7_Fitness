'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'

export default function VideoSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="video" style={{ backgroundColor: '#0f0f0f' }}>
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: '500px' }}
      >
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
          alt="MR7 Fitness"
          fill
          className="object-cover opacity-30 grayscale"
          unoptimized
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,10,10,0.6)' }} />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Play button */}
          <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: 'rgba(255,85,0,0.2)' }}
            />
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid #FF5500' }}
            />
            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-24 h-24 rounded-full flex items-center justify-center z-10"
              style={{
                backgroundColor: '#FF5500',
                boxShadow: '0 0 60px rgba(255,85,0,0.4)',
              }}
              aria-label="Play video"
            >
              <Play size={32} className="text-white ml-1" fill="white" />
            </motion.button>
          </div>

          <p className="font-display text-white text-2xl uppercase tracking-widest mt-8">
            Watch Our Story
          </p>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
              style={{ aspectRatio: '16/9' }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/uNN62f55EV0?autoplay=1"
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="MR7 Fitness Story"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 rounded-full p-2 transition-colors text-white"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF5500')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')
                }
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
