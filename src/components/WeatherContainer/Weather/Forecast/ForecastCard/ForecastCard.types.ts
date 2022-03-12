import { DailyWeather } from '../../../../../api/WeatherResponseTypes'

export type ForecastCardProps = {
  weather: DailyWeather
  timezone: string
  cardNum: number
}
