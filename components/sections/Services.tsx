'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Flame, Apple, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description:
      'One-on-one coaching tailored to your goals with expert guidance every step of the way.',
  },
  {
    icon: Flame,
    title: 'Strength & Conditioning',
    description:
      'Build raw power and functional fitness through proven, science-backed programming.',
  },
  {
    icon: Apple,
    title: 'Nutrition Coaching',
    description:
      'Fuel your transformation with personalized meal plans and smart nutritional strategy.',
  },
  {
    icon: TrendingUp,
    title: 'Body Transformation',
    description:
      'Complete physique overhaul programs combining training, diet, and full accountability.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <p className="font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4" style={{ color: '#FF5500' }}>
            OUR SERVICES
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">
            What We Offer
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  borderColor: '#FF5500',
                  boxShadow: '0 0 30px rgba(255,85,0,0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex flex-col gap-4 p-8 rounded-lg border"
                style={{ backgroundColor: '#1a1a1a', borderColor: '#222222' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,85,0,0.1)' }}
                >
                  <Icon size={24} color="#FF5500" />
                </div>
                <h3 className="font-display text-white text-2xl uppercase">{service.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#888888' }}>
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
