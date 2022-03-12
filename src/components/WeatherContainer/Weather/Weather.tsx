import { Divider } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getWeather } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { getGeoPath } from '../../../utils/url'
import { getLanguageFromCookie } from '../../AppLayout/Menu/SelectLanguage/SelectLanguage'
import CityName from './CityName'
import Forecast from './Forecast'
import { WeatherProps } from './Weather.types'
import WeatherDisplay from './WeatherDisplay'

const Weather: FC<WeatherProps> = ({ city }) => {
  let { weather, isFetching, hasWeather, hasForecast } = useSelector(getWeatherList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const code = getLanguageFromCookie()
  const { num } = useParams()

  useEffect(() => {
    const { lat, lon } = city
    dispatch(getWeather(lat, lon, code))
    if (city.country) {
      const { country, name, lat, lon } = city
      const cityPath = getGeoPath(country, name, lat, lon)
      const code = getLanguageFromCookie()
      const dayNum = num ? num : 'day=0'
      navigate(`/${code}/${cityPath || ''}/${dayNum}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, code, city])

  return (
    <>
      {!isFetching && (hasWeather || hasForecast) && (
        <>
          {<CityName city={city} />}
          {<Forecast weather={weather.daily} timezone={weather.timezone} />}
          <WeatherDisplay />
          <Divider />
        </>
      )}
    </>
  )
}

export default Weather
