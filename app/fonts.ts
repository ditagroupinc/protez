import localFont from 'next/font/local'
import { Nunito_Sans } from 'next/font/google'

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const playfairDisplayItalic = localFont({
  src: '../public/fonts/PlayfairDisplay-Italic.ttf',
})
