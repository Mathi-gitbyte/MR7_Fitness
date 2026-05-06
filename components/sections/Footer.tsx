'use client'

import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'

const quickLinks = ['Home', 'About', 'Courses', 'Pricing', 'Gallery', 'Instructors', 'Contact']

const contactInfo = [
  { icon: MapPin, value: 'MR7 Fitness, 123 Sports Complex, Mumbai – 400001' },
  { icon: Phone, value: '+91 98765 43210' },
  { icon: Mail, value: 'hello@mr7fitness.com' },
]

const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* 4-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12"
          style={{ borderBottom: '1px solid #222222' }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display text-4xl uppercase" style={{ color: '#FF5500' }}>
                MR7
              </span>
              <span className="font-display text-4xl uppercase text-white ml-1">FITNESS</span>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: '#888888' }}>
              Push your limits. Build your legacy.
              <br />
              Mumbai&apos;s premier destination for serious athletes and fitness enthusiasts.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4
              className="font-display text-white text-lg uppercase mb-6 tracking-wider"
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-sm transition-colors"
                    style={{ color: '#888888' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5500')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="font-display text-white text-lg uppercase mb-6 tracking-wider">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, value }) => (
                <li key={value} className="flex gap-3 items-start">
                  <Icon size={16} style={{ color: '#FF5500', flexShrink: 0, marginTop: 2 }} />
                  <span className="font-body text-sm leading-relaxed" style={{ color: '#888888' }}>
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Social */}
          <div>
            <h4 className="font-display text-white text-lg uppercase mb-6 tracking-wider">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid #333333' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF5500'
                    e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333333'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <Icon size={18} style={{ color: '#888888' }} />
                </a>
              ))}
            </div>
            <p className="font-body text-sm mt-6 leading-relaxed" style={{ color: '#888888' }}>
              Stay connected for workout tips, member stories, and exclusive offers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm" style={{ color: '#888888' }}>
            © 2026 MR7 Fitness. All Rights Reserved.
          </p>
          <p className="font-body text-sm" style={{ color: '#888888' }}>
            Designed with passion for fitness.
          </p>
        </div>
      </div>
    </footer>
  )
}
