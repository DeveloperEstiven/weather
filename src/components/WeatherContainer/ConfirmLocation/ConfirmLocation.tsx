import { SmileOutlined } from '@ant-design/icons'
import { Button, notification, Space } from 'antd'
import { t } from 'i18next'
import React from 'react'

type Confirm = (flag: boolean) => void

const onCancel = (key: string) => {
  notification.close(key)
  localStorage.setItem('showAgain', 'false')
}

const onConfirm = (key: string, cb: Confirm) => {
  notification.close(key)
  localStorage.setItem('showAgain', 'false')
  cb(true)
}

export const confirmLocation = (confirmCb: Confirm) => {
  const key = `open${Date.now()}`

  const onClose = () => {
    notification.close(key)
  }

  const btn = (
    <Space>
      <Button type='primary' size='middle' onClick={() => onCancel(key)}>
        {t('dont_show')}
      </Button>
      <Button type='primary' size='middle' onClick={() => onConfirm(key, confirmCb)}>
        {t('yes')}
      </Button>
    </Space>
  )

  notification.open({
    message: t('confirm_location_message'),
    description: t('confirm_location_description'),
    btn,
    key,
    duration: 0,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    onClose: onClose,
  })
}

export default confirmLocation
