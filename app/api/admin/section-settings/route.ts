import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

  const supabase = await createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('section_settings')
    .select('key, enabled')
    .eq('key', key)
    .single()

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Return default enabled=true if no row exists yet
  return NextResponse.json(data ?? { key, enabled: true })
}

export async function PUT(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const { key, enabled } = await req.json()

  const { data, error } = await supabase
    .from('section_settings')
    .upsert({ key, enabled, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
