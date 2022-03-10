import { ResponsiveLine } from '@nivo/line'
import { t } from 'i18next'
import 'moment-timezone'
import moment from 'moment-timezone'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components'
import { WeatherResponse } from '../../../../../api/WeatherResponseTypes'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import { getChartDailyData } from '../../../../../utils/chartData/dailyChart'
import { getChartHourlyData, toArray } from '../../../../../utils/chartData/hourlyChart'
import { DataChart } from '../../../../../utils/chartData/types'
import { UnitType } from '../FilterHourlyForecast/FilterHourlyForecast'
import { filterUnitSymbols } from '../FilterHourlyForecast/FilterHourlyForecast.types'
import './Charts.scss'
import { commonProperties } from './commonOptions'

type ChartsProps = {
  weather: WeatherResponse
}

const StyledDiv = styled.div`
  height: 400px;
  border-radius: ${props => props.theme.borderRadius};
  width: 100%;
  position: relative;
  overflow: hidden;
  fill: ${props => props.theme.colors.text} !important;
`

const Charts: FC<ChartsProps> = ({ weather }) => {
  const { units, forecastNum, hasForecast, selectedFilter } = useSelector(getWeatherList)
  const [isCelsius, setIsCelsius] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    if (units === 'celsius') setIsCelsius(true)
    else setIsCelsius(false)
  }, [units])

  let data: DataChart
  let unitChar: UnitType = isCelsius ? '°C' : '°F'
  if (hasForecast) {
    data = getChartDailyData(weather.daily[forecastNum], isCelsius)
  } else {
    const { hourly, timezone } = weather
    if (selectedFilter === 'temp') {
      const temp = getChartHourlyData(hourly, timezone, 'temp', isCelsius)
      const feels = getChartHourlyData(hourly, timezone, 'feels_like', isCelsius)
      data = toArray(temp, feels)
    } else {
      unitChar = t(filterUnitSymbols[selectedFilter])
      data = toArray(getChartHourlyData(hourly, timezone, selectedFilter))
    }
  }

  return (
    <StyledDiv>
      {hasForecast && (
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
      )}

      {!hasForecast && (
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
      )}
    </StyledDiv>
  )
}

export default Charts
