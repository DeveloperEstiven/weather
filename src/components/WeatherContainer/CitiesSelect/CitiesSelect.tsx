import { HomeOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { CityResponse } from '../../../api/WeatherAPI/WeatherAPI.types'
import { weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { parseCityLocation } from '../../../utils/parse'
import { getGeoPath } from '../../../utils/url'
import { SelectCityContainer, SelectCityTitle, StyledDivider, StyledUl } from './CitiesSelect.styles'

const CitiesSelect: FC = () => {
  const navigate = useNavigate()
  const { code } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { possibleCities } = useSelector(getWeatherList)

  const selectCurrentCity = (city: CityResponse) => {
    dispatch(weatherActions.setCurrentCity(city))
    dispatch(weatherActions.setForecastDay(0))
    const cityPath = getGeoPath(city.country, city.name, city.lat, city.lon)
    navigate(`/${code}/${cityPath}/day=0`)
  }

  return (
    <SelectCityContainer>
      <SelectCityTitle>
        <HomeOutlined /> <p>{t('select_city')}:</p>
      </SelectCityTitle>

      <StyledDivider />

      <StyledUl>
        {possibleCities.map(city => (
          <li key={`${city.lat}${city.lon}`} onClick={() => selectCurrentCity(city)}>
            {parseCityLocation(city, code)}
          </li>
        ))}
      </StyledUl>
    </SelectCityContainer>
  )
}

export default CitiesSelect
