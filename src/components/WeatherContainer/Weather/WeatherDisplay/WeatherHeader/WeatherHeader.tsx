import React, { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import { UnitTemp } from '../../../../../utils/convertTemperature'
import CurrentWeatherCard from './CurrentWeatherCard'
import ForecastWeatherCard from './ForecastWeatherCard'
import { WeatherHeaderProps } from './WeatherHeader.types'

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
