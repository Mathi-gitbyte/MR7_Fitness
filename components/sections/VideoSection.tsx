'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export type StoryVideo = {
  id: string
  title: string
  thumbnail_url: string
  video_url: string
  sort_order: number
}

const DEFAULT_VIDEOS: StoryVideo[] = [
  {
    id: '1',
    title: 'Morning Strength',
    thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1',
    sort_order: 0,
  },
  {
    id: '2',
    title: 'MMA Session',
    thumbnail_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80',
    video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1',
    sort_order: 1,
  },
  {
    id: '3',
    title: 'Yoga Flow',
    thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
    video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1',
    sort_order: 2,
  },
  {
    id: '4',
    title: 'Zumba Energy',
    thumbnail_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
    video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1',
    sort_order: 3,
  },
  {
    id: '5',
    title: 'Kickboxing',
    thumbnail_url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80',
    video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1',
    sort_order: 4,
  },
]

interface Props {
  videos?: StoryVideo[]
}

export default function VideoSection({ videos = DEFAULT_VIDEOS }: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const displayVideos = videos.length > 0 ? videos : DEFAULT_VIDEOS

  return (
    <section id="video" className="py-24" style={{ backgroundColor: '#0f0f0f' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-12"
        >
          <p
            className="font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: '#FF5500' }}
          >
            OUR STORY
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl uppercase">Watch Our Story</h2>
        </motion.div>

        {/* Reel cards — horizontal scroll */}
        <motion.div
          className="flex justify-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {displayVideos.map((video) => (
            <motion.div
              key={video.id}
              variants={fadeUp}
              className="relative flex-shrink-0 snap-start rounded-2xl overflow-hidden cursor-pointer group"
              style={{ width: 210, height: 370 }}
              onClick={() => setActiveVideo(video.video_url)}
              transition={{ duration: 0.25 }}
            >
              {/* Thumbnail */}
              <Image
                src={video.thumbnail_url}
                alt={video.title}
                fill
                className="object-cover transition-all duration-500 group-hover:brightness-75"
                unoptimized
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Orange border on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: 'inset 0 0 0 2px #FF5500' }}
              />

              {/* Play button — centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,85,0,0.9)' }}
                  whileHover={{ scale: 1.15 }}
                >
                  <Play size={18} className="text-black ml-0.5" fill="black" />
                </motion.div>
              </div>

              {/* Title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-display text-white text-base uppercase leading-tight">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
              style={{ aspectRatio: '16/9' }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="MR7 Fitness Video"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 rounded-full p-2 transition-colors text-white"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF5500')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')}
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
