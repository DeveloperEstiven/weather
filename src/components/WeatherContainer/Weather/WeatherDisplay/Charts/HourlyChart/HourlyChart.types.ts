import { HourlyWeather } from '../../../../../../api/WeatherAPI/WeatherAPI.types'

export type HourlyChartProps = {
  weatherHourly: HourlyWeather[]
  isCelsius: boolean
  timezone: string
}
