import { Button, Modal } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalLocationProps } from './ModalLocation.types'

const ModalLocation: FC<ModalLocationProps> = ({ address, setIsLocationCorrect }) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const { t } = useTranslation()

  const { country, city, state } = address
  const handleOk = () => {
    setIsModalVisible(false)
    setIsLocationCorrect('true')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
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
