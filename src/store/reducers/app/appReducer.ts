import { Location } from '../../../api/geocoderAPI'
import { AppAction, AppActionsTypes } from './appActionCreators'

export type AppTheme = 'dark' | 'light'
const initialState = {
  theme: 'dark' as AppTheme,
  isFetching: false,
  error: '',
  location: {} as Location,
}

type InitialState = typeof initialState

//! =====================Reducer=======================
const appReducer = (state = initialState, action: AppAction): InitialState => {
  switch (action.type) {
    case AppActionsTypes.SET_THEME:
      return { ...state, theme: action.payload }
    case AppActionsTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload }
    case AppActionsTypes.ERROR_OCCURRED:
      return { ...state, error: action.payload }
    case AppActionsTypes.LOCATION_RECEIVED:
      return { ...state, location: action.payload }

    default:
      return state
  }
}

export default appReducer
