import { Weather } from '../../../../../../api/WeatherAPI/WeatherAPI.types'
import { UnitTemp } from '../../../../../../utils/convertTemperature'

export type SliderProps = {
  unit: UnitTemp
  weather: Weather[]
  timezone: string
  sunset: number
  sunrise: number
  temperature: number
  feels_like: number
}
