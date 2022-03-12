import axios from 'axios'
import { AutocompleteResponse, Location } from './geocoderAPI.types'
const key = process.env.REACT_APP_GEOCODER_API_KEY

const createInstance = (lang: string) => {
  return axios.create({
    baseURL: 'https://us1.locationiq.com/v1',
    headers: { 'accept-language': lang },
  })
}

const geocoderApi = {
  getWeatherByGeo: (lat: number, lon: number, lang: string = 'en') =>
    createInstance(lang)
      .get<Location>(`/reverse.php?key=${key}&lat=${lat}&lon=${lon}&format=json`)
      .then(res => res.data),
  getCityNameByTerm: (q: string, lang: string = 'en') =>
    createInstance(lang)
      .get<AutocompleteResponse>(`/autocomplete.php?key=${key}&q=${q}&tag=place:city&dedupe=1&normalizecity=1&limit=5`)
      .then(res => res.data),
}

export default geocoderApi
