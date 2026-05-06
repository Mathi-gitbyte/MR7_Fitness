'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const courses = [
  {
    name: 'Beginner Program',
    duration: '4 Weeks',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    name: 'Advanced Muscle Building',
    duration: '8 Weeks',
    price: '₹8,999',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
  },
  {
    name: 'Elite Athlete Training',
    duration: '12 Weeks',
    price: '₹14,999',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
  },
]

export default function Courses() {
  return (
    <section id="courses" className="py-24" style={{ backgroundColor: '#111111' }}>
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
            TRAINING PROGRAMS
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">Our Courses</h2>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <motion.div
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          {courses.map((course) => (
            <motion.div
              key={course.name}
              variants={fadeUp}
              whileHover="hover"
              className="relative rounded-xl overflow-hidden flex-shrink-0 snap-start"
              style={{ height: '500px', minWidth: '85vw' }}
            >
              {/* Image with scale on hover */}
              <motion.div
                className="absolute inset-0"
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span
                  className="font-body text-sm uppercase tracking-widest"
                  style={{ color: '#FF5500' }}
                >
                  {course.duration}
                </span>
                <h3 className="font-display text-white text-2xl uppercase mt-1 mb-4">
                  {course.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl" style={{ color: '#FF5500' }}>
                    {course.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-body font-semibold px-6 py-2 rounded-lg transition-colors text-white"
                    style={{ backgroundColor: '#FF5500' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF6B00')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5500')}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
