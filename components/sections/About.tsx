'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Members' },
  { value: '15+', label: 'Trainers' },
  { value: '24/7', label: 'Access' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function About() {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="border-l-4 pl-4" style={{ borderColor: '#FF5500' }}>
              <div
                className="overflow-hidden rounded-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                  alt="MR7 Fitness Gym Interior"
                  width={800}
                  height={600}
                  className="w-full object-cover transition-all duration-500 hover:grayscale-0 grayscale"
                  style={{ height: '500px' }}
                  unoptimized
                />
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p
                className="font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4"
                style={{ color: '#FF5500' }}
              >
                ABOUT US
              </p>
              <h2 className="font-display text-white text-5xl md:text-6xl uppercase leading-tight">
                We Build Champions
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-body text-sm leading-relaxed" style={{ color: '#888888' }}>
                MR7 Fitness was founded on a single belief: every person carries the potential of a
                champion inside them. We created this space to help you find it — through
                discipline, expert coaching, and a culture that refuses to accept mediocrity.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#888888' }}>
                Our team of elite certified trainers works with members at every level — from first
                steps to competition prep. We design programs around your life, your body, and your
                goals. No guesswork, no generic plans.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#888888' }}>
                More than a gym, MR7 is a community built on discipline, respect, and the
                relentless pursuit of better. When you walk through our doors, you join a
                movement — not just a membership.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-4 gap-0 mt-4 pt-8"
              style={{ borderTop: '1px solid #222222' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center px-4"
                  style={{
                    borderRight: i < stats.length - 1 ? '1px solid #333333' : 'none',
                  }}
                >
                  <span
                    className="font-display text-4xl leading-none"
                    style={{ color: '#FF5500' }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-body text-white text-xs mt-2 leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
