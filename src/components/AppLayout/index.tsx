import { MenuFoldOutlined } from '@ant-design/icons'
import { Affix, Button, Layout, Row, Space, Spin, Typography } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { getAppTheme } from '../../store/reducers/app/appSelectors'
import { getWeatherList } from '../../store/reducers/weather/weatherSelectors'
import { GlobalStyle } from '../../styles/theme/globalStyle'
import { darkTheme, lightTheme } from '../../styles/theme/theme'
import { PandaIcon } from '../UI/icons/icons'
import WeatherContainer from '../WeatherContainer'
import './loyaut.scss'
import Menu from './Menu'

const { Content, Footer } = Layout

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

const AppLoyaut = () => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const theme = useSelector(getAppTheme)
  const { isFetching } = useSelector(getWeatherList)
  const themeMode = theme === 'dark' ? darkTheme : lightTheme
  const headerRef = useRef<HTMLDivElement | null>(null)

  const showDrawer = () => {
    setVisible(true)
    const header = headerRef.current
    if (header) {
      const currentCn = header!.className
      header!.className = `${currentCn} calc`
    }
  }
  const onClose = () => {
    setVisible(false)
    const header = headerRef.current
    if (header) {
      const currentCn = header!.className.replace('calc', '')
      header!.className = `${currentCn}`
    }
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Spin spinning={isFetching} size='large'>
        <Layout style={{ background: 'inherit', minHeight: '100vh' }}>
          {/* <StyledAffix offsetTop={1}> */}
          <StyledHeader ref={headerRef}>
            <div className='container'>
              <HeaderInner>
                <CenteredSpace>
                  <PandaIcon style={{ fontSize: '32px' }} />
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
          {/* </StyledAffix> */}
          <Content style={{ overflow: 'initial', paddingTop: 50 }}>
            <Menu visible={visible} onClose={onClose} />
            <WeatherContainer />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Spin>
    </ThemeProvider>
  )
}

export default AppLoyaut
