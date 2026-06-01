import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

interface RevalidatePayload {
  secret?: string
  tag?: string
  path?: string
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET

  if (!expectedSecret) {
    console.error('REVALIDATE_SECRET is not configured')

    return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 })
  }

  let body: RevalidatePayload

  try {
    body = (await request.json()) as RevalidatePayload
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  const { secret, tag, path } = body

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tag && !path) {
    return NextResponse.json({ message: 'Provide a tag or a path' }, { status: 400 })
  }

  if (tag) {
    revalidateTag(tag)
  }

  if (path) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
