import AppLoyaut from '../components/AppLayout'
import Page404 from '../components/Page404'
import Weather from '../components/WeatherContainer/Weather'

type Route = {
  path: string
  component: React.FC
  exact?: boolean
}

export const routes: Route[] = [
  { path: '/:code', component: AppLoyaut },
  { path: '/', component: AppLoyaut },

  // { path: '/weather', component: Weather },
  { path: '*', component: Page404 },
]
