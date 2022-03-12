import 'moment-timezone'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { WeatherResponse } from '../../../../../api/WeatherResponseTypes'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import ChartForecast from './ChartForecast'
import './Charts.scss'
import HourlyChart from './HourlyChart'

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
