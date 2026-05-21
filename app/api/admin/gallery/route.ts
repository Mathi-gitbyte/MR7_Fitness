export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
  const supabase = await createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const alt = (formData.get('alt') as string) ?? ''
  const sortOrder = parseInt((formData.get('sort_order') as string) ?? '0', 10)

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const isVideo = file.type.startsWith('video/')
  const buffer = Buffer.from(await file.arrayBuffer())
  const { url, publicId } = await uploadToCloudinary(buffer, 'mr7-gallery', isVideo ? 'video' : 'image')

  const { data, error } = await supabase
    .from('gallery_items')
    .insert([{ url, cloudinary_public_id: publicId, type: isVideo ? 'video' : 'image', alt, sort_order: sortOrder }])
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
    .from('gallery_items')
    .update(rest)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const { id, cloudinary_public_id, type } = await req.json()
  if (cloudinary_public_id) {
    await deleteFromCloudinary(cloudinary_public_id, type === 'video' ? 'video' : 'image')
  }
  const { error } = await supabase.from('gallery_items').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
