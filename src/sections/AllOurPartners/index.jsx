import style from './ourPartners.module.css'
import icons from './icons'
import Image from 'next/image'
import Link from 'next/link'
import globalIcons from '@/texts&svg/icons'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const partnersLogos = [
  'antonovGroup.svg',
  'businessBus.svg',
  'chaliceOfMercy.svg',
  'dita.svg',
  'directRelief.svg',
  'klmb.svg',
  'ossur.svg',
  'ottobock.svg',
  'paradise.svg',
  'proteor.svg',
  'slumberland.svg',
  'ukraine.svg',
  '4front.svg',
  'blatchfold.svg',
  'cerebral.svg',
  'cozen.svg',
  'evangelicalChurch.svg',
  'humanaTravel.svg',
  'monarch.svg',
  'printing.svg',
  'smak.svg',
  'sTconstantin.svg',
  'stMaron.svg',
  'ticketToAmerica.svg',
  'ukrainianHabitat.svg',
  'ukrsib.svg',
]

const PartnerCard = ({ image, mobile }) => {
  if (image.includes('dita'))
    return (
      <div
        className={`${mobile ? style.mobile : style.desktop} ${style.partnerCard} ${style.dita}`}
      >
        <Link href="https://dita-group.com/" target="blank">
          {globalIcons.ditaLogo(`${style.partnerLogo}`)}
        </Link>
      </div>
    )

  return (
    <div className={`${mobile ? style.mobile : style.desktop} ${style.partnerCard} `}>
      <Image
        src={`/partnersLogos/${image}`}
        object-fit="contain"
        alt={image}
        width={300}
        height={230}
        className={style.partnerLogo}
      />
    </div>
  )
}

export default function AllOurPartners() {
  const { lang } = useLanguage()
  const { tabletLarge, mobile } = useScreenModeAndSize()

  return (
    <section className={`${style.section} section `} id="allOurPartners">
      <div className={style.specialThanks}>
        {tabletLarge
          ? icons.specialThanksLogo.tablet[lang](`${style.logo} svgTextBlock`)
          : icons.specialThanksLogo.desktop[lang](`${style.logo} svgTextBlock`)}
      </div>
      <div className={style.container}>
        {partnersLogos.map((logo, index) => (
          <PartnerCard key={index} image={logo} mobile={mobile} />
        ))}
      </div>
    </section>
  )
}
