import { CityResponse } from '../api/WeatherAPI/WeatherAPI.types'

export const getGeoPath = (country: string, city: string, lat: number, lon: number) => {
  return `country=${country}&city=${city}&lat=${lat}&lon=${lon}`
}

export const compareCities = (citiesFromUrl: CityResponse[], cityPath: string) => {
  const firstDivider = cityPath.indexOf('&')
  const middleDivider = cityPath.indexOf('&lat')
  const name = cityPath.slice(firstDivider + 6, middleDivider)
  const country = cityPath.slice(8, firstDivider)
  for (const city of citiesFromUrl) if (city.name === name && city.country === country) return city
}

export const getCityLocationFromUrl = (url: string) => {
  const middleDivider = url.indexOf('&lat')
  const lastDivider = url.lastIndexOf('&')
  return {
    lat: url.slice(middleDivider + 5, lastDivider),
    lon: url.slice(lastDivider + 5),
  }
}
