import { useContext, FunctionComponent } from 'react'
import { LanguageContext, ILanguageContext } from '@/contexts/LanguageContext'
import SquareButton from '@/components/SquareButton'
import Divider from '@/components/Divider'
import texts from '@/texts&svg'

import style from './style.module.scss'

const CompanyDataNonProfit = ({
  className = '',
  black,
  bgIsPink,
}: {
  className?: string
  black?: boolean
  bgIsPink?: boolean
}) => {
  const { lang } = useContext<ILanguageContext>(LanguageContext)

  return (
    <div className={`${style.container} ${black ? style.black : ''} ${className}`}>
      <div className={style.addressContainer}>
        <p>
          <span className={'h6 '}>
            {texts.companyData.organizationData.nonProfitOrganization[lang]}
          </span>
          <span className={'h6 '}>{texts.companyData.organizationData.ein[lang]}</span>
        </p>
        <Divider />
      </div>
      <div className={style.buttonsContainer}>
        <SquareButton link href="donate" pink={!bgIsPink} black={bgIsPink}>
          {texts.companyData.actionButtons.makeDonation[lang]}
        </SquareButton>

        <SquareButton
          emptyBlack={black}
          link
          blank
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_ESrB0vY6973GQSYfDY-WtWYE8UXnaeHJzxIQrEWPaQ_UXw/"
        >
          {texts.companyData.actionButtons.makeDonation[lang]}
        </SquareButton>
      </div>
    </div>
  )
}

export default CompanyDataNonProfit
