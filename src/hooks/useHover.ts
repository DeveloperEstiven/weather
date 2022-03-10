import { RefObject, useEffect, useState } from 'react'

type refT = RefObject<HTMLElement>

const useHover = (ref: refT) => {
  const [isHovering, setIsHovering] = useState(false)

  const on = () => setIsHovering(true)
  const off = () => setIsHovering(false)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    node.addEventListener('mouseenter', on)
    node.addEventListener('mousemove', on)
    node.addEventListener('mouseleave', off)
    return () => {
      node.removeEventListener('mouseenter', on)
      node.removeEventListener('mousemove', on)
      node.removeEventListener('mouseleave', off)
    }
  }, [])

  return isHovering
}

export default useHover
