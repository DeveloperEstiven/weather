import { Input } from 'antd'
import { Address } from '../../../api/geocoderAPI'

export type IsLocationCorrect = 'true' | 'false' | 'default'

export type ModalLocationProps = {
  address: Address
  setIsLocationCorrect: (flag: IsLocationCorrect) => void
  inputRef: React.RefObject<Input>
}
