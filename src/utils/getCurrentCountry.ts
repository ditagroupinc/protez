import { getCountry } from '@/lib/api'

export async function getCurrentCountry() {
  try {
    const country = await getCountry()

    return country?.countryName || ''
  } catch (error) {
    console.error('Error fetching country:', error)

    return ''
  }
}
