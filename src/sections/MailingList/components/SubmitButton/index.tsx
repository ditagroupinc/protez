import style from './style.module.css'
import Image from 'next/image'
import SquareButton from '@/components/SquareButton'

import { FormStatus } from '@/types'

const SpinnerButton = () => (
  <button type="button" className={`${style.button} ${style.spinnerButton}`}>
    <Image src={'/spinner.gif'} alt="spinner" width={40} height={40} />
  </button>
)

const SuccessButton = () => (
  <button type="button" className={`${style.button} ${style.successButton}`}>
    Sent
  </button>
)

const ErrorButton = () => (
  <button type="button" className={`${style.button} ${style.errorButton}`}>
    Error
  </button>
)

const SubmitButton = ({ formStatus, text }: { formStatus: FormStatus; text: string }) => {
  switch (formStatus) {
    case 'isLoading':
      return <SpinnerButton />
    case 'error':
      return <ErrorButton />
    case 'sent':
      return <SuccessButton />
    default:
      return <SquareButton pink>{text}</SquareButton>
  }
}

export default SubmitButton
