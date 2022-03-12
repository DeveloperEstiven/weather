import { UnitTemp } from './../../../../../../utils/convertTemperature'
import { DailyWeather } from '../../../../../../api/WeatherAPI/WeatherAPI.types'

export type ForecastWeatherCardProps = {
  forecastWeather: DailyWeather
  timezone: string
  isCelsius: boolean
  unit: UnitTemp
}
