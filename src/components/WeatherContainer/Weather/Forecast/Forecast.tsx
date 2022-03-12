import { RightOutlined } from '@ant-design/icons'
import { Collapse, List } from 'antd'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { weatherActions } from '../../../../store/reducers/weather/weatherActionCreators'
import { Arrow, ForecastTitle, StyledCollapse } from './Forecast.styles'
import { ForecastProps } from './Forecast.types'
import ForecastCard from './ForecastCard'

const Forecast: FC<ForecastProps> = ({ weather, timezone }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { num } = useParams()

  useEffect(() => {
    const dayNum = num ? parseInt(num[num.length - 1]) : 0
    if (dayNum !== 0) {
      dispatch(weatherActions.forecastReceived(weather[dayNum], dayNum))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, weather]) //! dispatch, num, weather

  return (
    <div>
      <StyledCollapse
        bordered={false}
        defaultActiveKey={['1']}
        className='site-collapse-custom-collapse'
        expandIcon={({ isActive }) => (
          <Arrow>
            <RightOutlined rotate={isActive ? 90 : 0} />
          </Arrow>
        )}>
        <Collapse.Panel header={<ForecastTitle>{t('forecast')}</ForecastTitle>} key='1'>
          <List
            grid={{ gutter: 20, xs: 2, sm: 3, md: 4, lg: 8, xl: 8, xxl: 3 }}
            dataSource={weather}
            renderItem={(day, num) => (
              <List.Item>
                <ForecastCard weather={day} cardNum={num} timezone={timezone} />
              </List.Item>
            )}
          />
        </Collapse.Panel>
      </StyledCollapse>
    </div>
  )
}

export default Forecast
