import { mailOptions, transporter } from '@/config/nodemailer'

import { NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/lib/i18n'

function resolveLocale(input) {
  return input === 'uk' || input === 'en' ? input : routing.defaultLocale
}

export async function POST(request) {
  const data = await request.json().catch(() => ({}))
  const locale = resolveLocale(data?.locale)
  const t = await getTranslations({ locale, namespace: 'shared.mailingList.submitButton' })

  if (!data || !data.email) {
    return new NextResponse(JSON.stringify({ message: t('error') }), {
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

    return new NextResponse(JSON.stringify({ success: true, message: t('sent') }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)

    return new NextResponse(JSON.stringify({ message: t('error') }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
