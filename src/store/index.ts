import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import weatherReducer from './reducers/weather'
import appReducer from './reducers/app'

const rootReducer = combineReducers({
  weather: weatherReducer,
  app: appReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type RootReducer = typeof rootReducer
export type AppState = ReturnType<RootReducer>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferAction<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type BaseThunk<AT extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, AT>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
export type AppDispatch = typeof store.dispatch

export default store
