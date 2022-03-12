import { Dispatch } from 'react'
import { BaseThunk, InferAction } from '../..'
import geocoderApi, { AutocompleteResult } from '../../../api/geocoderAPI'
import { FilterOption } from '../../../components/WeatherContainer/Weather/WeatherDisplay/FilterHourlyForecast/FilterHourlyForecast'
import { getUniqueAutocomplete, getUniquePossibleCities } from '../../../utils/parse'
import WeatherAPI from './../../../api/WeatherAPI'
import { CityResponse, DailyWeather, WeatherResponse } from './../../../api/WeatherResponseTypes'
import { compareCities } from './../../../utils/url'

export const enum WeatherActionsTypes {
  WEATHER_RECEIVED = 'weather/WEATHER_RECEIVED',
  TOGGLE_IS_FETCHING = 'weather/TOGGLE_IS_FETCHING',
  ERROR_OCCURRED = 'weather/ERROR_OCCURRED',
  SET_CURRENT_CITY = 'weather/SET_CURRENT_CITY',
  SET_POSSIBLE_CITIES = 'weather/SET_POSSIBLE_CITIES',
  WARNING_RECEIVED = 'weather/WARNING_RECEIVED',
  SET_UNITS = 'weather/SET_UNITS',
  FORECAST_RECEIVED = 'weather/FORECAST_RECEIVED',
  SET_FORECAST_DAY = 'weather/SET_FORECAST_DAY',
  TOGGLE_HAS_WEATHER = 'weather/TOGGLE_HAS_WEATHER',
  TOGGLE_HAS_FORECAST = 'weather/TOGGLE_HAS_FORECAST',
  SET_SELECTED_FILTER = 'weather/SET_SELECTED_FILTER',
  CITIES_BY_TERM_RECEIVED = 'weather/CITIES_BY_TERM_RECEIVED',
  CITY_FROM_URL_RECEIVED = 'weather/CITY_FROM_URL_RECEIVED',
}

//! ==================Action Creators==================
export type WeatherAction = InferAction<typeof weatherActions>

export const weatherActions = {
  weatherReceived: (weather: WeatherResponse) => {
    return {
      type: WeatherActionsTypes.WEATHER_RECEIVED,
      payload: weather,
    } as const
  },

  toggleIsFetching: (flag: boolean) => {
    return {
      type: WeatherActionsTypes.TOGGLE_IS_FETCHING,
      payload: flag,
    } as const
  },

  errorOccurred: (error: string) => {
    return {
      type: WeatherActionsTypes.ERROR_OCCURRED,
      payload: error,
    } as const
  },

  setCurrentCity: (city: CityResponse) => {
    return {
      type: WeatherActionsTypes.SET_CURRENT_CITY,
      payload: city,
    } as const
  },

  setPossibleCities: (cities: CityResponse[]) => {
    return {
      type: WeatherActionsTypes.SET_POSSIBLE_CITIES,
      payload: cities,
    } as const
  },

  warningReceived: (warning: string) => {
    return {
      type: WeatherActionsTypes.WARNING_RECEIVED,
      payload: warning,
    } as const
  },

  setUnits: (units: 'celsius' | 'fahrenheit') => {
    return {
      type: WeatherActionsTypes.SET_UNITS,
      payload: units,
    } as const
  },

  forecastReceived: (forecast: DailyWeather, num: number) => {
    return {
      type: WeatherActionsTypes.FORECAST_RECEIVED,
      payload: { forecast, num },
    } as const
  },

  setForecastDay: (num: number) => {
    return {
      type: WeatherActionsTypes.SET_FORECAST_DAY,
      payload: num,
    } as const
  },

  toggleHasWeather: () => {
    return {
      type: WeatherActionsTypes.TOGGLE_HAS_WEATHER,
    } as const
  },

  toggleHasForecast: () => {
    return {
      type: WeatherActionsTypes.TOGGLE_HAS_FORECAST,
    } as const
  },

  setSelectedFilter: (option: FilterOption) => {
    return {
      type: WeatherActionsTypes.SET_SELECTED_FILTER,
      payload: option,
    } as const
  },

  citiesByTermReceived: (autocompete: AutocompleteResult) => {
    return {
      type: WeatherActionsTypes.CITIES_BY_TERM_RECEIVED,
      payload: autocompete,
    } as const
  },

  cityFromUrlReceived: (cities: CityResponse[]) => {
    return {
      type: WeatherActionsTypes.CITY_FROM_URL_RECEIVED,
      payload: cities,
    } as const
  },
}

