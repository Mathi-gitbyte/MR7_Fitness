export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { CreditCard, ImageIcon, Video, Users } from 'lucide-react'

const cards = [
  { title: 'Pricing Plans', desc: 'Add, edit, or delete membership plans. Mark a plan as popular.', href: '/admin/pricing', icon: CreditCard },
  { title: 'Gallery', desc: 'Upload gym images and videos, reorder, and delete items.', href: '/admin/gallery', icon: ImageIcon },
  { title: 'Story Videos', desc: 'Manage Instagram reel-style video cards shown on the website.', href: '/admin/videos', icon: Video },
  { title: 'Instructors', desc: 'Enable the section and manage trainer profiles shown on the website.', href: '/admin/instructors', icon: Users },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-white text-4xl uppercase mb-2">Dashboard</h1>
      <p className="font-body text-sm mb-10" style={{ color: '#888' }}>
        Welcome back. Manage your MR7 Unisex Fitness content below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map(({ title, desc, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl p-6 flex flex-col gap-4 transition-all duration-200 group"
            style={{ backgroundColor: '#111', border: '1px solid #222' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222')}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,85,0,0.12)' }}
            >
              <Icon size={20} color="#FF5500" />
            </div>
            <div>
              <h2 className="font-display text-white text-xl uppercase mb-1">{title}</h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#888' }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
