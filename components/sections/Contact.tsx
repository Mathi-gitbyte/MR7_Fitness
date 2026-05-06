'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const info = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'MR7 Fitness, 123 Sports Complex, Mumbai – 400001',
  },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: Mail, label: 'Email', value: 'hello@mr7fitness.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 5am–11pm  |  Sun: 6am–10pm' },
]

const inputClass =
  'w-full font-body text-sm text-white rounded-lg px-4 py-3 outline-none transition-colors'
const inputStyle = {
  backgroundColor: '#1a1a1a',
  border: '1px solid #333333',
  color: '#FFFFFF',
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(255,85,0,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            GET IN TOUCH
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">Contact Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-xs tracking-wider uppercase block mb-2" style={{ color: '#888888' }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#333333')}
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-wider uppercase block mb-2" style={{ color: '#888888' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#333333')}
                />
              </div>
            </div>

            <div>
              <label className="font-body text-xs tracking-wider uppercase block mb-2" style={{ color: '#888888' }}>
                Phone
              </label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#333333')}
              />
            </div>

            <div>
              <label className="font-body text-xs tracking-wider uppercase block mb-2" style={{ color: '#888888' }}>
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your fitness goals..."
                className={inputClass}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#333333')}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full font-body font-semibold py-4 rounded-lg transition-colors text-white"
              style={{ backgroundColor: '#FF5500' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF6B00')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5500')}
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,85,0,0.1)' }}
                >
                  <Icon size={18} color="#FF5500" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-wider uppercase mb-1" style={{ color: '#888888' }}>
                    {label}
                  </p>
                  <p className="font-body text-sm text-white">{value}</p>
                </div>
              </div>
            ))}

            {/* Map embed */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.8,18.9,72.9,19.1&layer=mapnik"
              className="w-full rounded-lg"
              style={{ height: 200, border: '1px solid #333333' }}
              loading="lazy"
              title="MR7 Fitness location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
