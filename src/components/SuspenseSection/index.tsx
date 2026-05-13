import { Suspense, ReactNode } from 'react'
import FullScreenFallback from '@/components/FullScreenFallback'
import SmokeWrapper from '@/sections/ProtezHomePage/SmokeWrapper'

interface SuspenseSectionProps {
  children: ReactNode
  withSmoke?: boolean
  fallback?: ReactNode
}

export default function SuspenseSection({
  children,
  withSmoke = false,
  fallback = <FullScreenFallback />,
}: SuspenseSectionProps) {
  const content = <Suspense fallback={fallback}>{children}</Suspense>

  return withSmoke ? <SmokeWrapper>{content}</SmokeWrapper> : content
}
