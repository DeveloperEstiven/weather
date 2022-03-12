import { UnitTemp } from './../../../../../../utils/convertTemperature'
import { CurrentWeather } from '../../../../../../api/WeatherResponseTypes'

export type CurrentWeatherCardProps = {
  currentWeather: CurrentWeather
  timezone: string
  isCelsius: boolean
  unit: UnitTemp
}
