import { useEffect, useState } from 'react'

const useInViewPort = arrayOfRefs => {
  const [inViewport, setInViewport] = useState({})
  const refsAreReady = arrayOfRefs.every(e => e !== null) && arrayOfRefs.every(e => !!e.current)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!inViewport.hasOwnProperty(entry.target.id) && inViewport[[entry.target.id]] !== true) {
          setInViewport({ [entry.target.id]: true })
        }
      }
    })

    if (refsAreReady) {
      arrayOfRefs.forEach(ref => {
        observer.observe(ref.current)
      })
      return () => {
        arrayOfRefs.forEach(ref => {
          observer.unobserve(ref.current)
        })
      }
    }
  }, [arrayOfRefs, refsAreReady, inViewport])
  return inViewport
}

export default useInViewPort
