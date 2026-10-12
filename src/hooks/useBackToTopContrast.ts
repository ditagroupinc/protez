import { useEffect, useRef, useState } from 'react'

export default function useBackToTopContrast() {
  const ref = useRef<HTMLAnchorElement>(null)
  const [color, setColor] = useState('var(--white)')

  useEffect(() => {
    let frame = 0
    const update = () => {
      const bounds = ref.current?.getBoundingClientRect()

      if (!bounds?.width || !bounds.height) return
      const x = bounds.left + bounds.width / 2
      const y = bounds.top + bounds.height / 2
      const element = document
        .elementsFromPoint(x, y)
        .find(candidate => candidate.closest('main, footer') && !ref.current?.contains(candidate))

      if (!element) return
      const section = element.closest('section')
      const foreground = getComputedStyle(section ?? element).color.match(/[\d.]+/g)
      let light = foreground ? Number(foreground[0]) > 150 : false

      if (section?.id === 'inNeed') {
        light = Array.from(section.querySelectorAll('svg path')).some(path => {
          const shape = path as SVGPathElement
          const bounds = shape.getBoundingClientRect()
          const matrix = shape.getScreenCTM()

          return (
            bounds.width > 0 &&
            bounds.height > 0 &&
            matrix &&
            shape.isPointInFill(new DOMPoint(x, y).matrixTransform(matrix.inverse()))
          )
        })
      }

      setColor(light ? 'var(--white)' : 'var(--teal)')
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)

    observer.observe(document.body)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return { ref, color }
}
