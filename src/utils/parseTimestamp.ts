import moment from 'moment'
import 'moment-timezone'
import { Moment } from 'moment-timezone'

type Time = string | number

const getStringNum = (num: number): Time => (num > 9 ? num : '0' + num)

export const timestampToDate = (unix_timestamp: number, timezone: string) => {
  const loacaleDate = moment(unix_timestamp * 1000).tz(timezone)

  const year = getStringNum(loacaleDate.year())
  const monthNum = getStringNum(loacaleDate.month() + 1)
  const date = getStringNum(loacaleDate.date())
  const hours = getStringNum(loacaleDate.hours())
  const minutes = getStringNum(loacaleDate.minutes())
  const seconds = getStringNum(loacaleDate.seconds())
  const weekDay = timestampToWeekDay(loacaleDate)
  const month = timestampToMonth(loacaleDate)

  return { year, monthNum, month, weekDay, date, hours, minutes, seconds }
}

export const timestampToWeekDay = (date: Moment) => {
  const shortDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const fullDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return {
    short: shortDays[date.isoWeekday() - 1],
    full: fullDays[date.isoWeekday() - 1],
  }
}

export const timestampToMonth = (date: Moment) => {
  const fullMonths = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]
  const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
  return {
    short: shortMonths[date.month()],
    full: fullMonths[date.month()],
  }
}
