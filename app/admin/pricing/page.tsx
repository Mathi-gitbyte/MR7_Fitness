'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Star, X, Check, GripVertical } from 'lucide-react'

type Plan = {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  is_popular: boolean
  sort_order: number
}

const EMPTY_PLAN: Omit<Plan, 'id' | 'sort_order'> = {
  name: '',
  price: '',
  period: '/month',
  features: [],
  is_popular: false,
}

const inputClass =
  'w-full font-body text-sm text-white rounded-lg px-4 py-2.5 outline-none transition-colors bg-[#1a1a1a] border border-[#333] focus:border-[#FF5500]'

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Plan | null>(null)
  const [form, setForm] = useState(EMPTY_PLAN)
  const [featuresRaw, setFeaturesRaw] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/pricing')
    const data = await res.json()
    setPlans(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_PLAN)
    setFeaturesRaw('')
    setError('')
  }

  function openEdit(plan: Plan) {
    setEditing(plan)
    setForm({ name: plan.name, price: plan.price, period: plan.period, features: plan.features, is_popular: plan.is_popular })
    setFeaturesRaw(plan.features.join('\n'))
    setError('')
  }

  function closeModal() {
    setEditing(undefined as unknown as Plan)
    setForm(EMPTY_PLAN)
    setFeaturesRaw('')
    setError('')
  }

  async function save() {
    setSaving(true)
    setError('')
    const features = featuresRaw.split('\n').map((f) => f.trim()).filter(Boolean)
    const payload = { ...form, features, sort_order: editing ? editing.sort_order : plans.length }
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { ...payload, id: editing.id } : payload
    const res = await fetch('/api/admin/pricing', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error ?? 'Failed to save')
    } else {
      closeModal()
      load()
    }
    setSaving(false)
  }

  async function deletePlan(id: string) {
    if (!confirm('Delete this plan?')) return
    await fetch('/api/admin/pricing', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  async function togglePopular(plan: Plan) {
    await fetch('/api/admin/pricing', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: plan.id, is_popular: !plan.is_popular }),
    })
    load()
  }

  const modalOpen = editing !== undefined

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-white text-4xl uppercase">Pricing Plans</h1>
          <p className="font-body text-sm mt-1 text-[#888]">Manage membership plans shown on the website.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-semibold text-sm text-black"
          style={{ backgroundColor: '#FF5500' }}
        >
          <Plus size={16} /> Add Plan
        </motion.button>
      </div>

      {loading ? (
        <p className="font-body text-[#888] text-sm">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl p-6 flex flex-col gap-4 relative"
              style={{
                backgroundColor: '#111',
                border: plan.is_popular ? '2px solid #FF5500' : '1px solid #222',
                boxShadow: plan.is_popular ? '0 0 40px rgba(255,85,0,0.12)' : 'none',
              }}
            >
              {plan.is_popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-body font-semibold px-3 py-1 rounded-full bg-[#FF5500] text-black uppercase tracking-widest">
                  Popular
                </span>
              )}
              <div>
                <h3 className="font-display text-white text-xl uppercase">{plan.name}</h3>
                <p className="font-display text-3xl text-[#FF5500] mt-1">
                  {plan.price}<span className="font-body text-sm text-[#888]">{plan.period}</span>
                </p>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={14} color="#FF5500" />
                    <span className="font-body text-sm text-[#888]">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 pt-2" style={{ borderTop: '1px solid #1a1a1a' }}>
                <button
                  onClick={() => togglePopular(plan)}
                  title={plan.is_popular ? 'Remove popular' : 'Mark as popular'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs transition-colors"
                  style={{
                    backgroundColor: plan.is_popular ? 'rgba(255,85,0,0.15)' : 'transparent',
                    color: plan.is_popular ? '#FF5500' : '#888',
                    border: '1px solid #333',
                  }}
                >
                  <Star size={13} fill={plan.is_popular ? '#FF5500' : 'none'} /> Popular
                </button>
                <button
                  onClick={() => openEdit(plan)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs text-[#888] hover:text-white border border-[#333] transition-colors"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs text-[#888] hover:text-red-400 border border-[#333] transition-colors ml-auto"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      <AnimatePresence>
        {(modalOpen || editing === null) && form.name !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-5"
              style={{ backgroundColor: '#111', border: '1px solid #333' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-white text-2xl uppercase">
                  {editing ? 'Edit Plan' : 'New Plan'}
                </h2>
                <button onClick={closeModal} className="text-[#888] hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Plan Name</label>
                  <input className={inputClass} placeholder="e.g. Premium" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Price</label>
                  <input className={inputClass} placeholder="e.g. ₹3,499" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Period</label>
                <input className={inputClass} placeholder="/month" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
              </div>

              <div>
                <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">
                  Features <span className="normal-case text-[#555]">(one per line)</span>
                </label>
                <textarea
                  rows={6}
                  className={inputClass}
                  style={{ resize: 'none' }}
                  placeholder={'Full gym access\nLocker room access\nGroup classes'}
                  value={featuresRaw}
                  onChange={(e) => setFeaturesRaw(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, is_popular: !form.is_popular })}
                  className="w-10 h-5 rounded-full transition-colors relative"
                  style={{ backgroundColor: form.is_popular ? '#FF5500' : '#333' }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                    style={{ left: form.is_popular ? '1.25rem' : '0.125rem' }}
                  />
                </div>
                <span className="font-body text-sm text-[#ccc]">Mark as Popular</span>
              </label>

              {error && <p className="font-body text-sm text-red-400">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={save}
                disabled={saving}
                className="w-full font-body font-semibold py-3 rounded-lg text-black transition-colors"
                style={{ backgroundColor: '#FF5500' }}
              >
                {saving ? 'Saving…' : 'Save Plan'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
