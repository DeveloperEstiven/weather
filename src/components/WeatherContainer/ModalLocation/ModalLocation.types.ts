import { Address } from '../../../api/geocoderAPI/geocoderAPI.types'

export type IsLocationCorrect = 'true' | 'false' | 'default'

export type ModalLocationProps = {
  address: Address
  setIsLocationCorrect: (flag: IsLocationCorrect) => void
}
