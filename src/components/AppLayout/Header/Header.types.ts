import { RefObject } from 'react'

export type HeaderProps = {
  setVisible: (flag: boolean) => void
  headerRef: RefObject<HTMLElement>
}
