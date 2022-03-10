import { HomeOutlined } from '@ant-design/icons'
import { Divider, Menu, Spin } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { t } from 'i18next'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { CityResponse } from '../../../api/WeatherResponseTypes'
import { weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { parseCityLocation } from '../../../utils/parse'
import { getGeoPath } from '../../../utils/url'
import './CitiesSelect.scss'

type CitiesSelectProps = {}
const CitiesSelect: FC<CitiesSelectProps> = ({}) => {
  const navigate = useNavigate()
  const { code } = useParams()
  const dispatch = useDispatch()
  const { possibleCities, currentCity, isFetching } = useSelector(getWeatherList)
  const [openKeys, setOpenKeys] = React.useState(['cities'])

  const selectCurrentCity = (city: CityResponse) => {
    dispatch(weatherActions.setCurrentCity(city))
    dispatch(weatherActions.setForecastDay(0))
    const cityPath = getGeoPath(city.country, city.name, city.lat, city.lon)
    navigate(`/${code}/${cityPath}`)
  }

  const toggleCollapsed = () => (openKeys.length ? setOpenKeys([]) : setOpenKeys(['cities']))

  return (
    <div>
      {/* <Spin spinning={isFetching} tip='Loading...'> */}
      <Menu mode='inline' onOpenChange={toggleCollapsed} openKeys={openKeys}>
        <SubMenu key='cities' icon={<HomeOutlined />} title={t('select_city')}>
          {possibleCities.map(city => (
            <Menu.Item
              key={`${city.lat}${city.lon}`}
              disabled={currentCity === city}
              onClick={() => selectCurrentCity(city)}>
              {parseCityLocation(city, code)}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      {/* </Spin> */}
      <Divider />
    </div>
  )
}

export default CitiesSelect
