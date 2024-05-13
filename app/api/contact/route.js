import { mailOptions, transporter } from '@/config/nodemailer'

import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.json()

  if (!data || !data.email) {
    return new NextResponse(JSON.stringify({ message: 'Bad request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: 'Join our mailing list',
      text: data.email,
    })

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)

    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
