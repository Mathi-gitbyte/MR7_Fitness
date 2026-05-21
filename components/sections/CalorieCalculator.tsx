'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, ChevronDown } from 'lucide-react'

interface CalcResults {
  bmr: number
  activityRows: { id: string; label: string; multiplier: number; tdee: number }[]
  selectedTdee: number
}

const ACTIVITY_LEVELS = [
  { id: 'bmr',      label: 'BMR only',                               multiplier: 1.0   },
  { id: 'sed',      label: 'Sedentary: little or no exercise',       multiplier: 1.2   },
  { id: 'light',    label: 'Light: exercise 1–3x/week',              multiplier: 1.375 },
  { id: 'moderate', label: 'Moderate: exercise 4–5x/week',           multiplier: 1.55  },
  { id: 'active',   label: 'Active: daily or intense 3–4x/week',     multiplier: 1.725 },
  { id: 'very',     label: 'Very Active: intense 6–7x/week',         multiplier: 1.9   },
  { id: 'extra',    label: 'Extra Active: very intense/physical job', multiplier: 2.0   },
]

const GOALS = [
  { label: 'Aggressive Loss', delta: -1000, change: '−1 kg / week',   color: '#FF5500' },
  { label: 'Mild Loss',       delta: -500,  change: '−0.5 kg / week', color: '#C4F000' },
  { label: 'Maintain',        delta: 0,     change: '0 kg / week',    color: '#FF5500' },
  { label: 'Mild Gain',       delta: +500,  change: '+0.5 kg / week', color: '#D4F566' },
  { label: 'Fast Gain',       delta: +1000, change: '+1 kg / week',   color: '#ef4444' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export default function CalorieCalculator() {
  const [age, setAge]               = useState('')
  const [gender, setGender]         = useState<'male' | 'female'>('male')
  const [height, setHeight]         = useState('')
  const [weight, setWeight]         = useState('')
  const [activity, setActivity]     = useState('moderate')
  const [results, setResults]       = useState<CalcResults | null>(null)
  const [error, setError]           = useState('')

  const handleCalculate = () => {
    const ageNum    = parseInt(age)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (
      isNaN(ageNum)    || ageNum < 10    || ageNum > 100    ||
      isNaN(heightNum) || heightNum < 100 || heightNum > 250 ||
      isNaN(weightNum) || weightNum < 30  || weightNum > 300
    ) {
      setError('Please enter valid values — Age (10–100 yrs), Height (100–250 cm), Weight (30–300 kg)')
      return
    }
    setError('')

    // Mifflin-St Jeor BMR equation
    const base = 10 * weightNum + 6.25 * heightNum - 5 * ageNum
    const bmr  = Math.round(gender === 'male' ? base + 5 : base - 161)

    const activityRows = ACTIVITY_LEVELS.map(lvl => ({
      id:         lvl.id,
      label:      lvl.label,
      multiplier: lvl.multiplier,
      tdee:       Math.round(bmr * lvl.multiplier),
    }))

    const selectedTdee = activityRows.find(r => r.id === activity)!.tdee

    setResults({ bmr, activityRows, selectedTdee })
  }

  return (
    <section id="calorie-calculator" className="py-24" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <p
            className="font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: '#FF5500' }}
          >
            FREE TOOL
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">
            Calorie <span style={{ color: '#FF5500' }}>Calculator</span>
          </h2>
          <p className="font-body mt-4 text-sm max-w-xl" style={{ color: '#888888' }}>
            Based on the Mifflin-St Jeor equation — the gold standard used by
            sports nutritionists. Enter your stats and find your exact daily targets.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* LEFT: FORM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="p-8 border"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#222222' }}
          >
            {/* Gender toggle */}
            <div className="mb-6">
              <p
                className="font-display font-bold text-xs tracking-widest uppercase mb-3"
                style={{ color: '#888888' }}
              >
                Gender
              </p>
              <div className="flex">
                {(['male', 'female'] as const).map(g => (
                  <label
                    key={g}
                    className="flex-1 flex items-center justify-center py-3 cursor-pointer border transition-all duration-150"
                    style={{
                      backgroundColor: gender === g ? '#FF5500' : 'transparent',
                      borderColor:     gender === g ? '#FF5500' : '#333333',
                      color:           gender === g ? '#000000' : '#666666',
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={() => setGender(g)}
                      className="sr-only"
                    />
                    <span className="font-display font-black uppercase tracking-widest text-sm">
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Age / Height / Weight */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Age',    unit: 'yrs', value: age,    setter: setAge,    placeholder: '25'  },
                { label: 'Height', unit: 'cm',  value: height, setter: setHeight, placeholder: '175' },
                { label: 'Weight', unit: 'kg',  value: weight, setter: setWeight, placeholder: '80'  },
              ].map(({ label, unit, value, setter, placeholder }) => (
                <div key={label}>
                  <label
                    className="font-display font-bold text-xs tracking-widest uppercase mb-2 block"
                    style={{ color: '#888888' }}
                  >
                    {label}
                    <span
                      className="ml-1 normal-case tracking-normal font-body text-xs"
                      style={{ color: '#444444' }}
                    >
                      ({unit})
                    </span>
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full font-display font-bold text-xl text-white px-3 py-3 border outline-none transition-colors duration-150"
                    style={{ backgroundColor: '#0d0d0d', borderColor: '#333333' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#FF5500')}
                    onBlur={e  => (e.currentTarget.style.borderColor  = '#333333')}
                  />
                </div>
              ))}
            </div>

            {/* Activity Level dropdown */}
            <div className="mb-8">
              <label
                htmlFor="activity-select"
                className="font-display font-bold text-xs tracking-widest uppercase mb-2 block"
                style={{ color: '#888888' }}
              >
                Activity Level
              </label>
              <div className="relative">
                <select
                  id="activity-select"
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  className="w-full appearance-none font-body font-semibold text-sm text-white px-4 py-3 border outline-none transition-colors duration-150 cursor-pointer"
                  style={{ backgroundColor: '#0d0d0d', borderColor: '#333333' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#FF5500')}
                  onBlur={e  => (e.currentTarget.style.borderColor  = '#333333')}
                >
                  {ACTIVITY_LEVELS.map(lvl => (
                    <option
                      key={lvl.id}
                      value={lvl.id}
                      style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                    >
                      {lvl.label} (×{lvl.multiplier})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#FF5500' }}
                />
              </div>
            </div>

            {/* Validation error */}
            {error && (
              <p className="font-body text-xs mb-4" style={{ color: '#ef4444' }}>
                {error}
              </p>
            )}

            {/* Calculate button */}
            <motion.button
              onClick={handleCalculate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full font-display font-black uppercase tracking-widest text-lg py-4 text-black"
              style={{ backgroundColor: '#FF5500' }}
            >
              CALCULATE
            </motion.button>
          </motion.div>

          {/* RIGHT: RESULTS */}
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* BMR hero card */}
                <div
                  className="p-6 mb-4 border-2"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor:     '#FF5500',
                    boxShadow:       '0 0 24px rgba(255,85,0,0.12)',
                  }}
                >
                  <p
                    className="font-display font-bold text-xs tracking-widest uppercase mb-1"
                    style={{ color: '#888888' }}
                  >
                    Your Basal Metabolic Rate
                  </p>
                  <div className="flex items-end gap-3">
                    <span
                      className="font-display font-black leading-none"
                      style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#FF5500' }}
                    >
                      {results.bmr.toLocaleString()}
                    </span>
                    <span className="font-body text-sm mb-3" style={{ color: '#888888' }}>
                      calories / day
                    </span>
                  </div>
                  <p className="font-body text-xs mt-1" style={{ color: '#555555' }}>
                    Calories your body burns at complete rest — your floor, before any activity.
                  </p>
                </div>

                {/* Activity breakdown table */}
                <div
                  className="mb-4 border overflow-hidden"
                  style={{ borderColor: '#222222', backgroundColor: '#141414' }}
                >
                  <div className="px-5 py-3 border-b" style={{ borderColor: '#222222' }}>
                    <p
                      className="font-display font-bold text-xs tracking-widest uppercase"
                      style={{ color: '#888888' }}
                    >
                      Calories by Activity Level
                    </p>
                  </div>

                  {results.activityRows.map((row, i) => {
                    const isSelected = row.id === activity
                    return (
                      <div
                        key={row.id}
                        className="flex items-center justify-between px-5 py-3 border-b"
                        style={{
                          borderColor:     '#1f1f1f',
                          backgroundColor: isSelected
                            ? 'rgba(255,85,0,0.12)'
                            : i % 2 === 0 ? '#141414' : '#111111',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1 h-4 flex-shrink-0"
                            style={{ backgroundColor: isSelected ? '#FF5500' : 'transparent' }}
                          />
                          <span
                            className="font-body text-sm"
                            style={{ color: isSelected ? '#FF5500' : '#888888' }}
                          >
                            {row.label}
                          </span>
                        </div>
                        <span
                          className="font-display font-black text-lg"
                          style={{ color: isSelected ? '#FF5500' : '#cccccc' }}
                        >
                          {row.tdee.toLocaleString()}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Goal cards */}
                <div
                  className="border px-5 pt-4 pb-5"
                  style={{ borderColor: '#222222', backgroundColor: '#141414' }}
                >
                  <p
                    className="font-body font-normal text-xs tracking-widest uppercase mb-4"
                    style={{ color: '#888888' }}
                  >
                    Daily Calorie Goals — based on{' '}
                    <span style={{ color: '#FF5500' }}>
                      {results.selectedTdee.toLocaleString()} cal
                    </span>{' '}
                    maintenance
                  </p>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    {GOALS.map(goal => {
                      const calories = results.selectedTdee + goal.delta
                      return (
                        <motion.div
                          key={goal.label}
                          variants={fadeUp}
                          whileHover={{ y: -3, boxShadow: '0 6px 24px rgba(255,85,0,0.18)' }}
                          className="p-4 border-2 text-center"
                          style={{
                            borderColor:     '#FF5500',
                            backgroundColor: '#1a1a1a',
                            boxShadow:       '0 0 12px rgba(255,85,0,0.08)',
                          }}
                        >
                          <p
                            className="font-body font-normal text-xs tracking-wide uppercase mb-2"
                            style={{ color: '#888888' }}
                          >
                            {goal.label}
                          </p>
                          <p
                            className="font-display font-black text-2xl leading-none"
                            style={{ color: '#FF5500' }}
                          >
                            {calories.toLocaleString()}
                          </p>
                          <p className="font-body text-xs mt-1" style={{ color: '#555555' }}>
                            cal / day
                          </p>
                          <p
                            className="font-display font-bold text-xs mt-2"
                            style={{ color: goal.color }}
                          >
                            {goal.change}
                          </p>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[460px] border"
                style={{ borderColor: '#222222', backgroundColor: '#141414' }}
              >
                <div
                  className="w-20 h-20 flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(255,85,0,0.08)' }}
                >
                  <Flame size={36} style={{ color: '#FF5500' }} />
                </div>
                <p
                  className="font-display font-black uppercase tracking-widest text-center text-lg"
                  style={{ color: '#333333' }}
                >
                  Enter your stats<br />& hit calculate
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
