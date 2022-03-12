import 'moment-timezone'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import ChartForecast from './ChartForecast'
import { StyledDiv } from './Charts.styles'
import { ChartsProps } from './Charts.types'
import HourlyChart from './HourlyChart'

const Charts: FC<ChartsProps> = ({ weather }) => {
  const { units, hasForecast } = useSelector(getWeatherList)
  const [isCelsius, setIsCelsius] = useState(true)

  useEffect(() => {
    if (units === 'celsius') setIsCelsius(true)
    else setIsCelsius(false)
  }, [units])

  return (
    <StyledDiv>
      {hasForecast && <ChartForecast weatherDaily={weather.daily} isCelsius={isCelsius} />}
      {!hasForecast && <HourlyChart weatherHourly={weather.hourly} isCelsius={isCelsius} timezone={weather.timezone} />}
    </StyledDiv>
  )
}

export default Charts
