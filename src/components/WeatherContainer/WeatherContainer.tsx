import { Input, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { getCityInfo } from '../../store/reducers/app/appActionCreators'
import { getAppLocation } from '../../store/reducers/app/appSelectors'
import { getCityByGeo, weatherActions } from '../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../store/reducers/weather/weatherSelectors'
import { getCityLocationFromUrl } from '../../utils/url'
import CitiesSelect from './CitiesSelect'
import confirmLocation from './ConfirmLocation'
import InputCityName from './InputCityName'
import ModalLocation from './ModalLocation'
import { IsLocationCorrect } from './ModalLocation/ModalLocation'
import Weather from './Weather'

const WeatherContainer = () => {
  let { currentCity, possibleCities } = useSelector(getWeatherList)
  let location = useSelector(getAppLocation)
  const dispatch = useDispatch()
  const { cityPath } = useParams()
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [isAcceptedLocation, setIsAcceptedLocation] = useState(false)
  const [isLocationCorrect, setIsLocationCorrect] = useState<IsLocationCorrect>('default')
  const showAgain = localStorage.getItem('showAgain') as 'true' | 'false' | null
  const inputRef = React.useRef<Input>(null)
  const { t } = useTranslation()

  useEffect(() => {
    !cityPath && (showAgain === 'true' || !showAgain) && confirmLocation(setIsAcceptedLocation, inputRef)
  }, [])

  useEffect(() => {
    if (cityPath) {
      setIsLocationCorrect('default')
      const { lat, lon } = getCityLocationFromUrl(cityPath)
      dispatch(getCityByGeo(lat, lon, cityPath))
    }
  }, [cityPath, dispatch])

  useEffect(() => {
    if (isAcceptedLocation) {
      if (!navigator.geolocation) {
        message.warning(t('geolocation_unsupported'))
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
            setIsLocationCorrect('false')
          },
          () => {
            localStorage.setItem('showAgain', 'true')
            message.warning(t('geolocation_is_blocked'))
          }
        )
      }
    }
  }, [isAcceptedLocation, t])

  useEffect(() => {
    lat && lng && dispatch(getCityInfo(lat, lng, 'en'))
  }, [lat, lng, dispatch])

  useEffect(() => {
    location.address && !cityPath && dispatch(getCityByGeo(location.lat, location.lon, location.address.city))
  }, [location])

  return (
    <div className='container'>
      <InputCityName /* inputRef={inputRef} */ />
      {location.address && (
        <ModalLocation inputRef={inputRef} address={location.address} setIsLocationCorrect={setIsLocationCorrect} />
      )}
      {(isLocationCorrect === 'default' || isLocationCorrect === 'true') && <Weather city={currentCity} />}
      {possibleCities.length > 1 && <CitiesSelect />}
    </div>
  )
}

export default WeatherContainer
