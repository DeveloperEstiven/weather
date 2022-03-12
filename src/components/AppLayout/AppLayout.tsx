import { Layout, Spin } from 'antd'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { getAppTheme } from '../../store/reducers/app/appSelectors'
import { getWeatherList } from '../../store/reducers/weather/weatherSelectors'
import { GlobalStyle } from '../../styles/theme/globalStyle'
import { darkTheme, lightTheme } from '../../styles/theme/theme'
import WeatherContainer from '../WeatherContainer'
import Footer from './Footer'
import Header from './Header'
import Menu from './Menu'

const { Content } = Layout

const AppLoyaut = () => {
  const [visible, setVisible] = useState(false)
  const theme = useSelector(getAppTheme)
  const { isFetching, hasWeather, hasForecast } = useSelector(getWeatherList)
  const themeMode = theme === 'dark' ? darkTheme : lightTheme
  const headerRef = useRef<HTMLDivElement | null>(null)

  const onClose = () => {
    setVisible(false)
    localStorage.removeItem('headerCalc')
    const header = headerRef.current
    if (header) {
      const currentCn = header!.className.replace(' calc', '')
      if (hasWeather || hasForecast) {
        header!.className = `${currentCn}`
      }
    }
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Spin spinning={isFetching} size='large'>
        <Layout style={{ background: 'inherit', minHeight: '100vh' }}>
          <Header headerRef={headerRef} setVisible={setVisible} />

          <Content style={{ overflow: 'initial', paddingTop: 50 }}>
            <Menu visible={visible} onClose={onClose} />
            <WeatherContainer />
          </Content>

          <Footer />
        </Layout>
      </Spin>
    </ThemeProvider>
  )
}

export default AppLoyaut
