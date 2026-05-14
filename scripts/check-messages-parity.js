/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const a = require('../messages/uk.json')
const b = require('../messages/en.json')

let mismatches = 0

const diff = (x, y, p = '') => {
  const keys = new Set([...Object.keys(x || {}), ...Object.keys(y || {})])

  for (const k of keys) {
    const path = p + '.' + k
    const xv = x?.[k]
    const yv = y?.[k]
    const xIsObj = typeof xv === 'object' && xv !== null && !Array.isArray(xv)
    const yIsObj = typeof yv === 'object' && yv !== null && !Array.isArray(yv)

    if (xIsObj && yIsObj) {
      diff(xv, yv, path)
    } else if (k in (x || {}) !== k in (y || {})) {
      mismatches++
      console.log('MISMATCH:', path)
    }
  }
}

diff(a, b)

if (mismatches === 0) {
  console.log('OK: messages/uk.json and messages/en.json keys are in parity.')
  process.exit(0)
} else {
  console.error(`FAIL: ${mismatches} mismatch(es) found.`)
  process.exit(1)
}
