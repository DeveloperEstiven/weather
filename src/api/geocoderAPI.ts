import axios from 'axios'
const key = 'pk.d96c1a7c04a92ba04734c0135022c11a'

const createInstance = (lang: string) => {
  return axios.create({
    baseURL: 'https://us1.locationiq.com/v1',
    headers: { 'accept-language': lang },
  })
}

export type Address = {
  city: string
  country: string
  country_code: string
  district: string
  house_number: string
  municipality: string
  postcode: string
  road: string
  state: string
}

export type Location = {
  address: Address
  boundingbox: string[]
  display_name: string
  lat: string
  licence: string
  lon: string
  osm_id: string
  osm_type: string
  place_id: string
}

export type AutocompleteResponse = { display_place: string }[]
export type AutocompleteResult = { value: string }[]

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
