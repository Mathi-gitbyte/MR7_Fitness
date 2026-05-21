export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
  const supabase = await createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('story_videos')
    .select('*')
    .order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const { title, video_url, video_public_id, thumbnail_url, sort_order } = await req.json()

  if (!video_url) return NextResponse.json({ error: 'Missing video_url' }, { status: 400 })

  // Auto-generate thumbnail from Cloudinary if not provided
  const thumbUrl = thumbnail_url || video_url.replace('/upload/', '/upload/so_0/').replace(/\.[^.]+$/, '.jpg')

  const { data, error } = await supabase
    .from('story_videos')
    .insert([{ title, video_url, thumbnail_url: thumbUrl, cloudinary_public_id: video_public_id ?? '', sort_order: sort_order ?? 0 }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const body = await req.json()
  const { id, ...rest } = body
  const { data, error } = await supabase
    .from('story_videos')
    .update(rest)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const { id, cloudinary_public_id } = await req.json()
  if (cloudinary_public_id) {
    await deleteFromCloudinary(cloudinary_public_id, 'video')
  }
  const { error } = await supabase.from('story_videos').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
