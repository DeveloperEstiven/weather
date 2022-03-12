import React from 'react'
import { useSelector } from 'react-redux'
import { getWeatherList } from '../../../../store/reducers/weather/weatherSelectors'
import Charts from './Charts'
import FilterHourlyForecast from './FilterHourlyForecast'
import { ChartWrapper } from './WeatherDisplay.styles'
import WeatherHeader from './WeatherHeader'

const WeatherDisplay = () => {
  const { weather, hasWeather, hasForecast } = useSelector(getWeatherList)
  return (
    <>
      <WeatherHeader weather={weather} />
      <ChartWrapper>
        {hasWeather && <FilterHourlyForecast />}
        {(hasWeather || hasForecast) && <Charts weather={weather} />}
      </ChartWrapper>
    </>
  )
}

export default WeatherDisplay
