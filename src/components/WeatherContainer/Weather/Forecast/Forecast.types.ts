import { DailyWeather } from '../../../../api/WeatherAPI/WeatherAPI.types'

export type ForecastProps = {
  weather: DailyWeather[]
  timezone: string
}
