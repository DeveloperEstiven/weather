import React, { FC } from 'react'
import DetailInfo from '../DetailInfo'
import Header from '../Header'
import { WeatherCards } from '../WeatherHeader.styles'
import './ForecastWeatherCard.scss'
import { ForecastWeatherCardProps } from './ForecastWeatherCard.types'
import WeatherTabs from './WeatherTabs'

const ForecastWeatherCard: FC<ForecastWeatherCardProps> = ({ forecastWeather, timezone, isCelsius, unit }) => {
  return (
    <WeatherCards>
      <Header dt={forecastWeather.dt} timezone={timezone} />
      <WeatherTabs weather={forecastWeather} timezone={timezone} unit={unit} isCelsius={isCelsius} />
      <DetailInfo weather={forecastWeather} unit={unit} />
    </WeatherCards>
  )
}

export default ForecastWeatherCard
