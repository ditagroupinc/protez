import { useEffect, useState } from 'react'

// Replays the two-rAF "draw-in" trick from the design mockup: whenever `year`
// changes, collapse the animated shapes (drawn=false), then flip to drawn on the
// second animation frame so the CSS transition runs cleanly from 0 → target.
export function useDrawIn(year: number): boolean {
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    setDrawn(false)

    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setDrawn(true))
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [year])

  return drawn
}
