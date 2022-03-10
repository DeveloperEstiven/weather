import { Data, IHourlyLite } from './types'
import { FilterOption } from '../../components/WeatherContainer/Weather/WeatherDisplay/FilterHourlyForecast/FilterHourlyForecast'
import { HourlyWeather } from '../../api/WeatherResponseTypes'
import { toFahrenheit } from '../convertTemperature'
import { timestampToDate } from '../parseTimestamp'
import { t } from 'i18next'

const getChartHourlyHours = (hourlyWeatherArr: HourlyWeather[]): number[] => hourlyWeatherArr.map(el => el.dt)

export const toArray = (...objs: any) => [...objs]

const getChartHourlyDataByArr = (hourlyWeatherArr: HourlyWeather[], key: string): number[] =>
  hourlyWeatherArr.map(el => el[key as keyof IHourlyLite])

export const getChartHourlyData = (
  hourlyWeatherArr: HourlyWeather[],
  timezone: string,
  key: FilterOption | 'feels_like',
  isCelsius?: boolean
) => {
  const data: Data[] = []
  const xData = getChartHourlyHours(hourlyWeatherArr)
  const yData = getChartHourlyDataByArr(hourlyWeatherArr, key)

  for (let i = 0; i < 25; i++) {
    const { date, hours, minutes } = timestampToDate(xData[i], timezone)
    let y = yData[i]
    if (isCelsius === false) y = toFahrenheit(y)
    data.push({ x: `${date} ${hours}:${minutes}`, y })
  }
  return { id: t(key), data }
}
