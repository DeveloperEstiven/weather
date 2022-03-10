import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { routes } from './router'
import { Provider } from 'react-redux'
import store from './store'
import Preloader from './components/UI/Preloader'
import { Routes, Route } from 'react-router-dom'
import Page404 from './components/Page404'
import AppLoyaut from './components/AppLayout'
import Weather from './components/WeatherContainer/Weather'

const App = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<AppLoyaut />} />
            <Route path='/:code' element={<AppLoyaut />}>
              <Route path=':cityPath' element={<AppLoyaut />} />
            </Route>
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
