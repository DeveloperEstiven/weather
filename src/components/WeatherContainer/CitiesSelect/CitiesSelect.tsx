import { HomeOutlined } from '@ant-design/icons'
import { Divider, Menu, Spin } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { t } from 'i18next'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'
import { CityResponse } from '../../../api/WeatherResponseTypes'
import { weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { parseCityLocation } from '../../../utils/parse'
import { getGeoPath } from '../../../utils/url'
import './CitiesSelect.scss'

const SelectCityContainer = styled.div`
  margin-top: 20px;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  padding: 20px;
`

const StyledUl = styled.ul`
  margin-bottom: 0;
  li {
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 5px;
    cursor: pointer;
    margin-left: 18px;
    transition: background-color 0.3s ease 0s;
    &:first-child {
      margin-top: 0;
    }
    &:hover {
      background-color: ${props => props.theme.colors.backgroundSecondary};
    }
  }
`
const StyledDivider = styled(Divider)`
  height: 2px;
  background-color: #fff;
  margin: 20px 0;
`
const SelectCityTitle = styled.h2`
  margin-bottom: 0;
  color: inherit;
  font-size: 16px;
  display: flex;
  position: relative;
  p {
    margin-left: 20px;
    margin-bottom: 0;
  }
`

type CitiesSelectProps = {}
const CitiesSelect: FC<CitiesSelectProps> = ({}) => {
  const navigate = useNavigate()
  const { code, num } = useParams()
  const dispatch = useDispatch()
  const { possibleCities, currentCity, isFetching } = useSelector(getWeatherList)
  const [openKeys, setOpenKeys] = React.useState(['cities'])

  const selectCurrentCity = (city: CityResponse) => {
    dispatch(weatherActions.setCurrentCity(city))
    dispatch(weatherActions.setForecastDay(0))
    const cityPath = getGeoPath(city.country, city.name, city.lat, city.lon)

    navigate(`/${code}/${cityPath}/day=0`)
  }

  const toggleCollapsed = () => (openKeys.length ? setOpenKeys([]) : setOpenKeys(['cities']))

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
