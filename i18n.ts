import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from '@/lib/i18n'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const [
    base,
    home,
    shared,
    donations,
    academyAbout,
    termsConditions,
    stories,
    thankYou,
    childrenProsthetics,
    financialAudit,
  ] = await Promise.all([
    import(`./messages/academy.${locale}.json`),
    import(`./messages/home.${locale}.json`),
    import(`./messages/shared.${locale}.json`),
    import(`./messages/donations.${locale}.json`),
    import(`./messages/academy-about.${locale}.json`),
    import(`./messages/termsConditions.${locale}.json`),
    import(`./messages/stories.${locale}.json`),
    import(`./messages/thank-you.${locale}.json`),
    import(`./messages/children-prosthetics.${locale}.json`),
    import(`./messages/financial-audit.${locale}.json`),
  ])

  return {
    locale,
    messages: {
      academy: base.default.academy,
      home: home.default,
      shared: shared.default,
      donate: donations.default,
      academyAbout: academyAbout.default,
      termsConditions: termsConditions.default,
      stories: stories.default,
      thankYou: thankYou.default,
      childrenProsthetics: childrenProsthetics.default,
      financialAudit: financialAudit.default,
    },
  }
})
