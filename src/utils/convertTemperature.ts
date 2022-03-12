export const toCelsius = (fahrenheit: number) => Math.round((fahrenheit - 32) * (5 / 9))
export const toFahrenheit = (celsius: number) => Math.round(celsius * (9 / 5) + 32)
export const toMmRt = (pressure: number) => Math.round(pressure / 1.33)

export const toCurrentUnit = (temp: number, isCelsius: boolean) => {
  if (isCelsius) return Math.round(temp)
  return toFahrenheit(temp)
}

export type UnitTemp = '°C' | '°F'
