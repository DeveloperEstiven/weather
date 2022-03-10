import { Collapse, List } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components'
import { DailyWeather } from '../../../../api/WeatherResponseTypes'
import './Forecast.scss'
import { useTranslation } from 'react-i18next'
import ForecastCard from './ForecastCard'
import { RightOutlined } from '@ant-design/icons'

type ForecastProps = {
  weather: DailyWeather[]
  timezone: string
}

const StyledCollapse = styled(Collapse)`
  background-color: ${props => props.theme.colors.backgroundMain};
  margin-bottom: 24px;
  .ant-collapse-content-box {
    padding: 24px 24px 8px 24px !important;
    //? Landscape tablets and medium desktops //! < 480px
    @media (max-width: 767px) {
      padding: 12px 12px 0 12px !important;
    }
  }
  .ant-collapse-item {
    border-bottom: 0;
  }
`
const ForecastTitle = styled.span`
  user-select: none;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  .anticon .anticon-right .ant-collapse-arrow {
    color: ${props => props.theme.colors.text};
    fill: ${props => props.theme.colors.text} !important;
  }
`

const Arrow = styled.span`
  color: ${props => props.theme.colors.text};
`

const Forecast: FC<ForecastProps> = ({ weather, timezone }) => {
  const { t } = useTranslation()
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
                <ForecastCard weather={day} num={num} timezone={timezone} />
              </List.Item>
            )}
          />
        </Collapse.Panel>
      </StyledCollapse>
    </div>
  )
}

export default Forecast