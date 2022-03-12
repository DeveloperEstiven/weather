import { DailyWeather } from '../../../../../../api/WeatherResponseTypes'

export type ChartForecastProps = {
  weatherDaily: DailyWeather[]
  isCelsius: boolean
}
