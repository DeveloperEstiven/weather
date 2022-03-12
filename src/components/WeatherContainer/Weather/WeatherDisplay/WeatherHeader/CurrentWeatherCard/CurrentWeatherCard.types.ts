import { UnitTemp } from './../../../../../../utils/convertTemperature'
import { CurrentWeather } from '../../../../../../api/WeatherAPI/WeatherAPI.types'

export type CurrentWeatherCardProps = {
  currentWeather: CurrentWeather
  timezone: string
  isCelsius: boolean
  unit: UnitTemp
}
