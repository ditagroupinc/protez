// Single source of truth for the /financial-audit page. The USD figures below are
// the audited ones; every percentage on the page is derived from TOTAL_EXPENSES,
// so the donut, the allocation bars and the comparison table can never drift
// apart. Revenue is tracked separately and never feeds a percentage.

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
  revenue: LocalizedText | null
  expenses: LocalizedText | null
  split: YearSplit | null
  reportPdf: string | null
  pending?: boolean
  cats: CategoryDatum[]
}

export const AUDIT_YEARS = [2022, 2023, 2024, 2025] as const

export const DEFAULT_YEAR = 2024

// Audited statements live in public/documents/financialAudit; 2025 is not out yet.
const REPORT_PDF: Record<number, string> = {
  2022: '/documents/financialAudit/2022-audited-fs.pdf',
  2023: '/documents/financialAudit/2023-audited-fs.pdf',
  2024: '/documents/financialAudit/2024-audited-fs.pdf',
}

// Expense categories in the same order as `financialAudit.breakdown.categories`
// in both locale files — sorted by 2024 spend, descending.
//
// Transport and patient meals (positions 4 and 5) are the one pair that does not
// read off a single audited line. A new firm audited 2024 and folded patient
// travel into `Patient expenses`, where the previous firm had kept it in
// `Travel`: 424,187 + 223,789 in 2023 against 183,744 + 462,019 in 2024, so the
// pair total barely moved while the split flipped. The numbers below keep the
// 2022-2023 methodology, which is also what the two category names describe.
const CATEGORY_USD: Record<number, number[]> = {
  2022: [504_532, 34_675, 33_794, 71_891, 29_628, 20_826, 13_166, 0, 25_000],
  2023: [2_042_230, 358_715, 306_372, 424_187, 223_789, 84_718, 96_945, 66_308, 57_478],
  2024: [1_755_173, 542_415, 521_184, 408_695, 237_068, 218_809, 179_072, 96_237, 13_599],
}

const CATEGORY_COUNT = 9

// Totals as reported. The category rows above sum to exactly these numbers;
// keeping them explicit means a typo shows up as a broken total, not a silent one.
const TOTAL_EXPENSES: Record<number, number> = {
  2022: 733_512,
  2023: 3_660_742,
  2024: 3_972_252,
}

// "Total revenue and support" from each statement of activities. 2024 excludes
// the separate other income (loss) section, exactly as the statement presents it.
const TOTAL_REVENUE: Record<number, number> = {
  2022: 1_078_386,
  2023: 3_625_592,
  2024: 5_146_314,
}

// Functional expense split, in percent, straight from the audited statements.
const FUNCTIONAL_SPLIT: Record<number, YearSplit> = {
  2022: { program: 95.38, admin: 2.83, fund: 1.79 },
  2023: { program: 95.04, admin: 2.31, fund: 2.65 },
  2024: { program: 89.98, admin: 5.51, fund: 4.51 },
}

const PATIENTS: Record<number, number> = {
  2022: 31,
  2023: 83,
  2024: 273,
}

// "3.97M" / "542K" / "0" — uk writes the decimal separator as a comma.
function compactUsd(value: number): LocalizedText {
  if (value >= 1_000_000) {
    const millions = (value / 1_000_000).toFixed(2)

    return { en: `${millions}M`, uk: `${millions.replace('.', ',')}M` }
  }

  if (value >= 1_000) {
    const thousands = `${Math.round(value / 1_000)}K`

    return { en: thousands, uk: thousands }
  }

  return { en: String(value), uk: String(value) }
}

function withDollar(text: LocalizedText): LocalizedText {
  return { en: `$${text.en}`, uk: `$${text.uk}` }
}

function buildCats(year: number): CategoryDatum[] {
  const total = TOTAL_EXPENSES[year]

  return CATEGORY_USD[year].map(usd => ({
    pct: Math.round((usd / total) * 1000) / 10,
    amount: withDollar(compactUsd(usd)),
  }))
}

function buildYear(year: number): YearData {
  return {
    patients: PATIENTS[year],
    revenue: compactUsd(TOTAL_REVENUE[year]),
    expenses: compactUsd(TOTAL_EXPENSES[year]),
    split: FUNCTIONAL_SPLIT[year],
    reportPdf: REPORT_PDF[year],
    cats: buildCats(year),
  }
}

const EMPTY_CATS: CategoryDatum[] = Array.from({ length: CATEGORY_COUNT }, () => ({
  pct: 0,
  amount: { en: '—', uk: '—' },
}))

export const AUDIT_DATA: Record<number, YearData> = {
  2022: buildYear(2022),
  2023: buildYear(2023),
  2024: buildYear(2024),
  2025: {
    patients: null,
    revenue: null,
    expenses: null,
    split: null,
    reportPdf: null,
    pending: true,
    cats: EMPTY_CATS,
  },
}

export function getYearData(year: number): YearData {
  return AUDIT_DATA[year] ?? AUDIT_DATA[DEFAULT_YEAR]
}

// Percentages carry decimals here — rounding to whole numbers would print the
// smallest categories (e.g. 2024 charitable aid at 0.34%) as a flat "0%".
export function formatPct(value: number, locale: string, digits = 1): string {
  const text = value.toFixed(digits)

  return locale === 'uk' ? text.replace('.', ',') : text
}

export const CATEGORY_COLORS = [
  'var(--teal)',
  'var(--chart-amber)',
  'var(--chart-purple)',
  'var(--chart-blue)',
  'var(--chart-coral)',
  'var(--chart-green)',
  'var(--chart-sky)',
  'var(--chart-rose)',
  'var(--chart-grey)',
] as const

export const BAR_COLORS = {
  program: 'var(--teal)',
  admin: 'var(--chart-amber)',
  fund: 'var(--chart-purple)',
} as const

export const DONUT_R = 80
export const DONUT_CIRC = 2 * Math.PI * DONUT_R
