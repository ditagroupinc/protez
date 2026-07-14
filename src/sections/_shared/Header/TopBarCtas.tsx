'use client'

import { useTranslations } from 'next-intl'

import Button, { MakeDonationButton } from '@/components/Button'
import AcademyButton from '@/components/AcademyButton'

import { ACADEMY_APPLY_FORM_URL } from '@academy/consts/links'

import { NEED_A_PROTHESIS_URL } from './config'

const HomeCtas = () => {
  const t = useTranslations('shared.header')

  return (
    <>
      <MakeDonationButton size="small" />
      <Button
        as="link"
        href={NEED_A_PROTHESIS_URL}
        target="_blank"
        variant="secondary-white"
        size="small"
      >
        {t('protezPage.actionButtons.needAProthesis')}
      </Button>
    </>
  )
}

const AcademyCtas = () => {
  const t = useTranslations('academy')

  return (
    <>
      <AcademyButton
        as="link"
        href={ACADEMY_APPLY_FORM_URL}
        target="_blank"
        variant="primary-blue"
        size="small"
        rel="noopener noreferrer"
      >
        {t('cta.apply')}
      </AcademyButton>
      <AcademyButton as="link" href="/" variant="secondary-white" size="small">
        {t('header.cta.foundation')}
      </AcademyButton>
    </>
  )
}

const ChildrenProstheticsCtas = () => {
  const t = useTranslations('shared.header')

  return (
    <>
      <MakeDonationButton size="small" variant="primary-teal" />
      <Button
        as="link"
        href={NEED_A_PROTHESIS_URL}
        target="_blank"
        variant="secondary-black"
        size="small"
      >
        {t('protezPage.actionButtons.needAProthesis')}
      </Button>
    </>
  )
}

const GeneralCtas = () => {
  const t = useTranslations('shared.header')

  return (
    <>
      <Button as="link" href="/" variant="secondary-white" size="small">
        {t('academyPage.actionButtons.protezFoundation')}
      </Button>
      <MakeDonationButton size="small" />
      <Button
        as="link"
        href={NEED_A_PROTHESIS_URL}
        target="_blank"
        variant="secondary-white"
        size="small"
      >
        {t('protezPage.actionButtons.needAProthesis')}
      </Button>
    </>
  )
}

const TopBarCtas = ({
  variant,
}: {
  variant: 'home' | 'academy' | 'childrenProsthetics' | 'general'
}) => {
  if (variant === 'academy') return <AcademyCtas />
  if (variant === 'childrenProsthetics') return <ChildrenProstheticsCtas />
  if (variant === 'general') return <GeneralCtas />

  return <HomeCtas />
}

export default TopBarCtas
