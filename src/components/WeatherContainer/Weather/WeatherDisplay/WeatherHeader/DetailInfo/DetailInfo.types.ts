import { CurrentWeather, DailyWeather } from '../../../../../../api/WeatherResponseTypes'
import { UnitTemp } from '../../../../../../utils/convertTemperature'

export type DetailInfoProps = {
  weather: DailyWeather | CurrentWeather
  unit: UnitTemp
}
