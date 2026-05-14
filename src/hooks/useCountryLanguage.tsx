import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

export function useCountryLanguage(country: string) {
  const { setLang } = useLanguage()

  useEffect(() => {
    if (country === 'Ukraine') {
      setLang(Languages.Ukrainian)
    }
  }, [country, setLang])
}
