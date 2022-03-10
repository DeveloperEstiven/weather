import { Tabs } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DailyTime, DailyWeather } from '../../../../../../../api/WeatherResponseTypes'
import { toCurrentUnit, UnitTemp } from '../../../../../../../utils/convertTemperature'
import Slider from '../../Slider'
import styled from 'styled-components'

const { TabPane } = Tabs

type TabProps = {
  weather: DailyWeather
  timezone: string
  unit: UnitTemp
  isCelsius: boolean
}

type TabNames = {
  name: string
  key: keyof DailyTime
}[]

const TabName = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text};
`

const tabNames: TabNames = [
  { name: 'morning', key: 'morn' },
  { name: 'day', key: 'day' },
  { name: 'evening', key: 'eve' },
  { name: 'night', key: 'night' },
]

const WeatherTabs: FC<TabProps> = ({ weather, timezone, unit, isCelsius }) => {
  const { t } = useTranslation()

  return (
    <Tabs type='line' defaultActiveKey='2' centered>
      {tabNames.map((tab, i) => (
        <TabPane tab={<TabName>{t(tab.name)}</TabName>} key={(i + 1).toString()}>
          <Slider
            sunrise={weather.sunrise}
            sunset={weather.sunset}
            temperature={toCurrentUnit(weather.temp[tab.key], isCelsius)}
            timezone={timezone}
            feels_like={toCurrentUnit(weather.feels_like[tab.key], isCelsius)}
            unit={unit}
            weather={weather.weather}
          />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default WeatherTabs
