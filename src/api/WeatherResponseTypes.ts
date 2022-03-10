export type Weather = {
  id: number
  main: string
  description?: string
  icon: string
}

export type CommonTypes = {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
}

export type WeatherKeys = keyof CommonTypes

type DayType = {
  sunrise: number
  sunset: number
}

export type CurrentWeather = DayType & CommonTypes

export type HourlyWeather = {
  pop: number
} & CommonTypes

export type TemperatureDaily = {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export type DailyTime = {
  day: number
  night: number
  eve: number
  morn: number
}

export type DailyWeather = {
  dt: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: TemperatureDaily
  feels_like: DailyTime
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  clouds: number
  pop: number
  rain: number
  snow: number
  uvi: number
} & DayType

export type WeatherResponse = {
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}

export type CityResponse = {
  country: string
  lat: number
  lon: number
  name: string
  state?: string | null
  local_names: any
}
