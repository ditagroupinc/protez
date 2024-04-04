import style from './customCursor.module.css'
import { useRef, useState, useEffect, useContext } from 'react'
import { ScreenModeAndSizeContext } from '@/contexts/ScreenModeAndSizeContext'

export default function CustomCursor({ id }) {
  const { height, width } = useContext(ScreenModeAndSizeContext)
  const cursorDotOutline = useRef()
  const cursorDot = useRef()
  const requestRef = useRef()
  const previousTimeRef = useRef()
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  //   const [width, setWidth] = useState(window.innerWidth);
  //   const [height, setHeight] = useState(window.innerHeight);
  let cursorVisible = useState(true)
  let cursorEnlarged = useState(false)

  /**
   * Mouse Moves
   */
  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event
    setMousePosition({ x, y })
    positionDot(event)
  }
  const onMouseEnter = () => {
    cursorVisible.current = true
    toggleCursorVisibility()
  }
  const onMouseLeave = () => {
    cursorVisible.current = false
    toggleCursorVisibility()
  }
  const onMouseDown = () => {
    cursorEnlarged.current = true
    // toggleCursorSize();
  }
  const onMouseUp = () => {
    cursorEnlarged.current = false
    // toggleCursorSize();
  }
  //   const onResize = (event) => {
  //     setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //   };

  /**
   * Hooks
   */
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    // window.addEventListener("resize", onResize);
    // requestRef.current = requestAnimationFrame(animateDotOutline);

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      //   window.removeEventListener("resize", onResize);
      //   cancelAnimationFrame(requestRef.current);
    }
  }, [])

  let { x, y } = mousePosition
  const winDimensions = { width, height }
  let endX = winDimensions.width / 2
  let endY = winDimensions.height / 2

  /**
   * Position Dot (cursor)
   * @param {event}
   */
  function positionDot(e) {
    cursorVisible.current = true
    toggleCursorVisibility()
    // Position the dot
    endX = e.pageX
    endY = e.pageY
    cursorDot.current.style.top = endY + 'px'
    cursorDot.current.style.left = endX + 'px'
  }

  /**
   * Toggle Cursor Visiblity
   */
  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = 1
      //   cursorDotOutline.current.style.opacity = 1;
    } else {
      cursorDot.current.style.opacity = 0
      //   cursorDotOutline.current.style.opacity = 0;
    }
  }

  return <div ref={cursorDot} id={style.cursor} />
}
