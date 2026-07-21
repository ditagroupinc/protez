'use client'

import { lazy, useRef, useState } from 'react'

import SuspenseSection from '@/components/SuspenseSection'

import { DEFAULT_YEAR } from '../data'
import HeroSection from '../HeroSection'
import YearStats from '../YearStats'
import style from './style.module.scss'

const ExpenseBreakdown = lazy(() => import('../ExpenseBreakdown'))
const BudgetAllocation = lazy(() => import('../BudgetAllocation'))
const YearComparison = lazy(() => import('../YearComparison'))
const DownloadReport = lazy(() => import('../DownloadReport'))

// Crossfade window: fade the swappable content out, swap the data, fade back in.
const SWAP_MS = 200

export default function FinancialAuditPage() {
  const [year, setYear] = useState<number>(DEFAULT_YEAR)
  const [swapping, setSwapping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const changeYear = (next: number) => {
    if (next === year) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setSwapping(true)
    timeoutRef.current = setTimeout(() => {
      setYear(next)
      setSwapping(false)
    }, SWAP_MS)
  }

  return (
    <main className={style.main}>
      <HeroSection year={year} onYearChange={changeYear} />
      <YearStats year={year} swapping={swapping} />

      <SuspenseSection>
        <ExpenseBreakdown year={year} swapping={swapping} />
      </SuspenseSection>

      <SuspenseSection>
        <BudgetAllocation year={year} swapping={swapping} />
      </SuspenseSection>

      <SuspenseSection>
        <YearComparison swapping={swapping} />
      </SuspenseSection>

      <SuspenseSection>
        <DownloadReport year={year} swapping={swapping} />
      </SuspenseSection>
    </main>
  )
}
