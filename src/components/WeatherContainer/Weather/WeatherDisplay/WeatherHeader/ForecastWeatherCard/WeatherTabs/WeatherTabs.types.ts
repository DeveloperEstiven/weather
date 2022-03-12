import { DailyTime, DailyWeather } from '../../../../../../../api/WeatherResponseTypes'
import { UnitTemp } from '../../../../../../../utils/convertTemperature'

export type TabProps = {
  weather: DailyWeather
  timezone: string
  unit: UnitTemp
  isCelsius: boolean
}

export type TabNames = {
  name: string
  key: keyof DailyTime
}[]
