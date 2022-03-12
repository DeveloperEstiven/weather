import { SmileOutlined } from '@ant-design/icons'
import { Button, Input, notification, Space } from 'antd'
import { t } from 'i18next'
import React from 'react'

type Confirm = (flag: boolean) => void

const onCancel = (key: string, inputRef: any) => {
  notification.close(key)
  inputRef.current!.focus()
  localStorage.setItem('showAgain', 'false')
}

const onConfirm = (key: string, cb: Confirm) => {
  notification.close(key)
  localStorage.setItem('showAgain', 'false')
  cb(true)
}

export const confirmLocation = (confirmCb: Confirm, inputRef: React.RefObject<Input>) => {
  const key = `open${Date.now()}`

  const onClose = () => {
    notification.close(key)
    inputRef.current!.focus()
  }

  const btn = (
    <Space>
      <Button danger size='middle' onClick={() => onCancel(key, inputRef)}>
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
