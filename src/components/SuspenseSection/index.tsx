import { Suspense, ReactNode } from 'react'
import SmokeWrapper from '@/sections/ProtezHomePage/SmokeWrapper'

interface SuspenseSectionProps {
  children: ReactNode
  withSmoke?: boolean
  fallback?: ReactNode
}

// Soft placeholder used by default so below-the-fold sections don't flash a
// full-screen loader on scroll-triggered hydration. Pass a custom `fallback`
// (e.g. <FullScreenFallback />) for the initial above-the-fold section.
const SoftFallback = <div aria-hidden style={{ minHeight: 200 }} />

export default function SuspenseSection({
  children,
  withSmoke = false,
  fallback = SoftFallback,
}: SuspenseSectionProps) {
  const content = <Suspense fallback={fallback}>{children}</Suspense>

  return withSmoke ? <SmokeWrapper>{content}</SmokeWrapper> : content
}
