export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { cloudinary } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  const { folder, resource_type = 'auto' } = await req.json()
  const timestamp = Math.round(Date.now() / 1000)
  const paramsToSign: Record<string, string | number> = { folder, timestamp }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    resource_type,
  })
}
