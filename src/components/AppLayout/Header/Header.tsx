import { MenuFoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { PandaIcon } from '../../UI/icons/icons'
import { CenteredSpace, HeaderInner, IconWrapper, StyledHeader, StyledText } from './Header.styles'
import { HeaderProps } from './Header.types'

const Header: FC<HeaderProps> = ({ setVisible, headerRef }) => {
  const { t } = useTranslation()
  const { hasWeather, hasForecast } = useSelector(getWeatherList)
  const calc = localStorage.getItem('headerCalc') || ''

  const showDrawer = () => {
    setVisible(true)
    localStorage.setItem('headerCalc', 'calc')
    const header = headerRef.current
    if (header) {
      const currentCn = header!.className
      if (hasWeather || hasForecast) {
        header!.className = `${currentCn} calc`
      }
    }
  }

  return (
    <StyledHeader ref={headerRef} className={calc}>
      <div className='container'>
        <HeaderInner>
          <CenteredSpace>
            <PandaIcon style={{ fontSize: 32 }} />
          </CenteredSpace>
          <StyledText ellipsis>{t('header_title')}</StyledText>
          <Button onClick={showDrawer}>
            <IconWrapper>
              <MenuFoldOutlined />
            </IconWrapper>
          </Button>
        </HeaderInner>
      </div>
    </StyledHeader>
  )
}

export default Header
