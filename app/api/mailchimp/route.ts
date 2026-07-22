import { isValidEmail } from '@/utils/emailValidation'
import { NextResponse, NextRequest } from 'next/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/lib/i18n'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const client = require('@mailchimp/mailchimp_marketing')

const mailchimpAPIkey = process.env.MAILCHIMP_API_KEY
const dc = 'us8'
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

client.setConfig({
  apiKey: mailchimpAPIkey,
  server: dc,
})

function resolveLocale(input: unknown): 'en' | 'uk' {
  return input === 'uk' || input === 'en' ? input : (routing.defaultLocale as 'en' | 'uk')
}

export async function POST(request: NextRequest) {
  const data: { email?: string; locale?: string } = await request.json().catch(() => ({}))
  const locale = resolveLocale(data?.locale)
  const t = await getTranslations({ locale, namespace: 'shared.mailingList.submitButton' })

  if (!data || !data.email || !isValidEmail(data.email)) {
    return new NextResponse(JSON.stringify({ message: t('error') }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const requestData = {
    email_address: data.email,
    status: 'subscribed',
  }

  try {
    const response = await client.lists.addListMember(audienceId, requestData)

    return new NextResponse(JSON.stringify({ success: true, message: t('sent'), response }), {
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
