'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const trainers = [
  {
    name: 'Raj Kumar',
    specialty: 'Strength & Conditioning',
    bio: '10 years elite powerlifting coaching',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    specialty: 'Nutrition & Weight Loss',
    bio: 'Certified nutritionist, 500+ transformations',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
  },
  {
    name: 'Arjun Mehta',
    specialty: 'CrossFit & HIIT',
    bio: 'Former national athlete, CrossFit Level 3',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
  },
  {
    name: 'Neha Patel',
    specialty: 'Yoga & Flexibility',
    bio: 'RYT-500 certified, mobility specialist',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
  },
]

export default function Instructors() {
  return (
    <section id="instructors" className="py-24" style={{ backgroundColor: '#111111' }}>
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
            OUR TEAM
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">
            Expert Instructors
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.name}
              variants={fadeUp}
              className="rounded-xl overflow-hidden group border"
              style={{ backgroundColor: '#1a1a1a', borderColor: '#222222' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 300 }}>
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
                  unoptimized
                />

                {/* Social icons — slide up on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FF5500' }}
                  >
                    <Instagram size={16} className="text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FF5500' }}
                  >
                    <Linkedin size={16} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="font-display text-white text-xl uppercase">{trainer.name}</h3>
                <p className="font-body font-semibold text-sm mt-1" style={{ color: '#FF5500' }}>
                  {trainer.specialty}
                </p>
                <p className="font-body text-sm mt-2" style={{ color: '#888888' }}>
                  {trainer.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
