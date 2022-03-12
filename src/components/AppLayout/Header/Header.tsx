import { Button, Space, Typography } from 'antd'
import React, { FC, RefObject } from 'react'
import styled from 'styled-components'
import { PandaIcon } from '../../UI/icons/icons'
import './Header.scss'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'

const StyledText = styled(Typography.Text)`
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  letter-spacing: 0.1em;
`

const CenteredSpace = styled(Space)`
  div {
    display: flex;
    align-items: center;
  }
`
const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  height: 50px;
  line-height: 1;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  &.calc {
    background-color: ${props => props.theme.colors.backgroundPrimary};
    width: calc(100% - 17px);
  }
`

const HeaderInner = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const IconWrapper = styled.div`
  color: ${props => props.theme.colors.backgroundPrimary};
  border-color: ${props => props.theme.colors.backgroundSecondary} !important;
`

type HeaderProps = {
  setVisible: (flag: boolean) => void
  headerRef: RefObject<HTMLElement>
}

const Header: FC<HeaderProps> = ({ setVisible, headerRef }) => {
  const { t } = useTranslation()
  const { hasWeather, hasForecast } = useSelector(getWeatherList)

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

  const calc = localStorage.getItem('headerCalc') || ''

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
