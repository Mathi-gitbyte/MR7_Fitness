'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'
import Image from 'next/image'

type Instructor = {
  id: string
  name: string
  specialty: string
  summary: string
  photo_url: string
  cloudinary_public_id: string
  sort_order: number
}

const EMPTY_FORM = { name: '', specialty: '', summary: '', photo_url: '', cloudinary_public_id: '' }

const inputClass =
  'w-full font-body text-sm text-white rounded-lg px-4 py-2.5 outline-none transition-colors bg-[#1a1a1a] border border-[#333] focus:border-[#FF5500]'

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionEnabled, setSectionEnabled] = useState(true)
  const [togglingSection, setTogglingSection] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Instructor | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  async function loadAll() {
    setLoading(true)
    const [instrRes, settingsRes] = await Promise.all([
      fetch('/api/admin/instructors'),
      fetch('/api/admin/section-settings?key=instructors_section'),
    ])
    const instrData = await instrRes.json()
    const settingsData = await settingsRes.json()
    setInstructors(Array.isArray(instrData) ? instrData : [])
    setSectionEnabled(settingsData.enabled ?? true)
    setLoading(false)
  }

  useEffect(() => { loadAll() }, [])

  async function toggleSection() {
    setTogglingSection(true)
    const next = !sectionEnabled
    setSectionEnabled(next)
    await fetch('/api/admin/section-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'instructors_section', enabled: next }),
    })
    setTogglingSection(false)
  }

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setPhotoFile(null)
    setPhotoPreview('')
    setError('')
    setModalOpen(true)
  }

  function openEdit(instructor: Instructor) {
    setEditing(instructor)
    setForm({
      name: instructor.name,
      specialty: instructor.specialty,
      summary: instructor.summary,
      photo_url: instructor.photo_url,
      cloudinary_public_id: instructor.cloudinary_public_id,
    })
    setPhotoFile(null)
    setPhotoPreview(instructor.photo_url)
    setError('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditing(null)
    setForm(EMPTY_FORM)
    setPhotoFile(null)
    setPhotoPreview('')
    setError('')
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function save() {
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true)
    setError('')

    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('specialty', form.specialty)
    fd.append('summary', form.summary)
    if (editing) {
      fd.append('id', editing.id)
      fd.append('photo_url', form.photo_url)
      fd.append('cloudinary_public_id', form.cloudinary_public_id)
    } else {
      fd.append('sort_order', String(instructors.length))
    }
    if (photoFile) fd.append('photo', photoFile)

    const method = editing ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/instructors', { method, body: fd })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error ?? 'Failed to save')
    } else {
      closeModal()
      loadAll()
    }
    setSaving(false)
  }

  async function deleteInstructor(instructor: Instructor) {
    if (!confirm(`Delete ${instructor.name}?`)) return
    await fetch('/api/admin/instructors', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: instructor.id, cloudinary_public_id: instructor.cloudinary_public_id }),
    })
    loadAll()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-white text-4xl uppercase">Instructors</h1>
          <p className="font-body text-sm mt-1 text-[#888]">Manage trainer profiles shown on the website.</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Section toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="font-body text-sm text-[#ccc]">Section Enabled</span>
            <div
              onClick={togglingSection ? undefined : toggleSection}
              className="w-10 h-5 rounded-full transition-colors relative"
              style={{ backgroundColor: sectionEnabled ? '#FF5500' : '#333', cursor: togglingSection ? 'wait' : 'pointer' }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                style={{ left: sectionEnabled ? '1.25rem' : '0.125rem' }}
              />
            </div>
          </label>

          <motion.button
            whileHover={{ scale: sectionEnabled ? 1.03 : 1 }}
            whileTap={{ scale: sectionEnabled ? 0.97 : 1 }}
            onClick={sectionEnabled ? openCreate : undefined}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-semibold text-sm transition-opacity"
            style={{
              backgroundColor: '#FF5500',
              color: '#000',
              opacity: sectionEnabled ? 1 : 0.4,
              cursor: sectionEnabled ? 'pointer' : 'not-allowed',
            }}
          >
            <Plus size={16} /> Add Trainer
          </motion.button>
        </div>
      </div>

      {/* Section disabled notice */}
      {!sectionEnabled && (
        <div
          className="rounded-xl px-6 py-4 mb-6 font-body text-sm"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#888' }}
        >
          The Instructors section is currently <strong className="text-[#FF5500]">hidden</strong> on the website. Enable it above to show it.
        </div>
      )}

      {/* Cards */}
      {loading ? (
        <p className="font-body text-[#888] text-sm">Loading…</p>
      ) : instructors.length === 0 ? (
        <p className="font-body text-[#888] text-sm">No trainers yet. Add your first trainer above.</p>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ opacity: sectionEnabled ? 1 : 0.5, transition: 'opacity 0.3s' }}
        >
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="rounded-xl p-5 flex gap-5 items-start"
              style={{ backgroundColor: '#111', border: '1px solid #222' }}
            >
              {/* Photo */}
              <div
                className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              >
                {instructor.photo_url ? (
                  <Image
                    src={instructor.photo_url}
                    alt={instructor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#444]">
                    <Upload size={20} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-white text-lg uppercase truncate">{instructor.name}</h3>
                <p className="font-body font-semibold text-xs mt-0.5" style={{ color: '#FF5500' }}>
                  {instructor.specialty}
                </p>
                <p className="font-body text-sm mt-1 line-clamp-2" style={{ color: '#888' }}>
                  {instructor.summary}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(instructor)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs text-[#888] hover:text-white border border-[#333] transition-colors"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => deleteInstructor(instructor)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs text-[#888] hover:text-red-400 border border-[#333] transition-colors"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
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
                  {editing ? 'Edit Trainer' : 'New Trainer'}
                </h2>
                <button onClick={closeModal} className="text-[#888] hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Photo upload */}
              <div>
                <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-2">Photo</label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  >
                    {photoPreview ? (
                      <Image src={photoPreview} alt="Preview" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#444]">
                        <Upload size={20} />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm text-[#888] border border-[#333] hover:text-white hover:border-[#FF5500] transition-colors"
                  >
                    <Upload size={14} /> {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Name</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Raj Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Specialty</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Strength & Conditioning"
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                />
              </div>

              <div>
                <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Summary</label>
                <textarea
                  rows={3}
                  className={inputClass}
                  style={{ resize: 'none' }}
                  placeholder="e.g. 10 years elite powerlifting coaching"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                />
              </div>

              {error && <p className="font-body text-sm text-red-400">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={save}
                disabled={saving}
                className="w-full font-body font-semibold py-3 rounded-lg text-black transition-colors"
                style={{ backgroundColor: '#FF5500' }}
              >
                {saving ? 'Saving…' : 'Save Trainer'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
