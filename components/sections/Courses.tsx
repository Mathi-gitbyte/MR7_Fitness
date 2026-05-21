'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const programs = [
  {
    name: 'Gym',
    summary: 'State-of-the-art equipment for strength, cardio, and functional training.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
  },
  {
    name: 'MMA',
    summary: 'Mixed martial arts combining striking, grappling, and conditioning.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80',
  },
  {
    name: 'Zumba',
    summary: 'High-energy dance fitness that makes working out feel like a celebration.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
  },
  {
    name: 'Yoga',
    summary: 'Build flexibility, balance, and mindfulness through guided yoga practice.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
  {
    name: 'Kickboxing',
    summary: 'Full-body power training that builds speed, strength, and self-defence skills.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80',
  },
  {
    name: 'Personal Training',
    summary: 'One-on-one sessions tailored to your specific goals with certified trainers.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    name: 'Kids Wellness',
    summary: 'Fun, safe, and age-appropriate fitness programs designed for young ones.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80',
  },
  {
    name: 'Nutrition Coaching',
    summary: 'Personalised meal guidance to fuel your body and maximise results.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
  },
]

export default function Courses() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="programs" className="py-24" style={{ backgroundColor: '#111111' }}>
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
            WHAT WE OFFER
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">Our Programs</h2>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 md:hidden" style={{ scrollbarWidth: 'none' }}>
          {programs.map((program) => (
            <div
              key={program.name}
              className="relative flex-shrink-0 cursor-pointer rounded-xl overflow-hidden"
              style={{ width: '72vw', height: '420px' }}
            >
              <Image src={program.image} alt={program.name} fill className="object-cover grayscale brightness-50" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-white text-2xl uppercase">{program.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: accordion */}
        <div
          className="hidden md:flex gap-3"
          style={{ height: '420px' }}
          onMouseLeave={() => setHovered(null)}
        >
          {programs.map((program) => {
            const isHovered = hovered === program.name
            const isOther = hovered !== null && !isHovered

            return (
              <div
                key={program.name}
                className="relative cursor-pointer rounded-xl overflow-hidden"
                style={{
                  flex: isHovered ? '4 1 0%' : isOther ? '0.3 1 0%' : '1 1 0%',
                  transition: 'flex 0.5s cubic-bezier(0.25,0.1,0.25,1)',
                  minWidth: 0,
                }}
                onMouseEnter={() => setHovered(program.name)}
              >
                {/* Image */}
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover"
                  style={{
                    filter: isHovered ? 'grayscale(0%) brightness(0.8)' : 'grayscale(100%) brightness(0.5)',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                    transition: 'filter 0.5s ease, transform 0.5s ease',
                  }}
                  unoptimized
                />

                {/* Orange gradient overlay on hover */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isHovered
                      ? 'linear-gradient(to top, rgba(255,85,0,0.6) 0%, rgba(255,85,0,0.1) 45%, transparent 70%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                    transition: 'background 0.5s ease',
                  }}
                />

                {/* Orange border */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    border: isHovered ? '2px solid #FF5500' : '2px solid transparent',
                    transition: 'border-color 0.3s ease',
                  }}
                />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="font-display text-white text-2xl uppercase mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {program.name}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{
                      color: '#eeeeee',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {program.summary}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
