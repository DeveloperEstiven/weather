import { DailyWeather } from '../../../../../../api/WeatherAPI/WeatherAPI.types'

export type ChartForecastProps = {
  weatherDaily: DailyWeather[]
  isCelsius: boolean
}
