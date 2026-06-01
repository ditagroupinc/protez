export const extractNumber = (value: string): number => {
  const match = value.match(/[\d\s,]+/)

  if (match) {
    return parseInt(match[0].replace(/[\s,]/g, ''), 10)
  }

  return 0
}

export const extractPrefixSuffix = (value: string) => {
  const prefix = value.match(/^[^\d]+/)?.[0] || ''
  const suffix = value.match(/[^\d]+$/)?.[0] || ''

  return { prefix, suffix }
}
