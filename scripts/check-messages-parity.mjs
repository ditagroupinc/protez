/* eslint-disable no-console */
import process from 'node:process'
import a from '../messages/academy.uk.json' with { type: 'json' }
import b from '../messages/academy.en.json' with { type: 'json' }

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
  console.log('OK: messages/academy.uk.json and messages/academy.en.json keys are in parity.')
  process.exit(0)
} else {
  console.error(`FAIL: ${mismatches} mismatch(es) found.`)
  process.exit(1)
}
