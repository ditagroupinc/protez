import style from './style.module.css'
import globalIcons from '@/texts&svg/icons'
import Image from 'next/image'
import Link from 'next/link'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const PartnerCard = ({ image, dita }: { image?: string; dita?: boolean }) => {
  if (dita)
    return (
      <TextAppearanceWrapper>
        <Link
          href="https://dita-group.com/"
          target="blank"
          className={`${style.partnerCard} ${dita && style.dita}`}
        >
          {globalIcons.ditaLogo(`${style.partnerLogo}`)}
        </Link>
      </TextAppearanceWrapper>
    )

  return (
    <TextAppearanceWrapper className={style.partnerCard}>
      <Image
        src={`/partnersLogos/${image}`}
        object-fit="contain"
        alt={image as string}
        width={300}
        height={230}
        className={style.partnerLogo}
      />
    </TextAppearanceWrapper>
  )
}

export default PartnerCard
