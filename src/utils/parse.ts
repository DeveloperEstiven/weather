import { AutocompleteResponse, AutocompleteResult } from '../api/geocoderAPI/geocoderAPI.types'
import { CityResponse, Weather } from '../api/WeatherAPI/WeatherAPI.types'

export const parseCityLocation = (city: CityResponse, code: string | undefined) => {
  const { country, name, state, local_names } = city
  let localName = name
  if (code && local_names && code in local_names) localName = local_names[code]
  return [country, state, localName].filter(el => el).join(', ')
}

export const parseWeatherDescription = (weather: Weather[]) => {
  const WeatherDescription: string[] = []
  weather.forEach(el => {
    if (el.description) WeatherDescription.push(el.description)
  })
  return WeatherDescription.join(', ')
}

export const getUniqueAutocomplete = (response: AutocompleteResponse) => {
  const temp: string[] = []
  response.forEach(el => temp.push(el.display_place))
  const res: AutocompleteResult = []
  Array.from(new Set(temp)).forEach(el => res.push({ value: el }))
  return res
}

export const getUniquePossibleCities = (response: CityResponse[]) => {
  const names = response.map(city => `${city.name} ${String(city.country)} ${String(city.state)}`)
  return names
    .map((n, i) => (names.indexOf(n) === i ? i : -1))
    .filter(n => n >= 0)
    .map(n => response[n])
}
