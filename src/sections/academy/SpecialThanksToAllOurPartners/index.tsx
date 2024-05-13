import AcademySection from '../AcademySection'

import Button from '@/components/Button'

import Image from 'next/image'

import styles from './styles.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
// import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const PartnerLogo = ({ image }: { image: string }) => (
  <Image
    src={`/partnersLogos/${image}`}
    alt={image}
    width={300}
    height={230}
    className={styles.partnerLogo}
  />
)

const partnersIcon: Record<string, JSX.Element> = {
  '2-3-2': <PartnerLogo image="chaliceOfMercy.svg" />,
  '2-3-3': <PartnerLogo image="ottobock.svg" />,
  '2-3-4': <PartnerLogo image="paradise.svg" />,
  '2-3-5': <PartnerLogo image="klmb.svg" />,
  '3-4-1': <PartnerLogo image="monarch.svg" />,
  '3-4-2': <PartnerLogo image="dita.svg" />,
  '3-4-3': <PartnerLogo image="antonovGroup.svg" />,
  '3-4-4': <PartnerLogo image="cozen.svg" />,
  '3-4-5': <PartnerLogo image="blatchfold.svg" />,
}

const SpecialThanksToAllOurPartners = () => {
  const { lang } = useLanguage()
  // const { width } = useScreenModeAndSize()

  return (
    <AcademySection
      id="specialThanksToAllOurPartners"
      className={styles.specialThanksToAllOurPartners}
    >
      <div className={styles.grid1x1}>
        <Button as="link" href="/" variant="normal-black">
          Discover all <br />
          Partners
          {icons.arrowUp()}
        </Button>
      </div>
      <div className={`${styles.borderBottom} ${styles.title}`}>
        {icons.specialThanksToAllOurPartnersLogo.desktop[lang]()}
        {/* <SectionTitle>
          <span className="nunito">Special</span>
          <br />
          <span className="playfair">Thanks to All Our</span>
          <br />
          <span className="nunito">PARTNERS</span>
        </SectionTitle> */}
      </div>
      <div className={`${styles.grid1x5} ${styles.borderBottom}`}>
        <PartnerLogo image="directRelief.svg" />
      </div>
      {[2, 3, 4, 5].map((count, index) => (
        <div
          key={count}
          style={{
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: count,
            gridColumnEnd: count + 1,
          }}
          className={`${styles.borderBottom} ${styles.borderRight} ${index === 0 && styles.borderLeft}`}
        >
          {partnersIcon[`2-3-${count}`]}
        </div>
      ))}
      {[1, 2, 3, 4, 5].map((count, index) => (
        <div
          key={count}
          style={{
            gridRowStart: 3,
            gridRowEnd: 4,
            gridColumnStart: count,
            gridColumnEnd: count + 1,
          }}
          className={`${styles.borderBottom} ${styles.borderRight} ${index === 0 && `${styles.borderLeft} ${styles.borderTop}`}`}
        >
          {partnersIcon[`3-4-${count}`]}
        </div>
      ))}
    </AcademySection>
  )
}

export default SpecialThanksToAllOurPartners
