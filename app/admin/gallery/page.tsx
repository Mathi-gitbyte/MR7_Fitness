'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Upload, Trash2, GripVertical, X, Video, ImageIcon } from 'lucide-react'

type GalleryItem = {
  id: string
  url: string
  type: 'image' | 'video'
  alt: string
  cloudinary_public_id: string
  sort_order: number
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [altText, setAltText] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/gallery')
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('alt', altText || file.name)
    fd.append('sort_order', String(items.length))
    const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd })
    if (!res.ok) {
      const d = await res.json()
      setError(d.error ?? 'Upload failed')
    } else {
      setAltText('')
      if (fileRef.current) fileRef.current.value = ''
      load()
    }
    setUploading(false)
  }

  async function deleteItem(item: GalleryItem) {
    if (!confirm('Delete this item?')) return
    await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, cloudinary_public_id: item.cloudinary_public_id, type: item.type }),
    })
    load()
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = Array.from(items)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const updated = reordered.map((item, i) => ({ ...item, sort_order: i }))
    setItems(updated)
    await Promise.all(
      updated.map((item) =>
        fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, sort_order: item.sort_order }),
        })
      )
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-white text-4xl uppercase">Gallery</h1>
        <p className="font-body text-sm mt-1 text-[#888]">Upload images/videos, drag to reorder, delete items.</p>
      </div>

      {/* Upload area */}
      <div
        className="rounded-xl p-6 mb-8 flex flex-col gap-4"
        style={{ backgroundColor: '#111', border: '1px solid #222' }}
      >
        <p className="font-body font-semibold text-sm text-white uppercase tracking-wider">Upload New Item</p>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Alt text / label (optional)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="flex-1 min-w-[200px] font-body text-sm text-white rounded-lg px-4 py-2.5 bg-[#1a1a1a] border border-[#333] outline-none focus:border-[#FF5500] transition-colors"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleUpload}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-semibold text-sm text-black"
            style={{ backgroundColor: '#FF5500' }}
          >
            <Upload size={16} />
            {uploading ? 'Uploading…' : 'Choose File'}
          </motion.button>
        </div>
        {error && <p className="font-body text-sm text-red-400">{error}</p>}
      </div>

      {/* Drag-to-reorder grid */}
      {loading ? (
        <p className="font-body text-[#888] text-sm">Loading…</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap gap-4"
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(drag) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        className="relative rounded-xl overflow-hidden group"
                        style={{ width: 180, height: 180, flexShrink: 0 }}
                      >
                        {item.type === 'image' ? (
                          <Image src={item.url} alt={item.alt} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                            <Video size={32} color="#FF5500" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {/* Type badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body font-semibold text-white" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                          {item.type === 'video' ? <Video size={10} /> : <ImageIcon size={10} />}
                          {item.type}
                        </div>
                        {/* Drag handle */}
                        <div {...drag.dragHandleProps} className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-white">
                          <GripVertical size={18} />
                        </div>
                        {/* Delete */}
                        <button
                          onClick={() => deleteItem(item)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1 text-white hover:bg-red-500"
                          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                        {/* Alt label */}
                        {item.alt && (
                          <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                            <p className="font-body text-xs text-white truncate">{item.alt}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
