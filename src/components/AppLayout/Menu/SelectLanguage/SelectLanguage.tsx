import { DownOutlined } from '@ant-design/icons'
import { Select, Space } from 'antd'
import i18next from 'i18next'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from 'typescript-cookie'
import { getWeatherList } from '../../../../store/reducers/weather/weatherSelectors'
import { languages, SupportedLanguages } from '../../../../utils/languages'
import { getGeoPath } from '../../../../utils/url'
import './SelectLanguage.scss'

const { Option } = Select

const Arrow = styled.span`
  color: ${props => props.theme.colors.text};
`

export const getLanguageFromCookie = () => (getCookie('i18next') as SupportedLanguages) || 'en'

const SelectLanguage: FC = () => {
  const { currentCity } = useSelector(getWeatherList)
  const navigate = useNavigate()
  const { num } = useParams()
  const [currentLang, setCurrentLang] = useState<SupportedLanguages>('en')
  const [cityPath, setCityPath] = useState<string>('')

  const onLangSelect = (code: SupportedLanguages) => {
    i18next.changeLanguage(code)
    if (currentCity.country) {
      navigate(`/${code}/${cityPath || ''}/${num}`)
    } else {
      navigate(`/${code}`)
    }
    setCurrentLang(code)
  }

  useEffect(() => {
    const code = getLanguageFromCookie()
    if (currentCity.country) {
      setCityPath(getGeoPath(currentCity.country, currentCity.name, currentCity.lat, currentCity.lon))
    }
    setCurrentLang(code)
  }, [currentCity, cityPath])

  return (
    <Select
      style={{ width: '100%' }}
      value={currentLang}
      onChange={onLangSelect}
      suffixIcon={
        <Arrow>
          <DownOutlined />
        </Arrow>
      }>
      {languages.map(({ country_code, code, name }) => (
        <Option key={country_code} value={code}>
          <Space>
            <span className={`flag-icon flag-icon-${country_code}`} />
            {name}
          </Space>
        </Option>
      ))}
    </Select>
  )
}

export default SelectLanguage
