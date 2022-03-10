import { RefObject, useEffect, useRef } from 'react'

const useScroll = (parentRef: RefObject<Element>, childRef: RefObject<Element>, callback: () => void) => {
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 0,
    }

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log('intersected')
        callback()
      }
    }, options)

    if (childRef.current) {
      observer.current.observe(childRef.current)
    }

    return function () {
      if (childRef.current) {
        observer.current?.unobserve(childRef.current)
      }
    }
  }, [callback])
}

export default useScroll
