'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const images = [
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    alt: 'Gym interior',
    className: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
    alt: 'Training equipment',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    alt: 'Athlete training',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
    alt: 'Weight lifting',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    alt: 'Workout session',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80',
    alt: 'Gym floor',
    className: '',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <p
            className="font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: '#FF5500' }}
          >
            GALLERY
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">
            Inside MR7 Fitness
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridAutoRows: '250px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`relative overflow-hidden rounded-lg group cursor-pointer ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
                unoptimized
              />
              {/* Orange border ring on hover */}
              <div
                className="absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ boxShadow: 'inset 0 0 0 2px #FF5500' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
