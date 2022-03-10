import { reverse } from 'dns'
import { AutocompleteResponse, AutocompleteResult } from '../api/geocoderAPI'
import { CityResponse, Weather } from './../api/WeatherResponseTypes'

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

function onlyUnique(value: number, index: number, self: number[]) {
  return self.indexOf(value) === index
}

export const getUniquePossibleCities = (response: CityResponse[]) => {
  //! BRATISLAVA
  const names = response.map(city => `${city.name} ${String(city.country)} ${String(city.state)}`)
  const uniqueNames = names.filter((item, i, ar) => ar.indexOf(item) === i)
  const uniqueIndexes = []
  for (let i = 0; i < uniqueNames.length; i++) {
    const element = uniqueNames[i]
    const uniqueIndex = names[i].indexOf(element)
    if (uniqueIndex > 0) uniqueIndexes.push(uniqueIndex)
  }
  console.log('uniqueIndexes', uniqueIndexes)
  const res = []
  for (let i = 0; i < uniqueIndexes.length; i++) {
    const index = uniqueIndexes[i]
    res.push(response[index])
  }
  console.log(uniqueIndexes)
  return res
}
