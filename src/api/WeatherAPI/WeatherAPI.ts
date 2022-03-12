import { CityResponse, WeatherResponse } from './WeatherAPI.types'
import axios from 'axios'

const baseWeatherURL = 'http://api.openweathermap.org/data/2.5/'
const baseGeoURL = 'http://api.openweathermap.org/geo/1.0/'
const appid = 'f2c19235b7b33a79fb3b010c0bd9a2b7'

const WeatherAPI = {
  getWeatherByGeo: (lat: string, lon: string, lang: string, units: 'metric' | 'imperial' = 'metric') =>
    axios
      .get<WeatherResponse>(`${baseWeatherURL}/onecall?`, {
        params: { lat, lon, units, lang, exclude: 'minutely', appid },
      })
      .then(res => res.data),

  getGeoByCityname: (cityName: string, limit: number) =>
    axios
      .get<CityResponse[]>(`${baseGeoURL}/direct?`, {
        params: { q: cityName, limit, appid },
      })
      .then(res => res.data),

  getCitynameByGeo: (lat: string, lon: string) =>
    axios
      .get<CityResponse[]>(`${baseGeoURL}/reverse?`, {
        params: { lat, lon, appid },
      })
      .then(res => res.data),
}

export default WeatherAPI
