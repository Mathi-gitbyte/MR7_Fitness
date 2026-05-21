import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const body = await req.json()
  const { data, error } = await supabase
    .from('pricing_plans')
    .insert([body])
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
    .from('pricing_plans')
    .update(rest)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const supabase = await createAdminSupabaseClient()
  const { id } = await req.json()
  const { error } = await supabase.from('pricing_plans').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
