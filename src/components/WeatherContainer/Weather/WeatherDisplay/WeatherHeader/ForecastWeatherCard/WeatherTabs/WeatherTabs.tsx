import { Tabs } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { toCurrentUnit } from '../../../../../../../utils/convertTemperature'
import Slider from '../../Slider'
import { TabName } from './WeatherTabs.styles'
import { TabNames, TabProps } from './WeatherTabs.types'

const { TabPane } = Tabs

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
