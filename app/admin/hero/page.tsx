'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, ImageIcon, Video } from 'lucide-react'
import Image from 'next/image'

type HeroMedia = {
  id: string
  url: string
  type: 'image' | 'video'
  cloudinary_public_id: string
} | null

async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string; type: string }> {
  const isVideo = file.type.startsWith('video/')
  const resource_type = isVideo ? 'video' : 'image'

  const sigRes = await fetch('/api/admin/cloudinary-signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder: 'mr7-hero', resource_type }),
  })
  const { signature, timestamp, api_key, cloud_name, folder } = await sigRes.json()

  const fd = new FormData()
  fd.append('file', file)
  fd.append('api_key', api_key)
  fd.append('timestamp', String(timestamp))
  fd.append('signature', signature)
  fd.append('folder', folder)

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/${resource_type}/upload`,
    { method: 'POST', body: fd }
  )
  const data = await uploadRes.json()
  if (data.error) throw new Error(data.error.message)
  return { url: data.secure_url, publicId: data.public_id, type: resource_type }
}

export default function AdminHeroPage() {
  const [media, setMedia] = useState<HeroMedia>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/hero')
      .then((r) => r.json())
      .then((data) => { setMedia(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const { url, publicId, type } = await uploadToCloudinary(file)
      const res = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, public_id: publicId, type }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Save failed')
      setMedia(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleDelete() {
    if (!confirm('Remove hero media?')) return
    setDeleting(true)
    setError('')
    try {
      const res = await fetch('/api/admin/hero', { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setMedia(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-white text-4xl uppercase mb-2">Hero Media</h1>
      <p className="font-body text-sm text-[#888888] mb-10">
        Upload an image or video to display in the hero section of your website.
      </p>

      {error && (
        <p className="font-body text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      {loading ? (
        <div className="font-body text-sm text-[#555]">Loading…</div>
      ) : (
        <div className="flex flex-col gap-6 max-w-2xl">
          {media ? (
            <div className="rounded-xl overflow-hidden border border-[#222] bg-[#111]">
              <div className="px-5 py-4 border-b border-[#1a1a1a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {media.type === 'video'
                    ? <Video size={16} className="text-[#FF5500]" />
                    : <ImageIcon size={16} className="text-[#FF5500]" />
                  }
                  <span className="font-body text-sm text-white capitalize">{media.type} — current hero</span>
                </div>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-1.5 font-body text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {deleting ? 'Removing…' : 'Remove'}
                </button>
              </div>
              <div className="p-4 bg-[#0d0d0d]">
                {media.type === 'video' ? (
                  <video src={media.url} controls className="w-full rounded-lg max-h-[400px] object-contain" />
                ) : (
                  <div className="relative w-full aspect-video">
                    <Image src={media.url} alt="Hero media" fill className="object-contain rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#333] bg-[#0d0d0d] flex flex-col items-center justify-center py-16 gap-3">
              <ImageIcon size={40} className="text-[#333]" />
              <p className="font-body text-sm text-[#555]">No hero media uploaded yet</p>
            </div>
          )}

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
              id="hero-upload"
            />
            <label
              htmlFor="hero-upload"
              className={`flex items-center justify-center gap-2 w-full font-body font-semibold text-sm py-3 rounded-lg cursor-pointer transition-colors ${
                uploading
                  ? 'bg-[#CC4400] text-black pointer-events-none'
                  : 'bg-[#FF5500] hover:bg-[#E64D00] text-black'
              }`}
            >
              <Upload size={16} />
              {uploading ? 'Uploading directly to cloud… please wait' : media ? 'Replace Media' : 'Upload Image or Video'}
            </label>
            <p className="font-body text-xs text-[#555] mt-2 text-center">
              Uploads go directly to Cloudinary — no size limit. Large videos may take a moment.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
