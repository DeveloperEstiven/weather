import { CurrentWeather, DailyWeather } from '../../../../../../../api/WeatherAPI/WeatherAPI.types'
import { UnitTemp } from '../../../../../../../utils/convertTemperature'
import { commonUnitSymbols } from '../../../FilterHourlyForecast/FilterHourlyForecast.types'

export type ColumnItemProps = {
  weather: CurrentWeather | DailyWeather
  title: keyof typeof commonUnitSymbols
  unit?: UnitTemp
}
