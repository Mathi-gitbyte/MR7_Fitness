'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LayoutDashboard, CreditCard, ImageIcon, Video, Users, LogOut, Tv } from 'lucide-react'
import { createClient } from '@/lib/supabase'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero', href: '/admin/hero', icon: Tv },
  { label: 'Pricing', href: '/admin/pricing', icon: CreditCard },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Videos', href: '/admin/videos', icon: Video },
  { label: 'Instructors', href: '/admin/instructors', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Don't render sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: '#080808', borderRight: '1px solid #1a1a1a' }}
      >
        {/* Logo */}
        <div className="px-6 py-7" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <span className="font-display text-2xl uppercase text-[#FF5500]">MR7</span>
          <span className="font-display text-2xl uppercase text-white ml-1">ADMIN</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: active ? 'rgba(255,85,0,0.12)' : 'transparent',
                  color: active ? '#FF5500' : '#888',
                  borderLeft: active ? '2px solid #FF5500' : '2px solid transparent',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#888' }}
              >
                <Icon size={17} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6" style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1rem' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-semibold text-[#888] transition-colors hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#0d0d0d]">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
