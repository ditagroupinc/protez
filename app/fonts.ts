import localFont from 'next/font/local'
import { Nunito_Sans } from 'next/font/google'

export const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  adjustFontFallback: false,
})

// Kept as a local font because SampleProsthesesCosts.tsx still consumes the
// `.className` directly. Migrate to next/font/google when that section is
// reworked.
export const playfairDisplayItalic = localFont({
  src: '../public/fonts/PlayfairDisplay-Italic.ttf',
})
