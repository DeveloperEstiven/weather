import { ReloadOutlined } from '@ant-design/icons'
import { Button, Result, Row, Space } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components'
import './Error.scss'

const StyledError = styled(Result)`
  margin-top: 50px;
  div {
    color: white;
  }
`

const Error: FC<{ errorMessage: string }> = ({ errorMessage }) => {
  return (
    <StyledError
      status='error'
      title='Submission Failed'
      subTitle={errorMessage}
      extra={
        <Button type='primary' onClick={() => window.location.reload()}>
          <Row align='middle'>
            <Space>
              <ReloadOutlined />
              <span>Click to reload!</span>
            </Space>
          </Row>
        </Button>
      }
    />
  )
}

export default Error
