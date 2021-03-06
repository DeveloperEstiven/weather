import { toFahrenheit } from '../convertTemperature'
import { t } from 'i18next'
import { DailyWeather, TemperatureDaily } from '../../api/WeatherAPI/WeatherAPI.types'

const getDataFromObj = (objs: {}[], isCelsius: boolean) => {
  const res = []
  for (let i = 0; i < objs.length; i++) {
    const currentObj = objs[i]
    const temp = []
    for (let key in currentObj) {
      let val = currentObj[key as keyof typeof currentObj] as number
      if (!isCelsius) val = toFahrenheit(val)
      temp.push({ x: t(key), y: val })
    }
    res.push(temp)
  }

  return res
}

const getCurrentObjKeys = (objs: {}[]) => {
  const names = ['morn', 'day', 'eve', 'night']
  const temps = []
  for (let k = 0; k < objs.length; k++) {
    const currentObj = objs[k]
    const newTemp = {} as TemperatureDaily
    for (let j = 0; j < names.length; j++) {
      const key = names[j] as keyof typeof currentObj
      newTemp[key] = currentObj[key]
    }
    temps.push(newTemp)
  }
  return temps
}

export const getChartDailyData = (dailyWeather: DailyWeather, isCelsius: boolean) => {
  const temps = getCurrentObjKeys([dailyWeather.temp, dailyWeather.feels_like])
  const tempsData = getDataFromObj(temps, isCelsius)
  return [
    { id: t('feels_like'), data: tempsData[1] },
    { id: t('temp'), data: tempsData[0] },
  ]
}
