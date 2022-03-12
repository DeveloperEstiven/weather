import { CurrentWeather, DailyWeather } from '../../../../../../api/WeatherAPI/WeatherAPI.types'
import { UnitTemp } from '../../../../../../utils/convertTemperature'

export type DetailInfoProps = {
  weather: DailyWeather | CurrentWeather
  unit: UnitTemp
}
