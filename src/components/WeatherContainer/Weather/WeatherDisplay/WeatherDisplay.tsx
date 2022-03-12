import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/pagination'
import { getWeatherList } from '../../../../store/reducers/weather/weatherSelectors'
import Charts from './Charts'
import FilterHourlyForecast from './FilterHourlyForecast'
import './WeatherDisplay.scss'
import WeatherHeader from './WeatherHeader'

const ChartWrapper = styled.div`
  padding: 24px 0;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundMain};
  //? Landscape tablets and medium desktops //! < 480px
  @media (max-width: 767px) {
    padding: 12px 0;
  }
`

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
