import { HomeOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { CityResponse } from '../../../api/WeatherResponseTypes'
import { weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { parseCityLocation } from '../../../utils/parse'
import { getGeoPath } from '../../../utils/url'
import { SelectCityContainer, SelectCityTitle, StyledDivider, StyledUl } from './CitiesSelect.styles'

const CitiesSelect: FC = () => {
  const navigate = useNavigate()
  const { code } = useParams()
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
        <HomeOutlined /> <p>Select city:</p>
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
