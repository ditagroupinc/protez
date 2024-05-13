import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const NumberColumn = ({
  text,
  number,
  isUkrainianLanguage,
}: {
  text: string
  number: string
  isUkrainianLanguage: boolean
}) => (
  <div className={`${style.counter} ${isUkrainianLanguage && style.ukrainian}`}>
    <div>
      <TextAppearanceWrapper reverse className={`${style.title} h2`}>
        {text}
      </TextAppearanceWrapper>
    </div>
    <TextAppearanceWrapper reverse className={`${style.bigNumb}`}>
      {number}
    </TextAppearanceWrapper>
  </div>
)

export default NumberColumn
