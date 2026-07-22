// Single source of truth for the /financial-audit page. Values are ported from
// the audited-figures object in the design mockup; the comparison table derives
// its cells from here so stale numbers can never drift back in.

export type LocalizedText = {
  en: string
  uk: string
}

export type CategoryDatum = {
  pct: number
  amount: LocalizedText
}

export type YearSplit = {
  program: number
  admin: number
  fund: number
}

export type YearData = {
  patients: number | null
  budget: LocalizedText | null
  split: YearSplit | null
  reportPdf: string | null
  pending?: boolean
  cats: CategoryDatum[]
}

export const AUDIT_YEARS = [2022, 2023, 2024, 2025] as const

export const DEFAULT_YEAR = 2024

// Placeholder document — the real per-year audit PDFs replace this later.
const REPORT_PDF = '/documents/foundingDocuments/assessment-regulations.pdf'

const EMPTY_CATS: CategoryDatum[] = Array.from({ length: 8 }, () => ({
  pct: 0,
  amount: { en: '—', uk: '—' },
}))

export const AUDIT_DATA: Record<number, YearData> = {
  2022: {
    patients: 31,
    budget: { en: '610K', uk: '610K' },
    split: { program: 97, admin: 2, fund: 1 },
    reportPdf: REPORT_PDF,
    cats: [
      { pct: 74, amount: { en: '$452K', uk: '$452K' } },
      { pct: 6, amount: { en: '$36K', uk: '$36K' } },
      { pct: 12, amount: { en: '$72K', uk: '$72K' } },
      { pct: 2, amount: { en: '$13K', uk: '$13K' } },
      { pct: 3, amount: { en: '$17K', uk: '$17K' } },
      { pct: 0, amount: { en: '$0', uk: '$0' } },
      { pct: 1, amount: { en: '$5K', uk: '$5K' } },
      { pct: 2, amount: { en: '$14K', uk: '$14K' } },
    ],
  },
  2023: {
    patients: 83,
    budget: { en: '3.76M', uk: '3,76M' },
    split: { program: 96, admin: 1, fund: 3 },
    reportPdf: REPORT_PDF,
    cats: [
      { pct: 60, amount: { en: '$2.28M', uk: '$2,28M' } },
      { pct: 12, amount: { en: '$443K', uk: '$443K' } },
      { pct: 11, amount: { en: '$428K', uk: '$428K' } },
      { pct: 4, amount: { en: '$135K', uk: '$135K' } },
      { pct: 5, amount: { en: '$175K', uk: '$175K' } },
      { pct: 4, amount: { en: '$142K', uk: '$142K' } },
      { pct: 3, amount: { en: '$127K', uk: '$127K' } },
      { pct: 1, amount: { en: '$37K', uk: '$37K' } },
    ],
  },
  2024: {
    patients: 273,
    budget: { en: '3.99M', uk: '3,99M' },
    split: { program: 96, admin: 2, fund: 2 },
    reportPdf: REPORT_PDF,
    cats: [
      { pct: 53, amount: { en: '$2.10M', uk: '$2,10M' } },
      { pct: 19, amount: { en: '$748K', uk: '$748K' } },
      { pct: 10, amount: { en: '$409K', uk: '$409K' } },
      { pct: 8, amount: { en: '$308K', uk: '$308K' } },
      { pct: 4, amount: { en: '$171K', uk: '$171K' } },
      { pct: 3, amount: { en: '$115K', uk: '$115K' } },
      { pct: 2, amount: { en: '$69K', uk: '$69K' } },
      { pct: 1, amount: { en: '$66K', uk: '$66K' } },
    ],
  },
  2025: {
    patients: null,
    budget: null,
    split: null,
    reportPdf: null,
    pending: true,
    cats: EMPTY_CATS,
  },
}

export function getYearData(year: number): YearData {
  return AUDIT_DATA[year] ?? AUDIT_DATA[DEFAULT_YEAR]
}

export const CATEGORY_COLORS = [
  'var(--teal)',
  'var(--chart-amber)',
  'var(--chart-purple)',
  'var(--chart-blue)',
  'var(--chart-coral)',
  'var(--chart-green)',
  'var(--chart-sky)',
  'var(--chart-grey)',
] as const

export const BAR_COLORS = {
  program: 'var(--teal)',
  admin: 'var(--chart-amber)',
  fund: 'var(--chart-purple)',
} as const

export const DONUT_R = 80
export const DONUT_CIRC = 2 * Math.PI * DONUT_R
