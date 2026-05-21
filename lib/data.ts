import { createServerSupabaseClient } from './supabase-server'

export type HeroMedia = {
  id: string
  url: string
  type: 'image' | 'video'
  cloudinary_public_id: string
} | null

export type Instructor = {
  id: string
  name: string
  specialty: string
  summary: string
  photo_url: string
  cloudinary_public_id: string
  sort_order: number
}

export type PricingPlan = {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  is_popular: boolean
  sort_order: number
}

export type GalleryItem = {
  id: string
  url: string
  type: 'image' | 'video'
  cloudinary_public_id: string
  alt: string
  sort_order: number
}

export type StoryVideo = {
  id: string
  title: string
  thumbnail_url: string
  video_url: string
  cloudinary_public_id: string
  sort_order: number
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'default-1',
    name: 'Basic',
    price: '₹1,999',
    period: '/month',
    features: ['Full gym access', 'Locker room access', 'Basic equipment', '2 group classes/month'],
    is_popular: false,
    sort_order: 0,
  },
  {
    id: 'default-2',
    name: 'Premium',
    price: '₹3,499',
    period: '/month',
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      'Personal trainer (2/month)',
      'Nutrition consultation',
      'Priority booking',
      'Body composition scan',
    ],
    is_popular: true,
    sort_order: 1,
  },
  {
    id: 'default-3',
    name: 'Elite',
    price: '₹5,999',
    period: '/month',
    features: [
      'Everything in Premium',
      'Daily personal training',
      'Custom meal plan',
      'Body composition tracking',
      '24/7 VIP access',
      'Guest passes (2/month)',
      'Recovery lounge access',
      'Supplement guidance',
    ],
    is_popular: false,
    sort_order: 2,
  },
]

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', type: 'image', cloudinary_public_id: '', alt: 'Gym interior', sort_order: 0 },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80', type: 'image', cloudinary_public_id: '', alt: 'Training equipment', sort_order: 1 },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80', type: 'image', cloudinary_public_id: '', alt: 'Athlete training', sort_order: 2 },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80', type: 'image', cloudinary_public_id: '', alt: 'Weight lifting', sort_order: 3 },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', type: 'image', cloudinary_public_id: '', alt: 'Workout session', sort_order: 4 },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80', type: 'image', cloudinary_public_id: '', alt: 'Gym floor', sort_order: 5 },
]

const DEFAULT_VIDEOS: StoryVideo[] = [
  { id: 'v1', title: 'Morning Strength', thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1', cloudinary_public_id: '', sort_order: 0 },
  { id: 'v2', title: 'MMA Session', thumbnail_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80', video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1', cloudinary_public_id: '', sort_order: 1 },
  { id: 'v3', title: 'Yoga Flow', thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1', cloudinary_public_id: '', sort_order: 2 },
  { id: 'v4', title: 'Zumba Energy', thumbnail_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80', video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1', cloudinary_public_id: '', sort_order: 3 },
  { id: 'v5', title: 'Kickboxing', thumbnail_url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80', video_url: 'https://www.youtube.com/embed/uNN62f55EV0?autoplay=1', cloudinary_public_id: '', sort_order: 4 },
]

async function trySupabase<T>(fetcher: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return fallback
  try {
    const data = await fetcher()
    return data.length > 0 ? data : fallback
  } catch {
    return fallback
  }
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  return trySupabase(async () => {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order')
    if (error) throw error
    return data ?? []
  }, DEFAULT_PLANS)
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return trySupabase(async () => {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order')
    if (error) throw error
    return data ?? []
  }, DEFAULT_GALLERY)
}

export async function getStoryVideos(): Promise<StoryVideo[]> {
  return trySupabase(async () => {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('story_videos')
      .select('*')
      .order('sort_order')
    if (error) throw error
    return data ?? []
  }, DEFAULT_VIDEOS)
}

const DEFAULT_INSTRUCTORS: Instructor[] = [
  {
    id: 'i1',
    name: 'Raj Kumar',
    specialty: 'Strength & Conditioning',
    summary: '10 years elite powerlifting coaching',
    photo_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    cloudinary_public_id: '',
    sort_order: 0,
  },
  {
    id: 'i2',
    name: 'Priya Sharma',
    specialty: 'Nutrition & Weight Loss',
    summary: 'Certified nutritionist, 500+ transformations',
    photo_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
    cloudinary_public_id: '',
    sort_order: 1,
  },
  {
    id: 'i3',
    name: 'Arjun Mehta',
    specialty: 'CrossFit & HIIT',
    summary: 'Former national athlete, CrossFit Level 3',
    photo_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    cloudinary_public_id: '',
    sort_order: 2,
  },
  {
    id: 'i4',
    name: 'Neha Patel',
    specialty: 'Yoga & Flexibility',
    summary: 'RYT-500 certified, mobility specialist',
    photo_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
    cloudinary_public_id: '',
    sort_order: 3,
  },
]

export async function getHeroMedia(): Promise<HeroMedia> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('hero_media')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (error && error.code !== 'PGRST116') return null
    return data ?? null
  } catch {
    return null
  }
}

export async function getInstructors(): Promise<{ enabled: boolean; instructors: Instructor[] }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { enabled: true, instructors: DEFAULT_INSTRUCTORS }
  }
  try {
    const supabase = await createServerSupabaseClient()
    const [settingsRes, instructorsRes] = await Promise.all([
      supabase.from('section_settings').select('enabled').eq('key', 'instructors_section').single(),
      supabase.from('instructors').select('*').order('sort_order'),
    ])
    const enabled = settingsRes.data?.enabled ?? true
    const instructors = (instructorsRes.data ?? []).length > 0
      ? (instructorsRes.data as Instructor[])
      : DEFAULT_INSTRUCTORS
    return { enabled, instructors }
  } catch {
    return { enabled: true, instructors: DEFAULT_INSTRUCTORS }
  }
}
