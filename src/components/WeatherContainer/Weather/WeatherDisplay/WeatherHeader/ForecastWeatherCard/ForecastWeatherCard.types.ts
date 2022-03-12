import { UnitTemp } from './../../../../../../utils/convertTemperature'
import { DailyWeather } from './../../../../../../api/WeatherResponseTypes'

export type ForecastWeatherCardProps = {
  forecastWeather: DailyWeather
  timezone: string
  isCelsius: boolean
  unit: UnitTemp
}
