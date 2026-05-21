'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Upload, Trash2, GripVertical, Play } from 'lucide-react'

type StoryVideo = {
  id: string
  title: string
  thumbnail_url: string
  video_url: string
  cloudinary_public_id: string
  sort_order: number
}

async function uploadToCloudinary(
  file: File,
  folder: string,
  resource_type: 'image' | 'video'
): Promise<{ url: string; publicId: string }> {
  const sigRes = await fetch('/api/admin/cloudinary-signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder, resource_type }),
  })
  const { signature, timestamp, api_key, cloud_name } = await sigRes.json()

  const fd = new FormData()
  fd.append('file', file)
  fd.append('api_key', api_key)
  fd.append('timestamp', String(timestamp))
  fd.append('signature', signature)
  fd.append('folder', folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/${resource_type}/upload`,
    { method: 'POST', body: fd }
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return { url: data.secure_url, publicId: data.public_id }
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<StoryVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const videoRef = useRef<HTMLInputElement>(null)
  const thumbRef = useRef<HTMLInputElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [selectedThumb, setSelectedThumb] = useState<File | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/videos')
    const data = await res.json()
    setVideos(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleUpload() {
    if (!selectedVideo) { setError('Please select a video file'); return }
    if (!title.trim()) { setError('Please enter a title'); return }
    setUploading(true)
    setError('')
    try {
      const { url: video_url, publicId: video_public_id } = await uploadToCloudinary(
        selectedVideo, 'mr7-story-videos', 'video'
      )

      let thumbnail_url = ''
      if (selectedThumb) {
        const { url } = await uploadToCloudinary(selectedThumb, 'mr7-story-thumbnails', 'image')
        thumbnail_url = url
      }

      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, video_url, video_public_id, thumbnail_url, sort_order: videos.length }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Save failed')
      }
      setTitle('')
      setSelectedVideo(null)
      setSelectedThumb(null)
      if (videoRef.current) videoRef.current.value = ''
      if (thumbRef.current) thumbRef.current.value = ''
      load()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function deleteVideo(v: StoryVideo) {
    if (!confirm('Delete this video?')) return
    await fetch('/api/admin/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id, cloudinary_public_id: v.cloudinary_public_id }),
    })
    load()
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = Array.from(videos)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const updated = reordered.map((v, i) => ({ ...v, sort_order: i }))
    setVideos(updated)
    await Promise.all(
      updated.map((v) =>
        fetch('/api/admin/videos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: v.id, sort_order: v.sort_order }),
        })
      )
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-white text-4xl uppercase">Story Videos</h1>
        <p className="font-body text-sm mt-1 text-[#888]">Upload and manage Instagram reel-style videos. Drag to reorder.</p>
      </div>

      {/* Upload area */}
      <div className="rounded-xl p-6 mb-8 flex flex-col gap-4 bg-[#111] border border-[#222]">
        <p className="font-body font-semibold text-sm text-white uppercase tracking-wider">Upload New Video</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Video Title</label>
            <input
              type="text"
              placeholder="e.g. Morning Strength"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full font-body text-sm text-white rounded-lg px-4 py-2.5 bg-[#1a1a1a] border border-[#333] outline-none focus:border-[#FF5500] transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">Video File</label>
            <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={(e) => setSelectedVideo(e.target.files?.[0] ?? null)} />
            <button
              onClick={() => videoRef.current?.click()}
              className="w-full font-body text-sm text-[#888] rounded-lg px-4 py-2.5 bg-[#1a1a1a] border border-[#333] text-left hover:border-[#FF5500] transition-colors"
            >
              {selectedVideo ? selectedVideo.name : 'Choose video…'}
            </button>
          </div>
          <div>
            <label className="font-body text-xs text-[#888] uppercase tracking-wider block mb-1.5">
              Thumbnail <span className="normal-case text-[#555]">(optional — auto-generated if skipped)</span>
            </label>
            <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedThumb(e.target.files?.[0] ?? null)} />
            <button
              onClick={() => thumbRef.current?.click()}
              className="w-full font-body text-sm text-[#888] rounded-lg px-4 py-2.5 bg-[#1a1a1a] border border-[#333] text-left hover:border-[#FF5500] transition-colors"
            >
              {selectedThumb ? selectedThumb.name : 'Choose thumbnail…'}
            </button>
          </div>
        </div>

        {error && <p className="font-body text-sm text-red-400">{error}</p>}

        <div className="flex flex-col gap-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleUpload}
            disabled={uploading}
            className="self-start flex items-center gap-2 px-6 py-2.5 rounded-lg font-body font-semibold text-sm text-black bg-[#FF5500] hover:bg-[#E64D00] disabled:bg-[#CC4400] transition-colors"
          >
            <Upload size={16} />
            {uploading ? 'Uploading directly to cloud… please wait' : 'Upload Video'}
          </motion.button>
          <p className="font-body text-xs text-[#555]">Uploads go directly to Cloudinary — large videos are supported.</p>
        </div>
      </div>

      {/* Video reel grid with drag-to-reorder */}
      {loading ? (
        <p className="font-body text-[#888] text-sm">Loading…</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="videos" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap gap-4"
              >
                {videos.map((video, index) => (
                  <Draggable key={video.id} draggableId={video.id} index={index}>
                    {(drag) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        className="relative rounded-2xl overflow-hidden group flex-shrink-0"
                        style={{ width: 160, height: 280 }}
                      >
                        {video.thumbnail_url ? (
                          <Image src={video.thumbnail_url} alt={video.title} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                            <Play size={28} color="#FF5500" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div {...drag.dragHandleProps} className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-white">
                          <GripVertical size={18} />
                        </div>

                        <button
                          onClick={() => deleteVideo(video)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1 text-white hover:bg-red-500 bg-black/60"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="font-display text-white text-sm uppercase">{video.title}</p>
                        </div>
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
