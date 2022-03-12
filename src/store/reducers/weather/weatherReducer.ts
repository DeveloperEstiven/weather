import { AutocompleteResult } from '../../../api/geocoderAPI/geocoderAPI.types'
import { CityResponse, DailyWeather, WeatherResponse } from '../../../api/WeatherAPI/WeatherAPI.types'
import { WeatherAction, WeatherActionsTypes } from './weatherActionCreators'

const initialState = {
  currentCity: {} as CityResponse,
  possibleCities: [] as CityResponse[],
  weather: {} as WeatherResponse,
  hasWeather: false,
  isFetching: false,
  error: '',
  warning: '',
  units: 'celsius' as 'celsius' | 'fahrenheit',
  forecast: {} as DailyWeather,
  hasForecast: false,
  forecastNum: 0,
  selectedFilter: 'temp' as 'pressure' | 'humidity' | 'wind_speed' | 'uvi' | 'temp',
  autocompleteResult: [] as AutocompleteResult,
  possibleCitiesFromUrl: [] as CityResponse[],
}

type InitialState = typeof initialState

//! =====================Reducer=======================
const weatherReducer = (state = initialState, action: WeatherAction): InitialState => {
  switch (action.type) {
    case WeatherActionsTypes.WEATHER_RECEIVED:
      return { ...state, weather: action.payload, hasWeather: !!Object.keys(action.payload).length, hasForecast: false }
    case WeatherActionsTypes.FORECAST_RECEIVED:
      return {
        ...state,
        forecast: action.payload.forecast,
        hasWeather: false,
        hasForecast: true,
        forecastNum: action.payload.num,
      }
    case WeatherActionsTypes.SET_FORECAST_DAY:
      return { ...state, forecastNum: action.payload }
    case WeatherActionsTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload }
    case WeatherActionsTypes.TOGGLE_HAS_WEATHER:
      return { ...state, hasWeather: !state.hasWeather }
    case WeatherActionsTypes.TOGGLE_HAS_FORECAST:
      return { ...state, hasForecast: !state.hasForecast }
    case WeatherActionsTypes.ERROR_OCCURRED:
      return { ...state, error: action.payload }
    case WeatherActionsTypes.SET_POSSIBLE_CITIES:
      return { ...state, possibleCities: action.payload, warning: '' }
    case WeatherActionsTypes.SET_CURRENT_CITY:
      return { ...state, currentCity: action.payload }
    case WeatherActionsTypes.WARNING_RECEIVED:
      return { ...state, warning: action.payload }
    case WeatherActionsTypes.SET_UNITS:
      return { ...state, units: action.payload }
    case WeatherActionsTypes.SET_SELECTED_FILTER:
      return { ...state, selectedFilter: action.payload }
    case WeatherActionsTypes.CITIES_BY_TERM_RECEIVED:
      return { ...state, autocompleteResult: action.payload }
    case WeatherActionsTypes.CITY_FROM_URL_RECEIVED:
      return { ...state, possibleCitiesFromUrl: action.payload }
    default:
      return state
  }
}

export default weatherReducer
