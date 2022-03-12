import { ResponsiveLine } from '@nivo/line'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components'
import { getWeatherList } from '../../../../../../store/reducers/weather/weatherSelectors'
import { getChartHourlyData, toArray } from '../../../../../../utils/chartData/hourlyChart'
import { DataChart } from '../../../../../../utils/chartData/types'
import { UnitType } from '../../FilterHourlyForecast/FilterHourlyForecast'
import { filterUnitSymbols } from '../../FilterHourlyForecast/FilterHourlyForecast.types'
import { commonProperties } from '../commonOptions'
import { HourlyChartProps } from './HourlyChart.types'

const HourlyChart: FC<HourlyChartProps> = ({ weatherHourly, isCelsius, timezone }) => {
  const { selectedFilter } = useSelector(getWeatherList)
  const { t } = useTranslation()
  const theme = useTheme()
  let unitChar: UnitType = isCelsius ? '°C' : '°F'

  let data: DataChart
  if (selectedFilter === 'temp') {
    const temp = getChartHourlyData(weatherHourly, timezone, 'temp', isCelsius)
    const feels = getChartHourlyData(weatherHourly, timezone, 'feels_like', isCelsius)
    data = toArray(feels, temp)
  } else {
    unitChar = t(filterUnitSymbols[selectedFilter])
    data = toArray(getChartHourlyData(weatherHourly, timezone, selectedFilter))
  }

  return (
    <ResponsiveLine
      {...commonProperties(data, unitChar, theme, 70)}
      margin={{ top: 50, right: 60, bottom: 70, left: 60 }}
      xFormat='time:%Hh'
      xScale={{ format: '%d %H:%M', type: 'time', useUTC: false }}
      axisBottom={{
        format: '%H:%M',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
      }}
    />
  )
}

export default HourlyChart
