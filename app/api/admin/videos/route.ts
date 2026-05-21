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
  const formData = await req.formData()
  const videoFile = formData.get('video') as File | null
  const thumbnailFile = formData.get('thumbnail') as File | null
  const title = (formData.get('title') as string) ?? ''
  const sortOrder = parseInt((formData.get('sort_order') as string) ?? '0', 10)

  if (!videoFile) return NextResponse.json({ error: 'No video file provided' }, { status: 400 })

  const videoBuffer = Buffer.from(await videoFile.arrayBuffer())
  const { url: videoUrl, publicId } = await uploadToCloudinary(videoBuffer, 'mr7-story-videos', 'video')

  let thumbnailUrl = ''
  if (thumbnailFile) {
    const thumbBuffer = Buffer.from(await thumbnailFile.arrayBuffer())
    const { url } = await uploadToCloudinary(thumbBuffer, 'mr7-story-thumbnails', 'image')
    thumbnailUrl = url
  } else {
    // Auto-generate thumbnail from Cloudinary video URL
    thumbnailUrl = videoUrl.replace('/upload/', '/upload/so_0/').replace(/\.[^.]+$/, '.jpg')
  }

  const { data, error } = await supabase
    .from('story_videos')
    .insert([{ title, video_url: videoUrl, thumbnail_url: thumbnailUrl, cloudinary_public_id: publicId, sort_order: sortOrder }])
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
