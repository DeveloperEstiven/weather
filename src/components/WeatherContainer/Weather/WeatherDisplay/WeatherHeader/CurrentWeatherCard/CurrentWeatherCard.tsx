import React, { FC } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { toCurrentUnit } from '../../../../../../utils/convertTemperature'
import DetailInfo from '../DetailInfo'
import Header from '../Header'
import Slider from '../Slider'
import { WeatherCards } from '../WeatherHeader.styles'
import { CurrentWeatherCardProps } from './CurrentWeatherCard.types'

const CurrentWeatherCard: FC<CurrentWeatherCardProps> = ({ currentWeather, timezone, isCelsius, unit }) => {
  return (
    <WeatherCards>
      <Header dt={currentWeather.dt} timezone={timezone} />

      <Slider
        sunrise={currentWeather.sunrise}
        sunset={currentWeather.sunset}
        temperature={toCurrentUnit(currentWeather.temp, isCelsius)}
        timezone={timezone}
        feels_like={toCurrentUnit(currentWeather.feels_like, isCelsius)}
        unit={unit}
        weather={currentWeather.weather}
      />

      <DetailInfo weather={currentWeather} unit={unit} />
    </WeatherCards>
  )
}

export default CurrentWeatherCard
