import { HomeOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Row, Space } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { StyledError } from './Error.styles'

const Error: FC<{ errorMessage: string }> = ({ errorMessage }) => {
  const navigate = useNavigate()
  const { code } = useParams()
  const dispatch = useDispatch()

  const onHomeClick = () => {
    navigate(`/${code}`)
    dispatch(weatherActions.errorOccurred(''))
  }

  return (
    <StyledError
      status='error'
      title='Submission Failed'
      subTitle={errorMessage}
      extra={[
        <Button type='primary' onClick={() => window.location.reload()}>
          <Row align='middle'>
            <Space>
              <ReloadOutlined />
              <span>Click to reload!</span>
            </Space>
          </Row>
        </Button>,
        <Button type='ghost' onClick={onHomeClick}>
          <Row align='middle'>
            <Space>
              <HomeOutlined />
              <span>Home Page</span>
            </Space>
          </Row>
        </Button>,
      ]}
    />
  )
}

export default Error
