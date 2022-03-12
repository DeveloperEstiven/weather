import { DailyWeather } from '../../../../../api/WeatherAPI/WeatherAPI.types'

export type ForecastCardProps = {
  weather: DailyWeather
  timezone: string
  cardNum: number
}
