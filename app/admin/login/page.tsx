'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  const inputBase =
    'w-full font-body text-sm text-white rounded-lg px-4 py-3 outline-none transition-colors bg-[#1a1a1a] border border-[#333]'

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-4xl uppercase text-[#FF5500]">MR7</span>
          <span className="font-display text-4xl uppercase text-white ml-1">ADMIN</span>
          <p className="font-body text-sm mt-2" style={{ color: '#888' }}>
            Sign in to manage your gym content
          </p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: '#111', border: '1px solid #222' }}
        >
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="font-body text-xs tracking-wider uppercase block mb-2 text-[#888]">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mr7fitness.com"
                  className={`${inputBase} pl-10`}
                  required
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-body text-xs tracking-wider uppercase block mb-2 text-[#888]">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputBase} pl-10 pr-10`}
                  required
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5500')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-body text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full font-body font-semibold py-3 rounded-lg text-black transition-colors mt-2"
              style={{ backgroundColor: loading ? '#CC4400' : '#FF5500' }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
