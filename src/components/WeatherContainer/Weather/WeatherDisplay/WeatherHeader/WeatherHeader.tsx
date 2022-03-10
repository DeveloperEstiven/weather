import React, { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { WeatherResponse } from '../../../../../api/WeatherResponseTypes'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import { UnitTemp } from '../../../../../utils/convertTemperature'
import CurrentWeatherCard from './CurrentWeatherCard'
import ForecastWeatherCard from './ForecastWeatherCard'
import './WeatherHeader.scss'

type WeatherHeaderProps = {
  weather: WeatherResponse
}

export const WeatherCards = styled.div`
  background: ${props => props.theme.colors.backgroundMain};
  color: #333;
  border-radius: ${props => props.theme.borderRadius};
  padding: 24px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.text};

  svg {
    fill: ${props => props.theme.colors.text};
  }

  @media (max-width: 767px) {
    padding: 24px 12px 12px;
  }
`

const WeatherHeader: FC<WeatherHeaderProps> = memo(({ weather }) => {
  const { hasForecast, hasWeather, forecast } = useSelector(getWeatherList)
  const { units } = useSelector(getWeatherList)
  const [unit, setUnit] = useState<UnitTemp>('°C')
  const [isCelsius, setIsCelsius] = useState(true)

  useEffect(() => {
    if (units === 'celsius') {
      setIsCelsius(true)
      setUnit('°C')
    } else {
      setIsCelsius(false)
      setUnit('°F')
    }
  }, [units])

  const commonProps = {
    timezone: weather.timezone,
    isCelsius,
    unit,
  }

  return (
    <>
      {hasWeather && <CurrentWeatherCard currentWeather={weather.current} {...commonProps} />}
      {hasForecast && !hasWeather && <ForecastWeatherCard forecastWeather={forecast} {...commonProps} />}
    </>
  )
})

export default WeatherHeader
