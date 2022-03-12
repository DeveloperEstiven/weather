import { ResponsiveLine } from '@nivo/line'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components'
import { DailyWeather } from '../../../../../../api/WeatherResponseTypes'
import { getWeatherList } from '../../../../../../store/reducers/weather/weatherSelectors'
import { getChartDailyData } from '../../../../../../utils/chartData/dailyChart'
import { DataChart } from '../../../../../../utils/chartData/types'
import { UnitType } from '../../FilterHourlyForecast/FilterHourlyForecast'
import { commonProperties } from '../commonOptions'
import './ChartForecast.scss'

type ChartForecastProps = {
  weatherDaily: DailyWeather[]
  isCelsius: boolean
}
const ChartForecast: FC<ChartForecastProps> = ({ weatherDaily, isCelsius }) => {
  const { forecastNum } = useSelector(getWeatherList)
  const theme = useTheme()
  const data: DataChart = useMemo(() => {
    return getChartDailyData(weatherDaily[forecastNum], isCelsius)
  }, [weatherDaily, forecastNum, isCelsius])
  const unitChar: UnitType = isCelsius ? '°C' : '°F'

  return (
    <ResponsiveLine
      {...commonProperties(data, unitChar, theme, 45)}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
    />
  )
}

export default ChartForecast
