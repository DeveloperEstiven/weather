import { BackTop, Divider, Spin } from 'antd'
import React, { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { CityResponse } from '../../../api/WeatherResponseTypes'
import { getWeather } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { getGeoPath } from '../../../utils/url'
import { getLanguageFromCookie } from '../../AppLayout/Menu/SelectLanguage/SelectLanguage'
import Error from '../../UI/Error'
import styled from 'styled-components'
import CitiesSelect from '../CitiesSelect'
import CityName from './CityName'
import Forecast from './Forecast'
import './Weather.scss'
import WeatherDisplay from './WeatherDisplay'

const StyledDiv = styled.div`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14px;
`

type WeatherProps = {
  city: CityResponse
}

const Weather: FC<WeatherProps> = memo(({ city }) => {
  let { error, weather, isFetching, possibleCities, hasWeather, hasForecast } = useSelector(getWeatherList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const code = getLanguageFromCookie()

  useEffect(() => {
    const { lat, lon } = city
    dispatch(getWeather(lat, lon, code))
    if (city.country) {
      const { country, name, lat, lon } = city
      const cityPath = getGeoPath(country, name, lat, lon)
      const code = getLanguageFromCookie()
      navigate(`/${code}/${cityPath || ''}`)
    }
  }, [dispatch, code, city])

  if (error) return <Error errorMessage={error} />
  return (
    <>
      {!isFetching && (
        <>
          {(hasWeather || hasForecast) && <CityName city={city} />}
          {(hasWeather || hasForecast) && <Forecast weather={weather.daily} timezone={weather.timezone} />}
          <WeatherDisplay />
          <Divider />
        </>
      )}
    </>
  )
})

export default Weather
