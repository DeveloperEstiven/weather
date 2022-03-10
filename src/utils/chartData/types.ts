import { HourlyWeather } from '../../api/WeatherResponseTypes'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export interface IHourlyLite extends Omit<HourlyWeather, 'weather'> {}

export type Data = {
  x: number | string
  y: number
}

export type DataChart = {
  id: string
  data: Data[]
}[]
