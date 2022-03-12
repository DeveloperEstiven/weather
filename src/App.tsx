import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLoyaut from './components/AppLayout/AppLayout'
import Page404 from './components/Page404'
import Preloader from './components/UI/Preloader'
import store from './store'

const App = () => {
  return (
    <Suspense fallback={<Preloader />}>
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
