const temp = ''

const helperUnitSymbols = {
  pressure: 'pressure_unit',
  humidity: '%',
  wind_speed: 'wind_speed_unit',
  uvi: '%',
} as const

export const filterUnitSymbols = { ...helperUnitSymbols, temp }

export const unitSymbols = {
  dew_point: '',
  clouds: '%',
} as const

export const commonUnitSymbols = { ...helperUnitSymbols, ...unitSymbols } as const
