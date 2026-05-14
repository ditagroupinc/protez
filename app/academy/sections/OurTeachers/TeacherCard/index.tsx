import ProtezImage from '@/components/ProtezImage'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

export default function TeacherCard({
  photo,
  name,
  position,
  black,
  className,
}: {
  photo: string
  name: string
  position: string
  black?: boolean
  className?: string
}) {
  const { width } = useScreenModeAndSize()

  return (
    <TextAppearanceWrapper
      isDisabled={width < 600}
      className={`${style.teamCard} ${className ?? ''}`}
    >
      <ProtezImage
        src={`academyPage/teachers/${photo}`}
        object-fit="contain"
        alt={photo}
        width={345}
        height={300}
        className={style.teacherImage}
      />
      <div className={`${style.container} ${black ? style.black : ''}`}>
        <h5 className={`h5 ${style.name}`}>{name}</h5>

        <h6 className={`h6 ${style.position}`}>{position}</h6>
      </div>
    </TextAppearanceWrapper>
  )
}
