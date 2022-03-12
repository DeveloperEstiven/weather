import { AppTheme } from './appReducer'
import { BaseThunk, InferAction } from '../..'
import geocoderApi from '../../../api/geocoderAPI/geocoderAPI'
import { Location } from '../../../api/geocoderAPI/geocoderAPI.types'

export const enum AppActionsTypes {
  SET_THEME = 'app/TOGGLE_THEME',
  TOGGLE_IS_FETCHING = 'app/TOGGLE_IS_FETCHING',
  ERROR_OCCURRED = 'app/ERROR_OCCURRED',
  LOCATION_RECEIVED = 'app/LOCATION_RECEIVED',
}

//! ==================Action Creators==================
export type AppAction = InferAction<typeof appActions>

export const appActions = {
  setTheme: (theme: AppTheme) => {
    return {
      type: AppActionsTypes.SET_THEME,
      payload: theme,
    } as const
  },
  toggleIsFetching: (flag: boolean) => {
    return {
      type: AppActionsTypes.TOGGLE_IS_FETCHING,
      payload: flag,
    } as const
  },
  errorOccurred: (error: string) => {
    return {
      type: AppActionsTypes.ERROR_OCCURRED,
      payload: error,
    } as const
  },
  locationReceived: (location: Location) => {
    return {
      type: AppActionsTypes.LOCATION_RECEIVED,
      payload: location,
    } as const
  },
}

//! ===================Thunk Creators==================
type AppThunk = BaseThunk<AppAction>

export const getCityInfo =
  (lat: number, lon: number, lang: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.toggleIsFetching(true))
    try {
      const res = await geocoderApi.getWeatherByGeo(lat, lon, lang)
      dispatch(appActions.locationReceived(res))
    } catch (e) {
      if (typeof e === 'string') {
        dispatch(appActions.errorOccurred(e))
      } else if (e instanceof Error) {
        dispatch(appActions.errorOccurred(e.message))
      }
    } finally {
      dispatch(appActions.toggleIsFetching(false))
    }
  }
