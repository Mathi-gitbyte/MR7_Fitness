export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
  const supabase = await createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('hero_media')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data ?? null)
}

export async function POST(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  // Delete existing hero media first
  const { data: existing } = await supabase
    .from('hero_media')
    .select('id, cloudinary_public_id, type')
  if (existing && existing.length > 0) {
    for (const item of existing) {
      if (item.cloudinary_public_id) {
        await deleteFromCloudinary(item.cloudinary_public_id, item.type === 'video' ? 'video' : 'image')
      }
    }
    await supabase.from('hero_media').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  }

  const isVideo = file.type.startsWith('video/')
  const buffer = Buffer.from(await file.arrayBuffer())
  const { url, publicId } = await uploadToCloudinary(buffer, 'mr7-hero', isVideo ? 'video' : 'image')

  const { data, error } = await supabase
    .from('hero_media')
    .insert([{ url, cloudinary_public_id: publicId, type: isVideo ? 'video' : 'image' }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE() {
  const supabase = await createAdminSupabaseClient()
  const { data: existing } = await supabase.from('hero_media').select('id, cloudinary_public_id, type')

  if (existing && existing.length > 0) {
    for (const item of existing) {
      if (item.cloudinary_public_id) {
        await deleteFromCloudinary(item.cloudinary_public_id, item.type === 'video' ? 'video' : 'image')
      }
    }
    await supabase.from('hero_media').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  }

  return NextResponse.json({ success: true })
}
