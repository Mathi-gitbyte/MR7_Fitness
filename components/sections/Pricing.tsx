'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { PricingPlan } from '@/lib/data'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'default-1',
    name: 'Basic',
    price: '₹1,999',
    period: '/month',
    features: ['Full gym access', 'Locker room access', 'Basic equipment', '2 group classes/month'],
    is_popular: false,
    sort_order: 0,
  },
  {
    id: 'default-2',
    name: 'Premium',
    price: '₹3,499',
    period: '/month',
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      'Personal trainer (2/month)',
      'Nutrition consultation',
      'Priority booking',
      'Body composition scan',
    ],
    is_popular: true,
    sort_order: 1,
  },
  {
    id: 'default-3',
    name: 'Elite',
    price: '₹5,999',
    period: '/month',
    features: [
      'Everything in Premium',
      'Daily personal training',
      'Custom meal plan',
      'Body composition tracking',
      '24/7 VIP access',
      'Guest passes (2/month)',
      'Recovery lounge access',
      'Supplement guidance',
    ],
    is_popular: false,
    sort_order: 2,
  },
]

interface Props {
  plans?: PricingPlan[]
}

export default function Pricing({ plans = DEFAULT_PLANS }: Props) {
  const displayPlans = plans.length > 0 ? plans : DEFAULT_PLANS

  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p
            className="font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: '#FF5500' }}
          >
            MEMBERSHIP PLANS
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">
            Choose Your Plan
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          {displayPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeUp}
              whileHover={{
                y: -8,
                boxShadow: plan.is_popular
                  ? '0 0 60px rgba(255,85,0,0.25)'
                  : '0 0 40px rgba(255,85,0,0.1)',
              }}
              className={plan.is_popular ? 'lg:scale-105 lg:-mt-4 lg:-mb-4' : ''}
            >
              <div
                className="rounded-xl p-8 relative flex flex-col gap-6 h-full"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: plan.is_popular ? '2px solid #FF5500' : '1px solid #222222',
                  boxShadow: plan.is_popular ? '0 0 60px rgba(255,85,0,0.15)' : 'none',
                }}
              >
                {plan.is_popular && (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 font-body font-semibold text-xs px-4 py-1 rounded-full uppercase tracking-widest text-black"
                    style={{ backgroundColor: '#FF5500' }}
                  >
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-display text-white text-2xl uppercase">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="font-display text-5xl" style={{ color: '#FF5500' }}>
                      {plan.price}
                    </span>
                    <span className="font-body text-sm" style={{ color: '#888888' }}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #222222' }} />

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check size={16} style={{ color: '#FF5500', flexShrink: 0 }} />
                      <span className="font-body text-sm" style={{ color: '#888888' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full font-body font-semibold py-3 rounded-lg transition-all duration-200"
                  style={
                    plan.is_popular
                      ? { backgroundColor: '#FF5500', color: '#000000' }
                      : { backgroundColor: 'transparent', color: '#FF5500', border: '1px solid #FF5500' }
                  }
                  onMouseEnter={(e) => {
                    if (plan.is_popular) {
                      e.currentTarget.style.backgroundColor = '#E64D00'
                    } else {
                      e.currentTarget.style.backgroundColor = '#FF5500'
                      e.currentTarget.style.color = '#000000'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.is_popular) {
                      e.currentTarget.style.backgroundColor = '#FF5500'
                    } else {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#FF5500'
                    }
                  }}
                >
                  Join Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
