'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function StarSVG({ size, gradId }: { size: number; gradId: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 51 49" fill="none">
      <polygon
        points="25.5,2 31.8,18.9 50,20.5 37,32.1 41,49 25.5,39.5 10,49 14,32.1 1,20.5 19.2,18.9"
        fill={`url(#${gradId})`}
      />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#88B000" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* One clipped copy of the logo that slides in from a direction */
function LogoClip({
  clipPath,
  initial,
  delay,
}: {
  clipPath: string
  initial: { x?: number; y?: number }
  delay: number
}) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath }}
      initial={{ ...initial, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      <Image
        src="/MR7-LOGO.png"
        alt=""
        fill
        className="object-contain"
        priority
        aria-hidden
      />
    </motion.div>
  )
}

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fallback = setTimeout(() => setVisible(false), 8000)
    return () => clearTimeout(fallback)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Top curtain */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999]"
            style={{ backgroundColor: '#000000', height: '50vh' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[9999]"
            style={{ backgroundColor: '#000000', height: '50vh' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* Main content */}
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ backgroundColor: '#000000' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* ── Logo assembly container ── */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">

              {/* Glow pulse — radiates after pieces land */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none -z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.5, 1.7, 2.2] }}
                transition={{ duration: 1.3, delay: 0.85, ease: 'easeOut' }}
                style={{
                  background: 'radial-gradient(circle, rgba(255,85,0,0.5) 0%, transparent 70%)',
                }}
              />

              {/* ── Stars fly in first (delay 0) ── */}
              {/* Left star — from left */}
              <motion.div
                className="absolute pointer-events-none z-10"
                style={{ left: '28%', top: '36%', transform: 'translate(-50%, -50%)' }}
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, times: [0, 0.35, 0.70, 1], ease, delay: 0 }}
              >
                <StarSVG size={26} gradId="s-left" />
              </motion.div>

              {/* Centre star — from top */}
              <motion.div
                className="absolute pointer-events-none z-10"
                style={{ left: '50%', top: '30%', transform: 'translate(-50%, -50%)' }}
                initial={{ y: -400, opacity: 0 }}
                animate={{ y: 0, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.55, times: [0, 0.35, 0.70, 1], ease, delay: 0.05 }}
              >
                <StarSVG size={40} gradId="s-centre" />
              </motion.div>

              {/* Right star — from right */}
              <motion.div
                className="absolute pointer-events-none z-10"
                style={{ left: '72%', top: '36%', transform: 'translate(-50%, -50%)' }}
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, times: [0, 0.35, 0.70, 1], ease, delay: 0 }}
              >
                <StarSVG size={26} gradId="s-right" />
              </motion.div>

              {/* ── 4 clipped logo pieces assemble (delay 0.15s after stars) ── */}

              {/* Top piece — stars + shield top — drops from above */}
              <LogoClip
                clipPath="polygon(0% 0%, 100% 0%, 100% 42%, 0% 42%)"
                initial={{ y: -320 }}
                delay={0.15}
              />

              {/* Left piece — left shield + barbell — slides from left */}
              <LogoClip
                clipPath="polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
                initial={{ x: -320 }}
                delay={0.18}
              />

              {/* Right piece — right shield + barbell — slides from right */}
              <LogoClip
                clipPath="polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
                initial={{ x: 320 }}
                delay={0.18}
              />

              {/* Bottom piece — shield bottom + text — rises from below */}
              <LogoClip
                clipPath="polygon(0% 58%, 100% 58%, 100% 100%, 0% 100%)"
                initial={{ y: 320 }}
                delay={0.15}
              />

              {/* ── Shimmer overlays (fire after assembly) ── */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    'linear-gradient(110deg, transparent 15%, rgba(255,210,90,0.55) 50%, transparent 85%)',
                  x: '-180%',
                }}
                animate={{ x: '280%' }}
                transition={{ duration: 0.7, delay: 1.1, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    'linear-gradient(110deg, transparent 15%, rgba(255,255,255,0.25) 50%, transparent 85%)',
                  x: '-180%',
                }}
                animate={{ x: '280%' }}
                transition={{ duration: 0.65, delay: 2.9, ease: 'easeInOut' }}
              />
            </div>

            {/* Gym name */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p
                className="font-display text-4xl md:text-5xl uppercase tracking-[0.3em]"
                style={{ color: '#FF5500' }}
              >
                MR7
              </p>
              <motion.p
                className="font-display text-sm md:text-base uppercase"
                style={{ color: '#999999' }}
                initial={{ opacity: 0, letterSpacing: '0.05em' }}
                animate={{ opacity: 1, letterSpacing: '0.45em' }}
                transition={{ duration: 0.8, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
              >
                UNISEX FITNESS
              </motion.p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="mt-6 h-[1px]"
              style={{ backgroundColor: '#FF5500' }}
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 0.5, delay: 2.3, ease: 'easeOut' }}
            />

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px]"
              style={{ backgroundColor: '#FF5500' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 7.5, ease: 'linear' }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
