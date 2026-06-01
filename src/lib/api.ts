const wordpressUrl = process.env.WORDPRESS_API_URL
const refreshToken = process.env.WORDPRESS_AUTH_REFRESH_TOKEN

import { isValidEmail } from '@/utils/emailValidation'

// export const sendContactForm = async (data: {
//   name?: string;
//   email?: string;
//   message?: string;
// }) => {
//   return fetch('/api/contact', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   }).then(res => {
//     if (!res.ok) throw new Error('Failed to send message')

//     return res.json()
//   })
// }

interface FetchAPIOptions {
  variables?: Record<string, unknown>
}

async function fetchAPI(query = '', { variables }: FetchAPIOptions = {}) {
  if (!wordpressUrl) {
    console.error('WP URL not set')

    return null
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }),
  }

  // WPGraphQL Plugin must be enabled
  try {
    const response = await fetch(wordpressUrl as string, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 3600, tags: ['wp'] },
    })

    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`)

      return null
    }

    const json = await response.json()

    if (json.errors) {
      console.error('API Error:', json.errors)

      return null
    }

    return json.data
  } catch (error) {
    console.error('Fetch error:', error)

    return null
  }
}

export async function getAllSections() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts {
        edges {
          node {
            id
            content
            title
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: true,
      },
    }
  )

  return data?.posts.edges
}

export const subscribeToMailchimp = async (data: { email: string; locale?: string }) => {
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Wrong email format at email subscription')
  }

  try {
    const response = await fetch('/api/mailchimp', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe')
    }

    return await response.json()
  } catch (error) {
    console.error('Mailchimp subscription error:', error)

    return null
  }
}
