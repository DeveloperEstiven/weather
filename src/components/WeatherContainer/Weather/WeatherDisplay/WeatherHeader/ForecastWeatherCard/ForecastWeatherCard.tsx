import React, { FC } from 'react'
import { DailyWeather } from '../../../../../../api/WeatherResponseTypes'
import { UnitTemp } from '../../../../../../utils/convertTemperature'
import DetailInfo from '../DetailInfo'
import Header from '../Header'
import { WeatherCards } from '../WeatherHeader'
import './ForecastWeatherCard.scss'
import WeatherTabs from './WeatherTabs'

type ForecastWeatherCardProps = {
  forecastWeather: DailyWeather
  timezone: string
  isCelsius: boolean
  unit: UnitTemp
}

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
