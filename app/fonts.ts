import localFont from 'next/font/local'
import { Nunito_Sans } from 'next/font/google'

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  adjustFontFallback: false,
})

// Kept as a local font because SampleProsthesesCosts.tsx still consumes the
// `.className` directly. Migrate to next/font/google when that section is
// reworked.
export const playfairDisplayItalic = localFont({
  src: '../public/fonts/PlayfairDisplay-Italic.ttf',
})
