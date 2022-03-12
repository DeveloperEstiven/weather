import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import AppLoyaut from './components/AppLayout/AppLayout'
import Page404 from './components/Page404'
import store from './store'

const StyledSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
`

const App = () => {
  return (
    <Suspense fallback={<StyledSpin size='large' />}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<AppLoyaut />} />
            <Route path='/:code' element={<AppLoyaut />}>
              <Route path=':cityPath' element={<AppLoyaut />}>
                <Route path=':num' element={<AppLoyaut />} />
              </Route>
            </Route>
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
