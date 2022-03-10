import { Button, Input, Modal } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Address } from '../../../api/geocoderAPI'
import './ModalLocation.scss'

export type IsLocationCorrect = 'true' | 'false' | 'default'
type ModalLocationProps = {
  address: Address
  setIsLocationCorrect: (flag: IsLocationCorrect) => void
  inputRef: React.RefObject<Input>
}

const ModalLocation: FC<ModalLocationProps> = ({ address, setIsLocationCorrect, inputRef }) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const { t } = useTranslation()

  const { country, city, state } = address
  const handleOk = () => {
    setIsModalVisible(false)
    setIsLocationCorrect('true')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    inputRef.current!.focus()
    setIsLocationCorrect('false')
  }

  return (
    <Modal
      title={t('modal_title')}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='no' onClick={handleCancel}>
          {t('no')}
        </Button>,
        <Button key='yes' type='primary' onClick={handleOk}>
          {t('yes')}
        </Button>,
      ]}>
      <p>{t('modal_text')}</p>
      <p>
        {country}, {state}, {city}
      </p>
    </Modal>
  )
}

export default ModalLocation
