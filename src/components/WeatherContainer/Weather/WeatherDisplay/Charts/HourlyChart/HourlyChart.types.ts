import { HourlyWeather } from '../../../../../../api/WeatherResponseTypes'

export type HourlyChartProps = {
  weatherHourly: HourlyWeather[]
  isCelsius: boolean
  timezone: string
}
