import { AppState } from '../..'

export const getWeatherList = (state: AppState) => state.weather
export const getPossibleCities = (state: AppState) => state.weather.possibleCities
export const getCurrentCity = (state: AppState) => state.weather.currentCity
export const getIsFetching = (state: AppState) => state.weather.isFetching
export const getWarning = (state: AppState) => state.weather.warning