//! ===================Thunk Creators==================
type WeatherThunk = BaseThunk<WeatherAction>

const errorHandler = (e: unknown, dispatch: Dispatch<WeatherAction>, exclude = '') => {
  if (typeof e === 'string') {
    dispatch(weatherActions.errorOccurred(e))
  } else if (e instanceof Error) {
    const predicate = exclude ? !e.message.includes(exclude) : true
    predicate && dispatch(weatherActions.errorOccurred(e.message))
  }
}

export const getWeather =
  (lat: number, lon: number, lang: string): WeatherThunk =>
  async dispatch => {
    if (lat && lon) {
      dispatch(weatherActions.toggleIsFetching(true))
      try {
        const res = await WeatherAPI.getWeatherByGeo(lat.toString(), lon.toString(), lang)
        dispatch(weatherActions.weatherReceived(res))
      } catch (e) {
        errorHandler(e, dispatch)
      } finally {
        dispatch(weatherActions.toggleIsFetching(false))
      }
    }
  }

export const getCitiesByTerm =
  (term: string): WeatherThunk =>
  async dispatch => {
    if (term.length > 1) {
      try {
        let res = await geocoderApi.getCityNameByTerm(term)
        dispatch(weatherActions.citiesByTermReceived(getUniqueAutocomplete(res)))
      } catch (e) {
        errorHandler(e, dispatch, '404')
      }
    }
  }

export const getCities =
  (cityName: string, lang: string, limit: number = 5): WeatherThunk =>
  async dispatch => {
    dispatch(weatherActions.toggleIsFetching(true))
    try {
      const res = await WeatherAPI.getGeoByCityname(cityName, limit)
      if (res.length === 1) {
        const currentCity = res[0]
        const { lat, lon } = currentCity
        dispatch(weatherActions.setCurrentCity(currentCity))
        dispatch(weatherActions.setPossibleCities([]))
        dispatch(getWeather(lat, lon, lang))
      } else if (res.length > 1) {
        dispatch(weatherActions.setPossibleCities(getUniquePossibleCities(res)))
      } else {
        dispatch(weatherActions.setPossibleCities([]))
        dispatch(weatherActions.warningReceived('City not found'))
      }
    } catch (e) {
      errorHandler(e, dispatch)
    } finally {
      dispatch(weatherActions.toggleIsFetching(false))
    }
  }

export const getCityByGeo =
  (lat: string, lon: string, url: string): WeatherThunk =>
  async dispatch => {
    dispatch(weatherActions.toggleIsFetching(true))
    try {
      const res = await WeatherAPI.getCitynameByGeo(lat, lon)
      if (res.length === 1) {
        const currentCity = res[0]
        dispatch(weatherActions.setCurrentCity(currentCity))
        dispatch(weatherActions.setPossibleCities([]))
      } else if (res.length > 1) {
        const cityFromUrl = compareCities(res, url)
        cityFromUrl
          ? dispatch(weatherActions.setCurrentCity(cityFromUrl))
          : dispatch(weatherActions.errorOccurred('city with this url isnt find'))
      } else {
        dispatch(weatherActions.setPossibleCities([]))
        dispatch(weatherActions.warningReceived('City not found'))
      }
    } catch (e) {
      errorHandler(e, dispatch)
    } finally {
      dispatch(weatherActions.toggleIsFetching(false))
    }
  }
