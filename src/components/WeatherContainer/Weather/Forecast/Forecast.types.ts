import { DailyWeather } from '../../../../api/WeatherResponseTypes'

export type ForecastProps = {
  weather: DailyWeather[]
  timezone: string
}
