import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
  const supabase = await createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const formData = await req.formData()

  const name = (formData.get('name') as string) ?? ''
  const specialty = (formData.get('specialty') as string) ?? ''
  const summary = (formData.get('summary') as string) ?? ''
  const sortOrder = parseInt((formData.get('sort_order') as string) ?? '0', 10)
  const photo = formData.get('photo') as File | null

  let photo_url = ''
  let cloudinary_public_id = ''

  if (photo && photo.size > 0) {
    const buffer = Buffer.from(await photo.arrayBuffer())
    const { url, publicId } = await uploadToCloudinary(buffer, 'mr7-instructors', 'image')
    photo_url = url
    cloudinary_public_id = publicId
  }

  const { data, error } = await supabase
    .from('instructors')
    .insert([{ name, specialty, summary, photo_url, cloudinary_public_id, sort_order: sortOrder }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()

  const contentType = req.headers.get('content-type') ?? ''

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData()
    const id = formData.get('id') as string
    const name = (formData.get('name') as string) ?? ''
    const specialty = (formData.get('specialty') as string) ?? ''
    const summary = (formData.get('summary') as string) ?? ''
    const oldPublicId = (formData.get('cloudinary_public_id') as string) ?? ''
    const photo = formData.get('photo') as File | null

    let photo_url = (formData.get('photo_url') as string) ?? ''
    let cloudinary_public_id = oldPublicId

    if (photo && photo.size > 0) {
      if (oldPublicId) await deleteFromCloudinary(oldPublicId, 'image')
      const buffer = Buffer.from(await photo.arrayBuffer())
      const { url, publicId } = await uploadToCloudinary(buffer, 'mr7-instructors', 'image')
      photo_url = url
      cloudinary_public_id = publicId
    }

    const { data, error } = await supabase
      .from('instructors')
      .update({ name, specialty, summary, photo_url, cloudinary_public_id })
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  // JSON update (no photo change)
  const body = await req.json()
  const { id, ...rest } = body
  const { data, error } = await supabase
    .from('instructors')
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
    await deleteFromCloudinary(cloudinary_public_id, 'image')
  }

  const { error } = await supabase.from('instructors').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
