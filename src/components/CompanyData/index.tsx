import SquareButton from '@/components/SquareButton'
import Divider from '@/components/Divider'
import texts from '@/texts&svg'
import icons from './icons'
import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'

const CompanyData = ({
  className = '',
  black,
  colorInverted,
}: {
  className?: string
  black?: boolean
  colorInverted?: boolean
}) => {
  const { lang } = useLanguage()

  return (
    <div className={`${style.container} ${className} ${black && style.black}`}>
      <Divider className={style.divider} />
      <div className={`${style.buttonsContainer}`}>
        <SquareButton link href="donate" pink black={colorInverted}>
          {texts.companyData.actionButtons.makeDonation[lang]}
        </SquareButton>

        <SquareButton
          emptyBlack={black}
          link
          blank
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_ESrB0vY6973GQSYfDY-WtWYE8UXnaeHJzxIQrEWPaQ_UXw/viewform"
        >
          {texts.companyData.actionButtons.needAProtez[lang]}
        </SquareButton>

        <SquareButton
          emptyBlack={black}
          link
          blank
          href="https://a.co/1DFbVIa?fbclid=IwAR26aMbpS7n8oVD2YlJu6fgSHf9BzRihSkHd19MhB4tNsFRcNLU6-Ja0hFc"
          className={style.amazonButton}
        >
          <span className={style.amazonButtonText}>
            {texts.companyData.actionButtons.supportWith[lang]}
          </span>
          {black ? icons.amazonBlack() : icons.amazon()}
        </SquareButton>

        <SquareButton
          emptyBlack={black}
          link
          blank
          black
          href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
          className={`${style.thirdButton}`}
        >
          {texts.companyData.actionButtons.protezAcademy[lang]}
        </SquareButton>
      </div>
    </div>
  )
}

export default CompanyData
