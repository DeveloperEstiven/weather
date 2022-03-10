import { Badge, Card, Tooltip, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { DailyWeather } from '../../../../../api/WeatherResponseTypes'
import ava from '../../../../../assets/cloudy.png'
import { weatherActions } from '../../../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import { toFahrenheit } from '../../../../../utils/convertTemperature'
import { parseWeatherDescription } from '../../../../../utils/parse'
import { timestampToDate } from '../../../../../utils/parseTimestamp'

import './ForecastCard.scss'

type ForecastCardProps = {
  weather: DailyWeather
  timezone: string
  num: number
}

const Image = styled.div`
  user-select: none;
  img {
    height: 100px;
    width: 100px;
  }
`

const StyledCard = styled(Card)<{ active: number }>`
  text-align: center;
  background: ${props => props.theme.colors.backgroundPrimary};
  border-color: ${props => props.theme.colors.backgroundMain};
  ${props =>
    props.active &&
    css`
      background: ${props => props.theme.colors.backgroundSecondary};
    `};
`

const StyledText = styled.div`
  color: ${props => props.theme.colors.text};
  span {
    color: ${props => props.theme.colors.text};
  }
`

const MyBadge = styled(Badge.Ribbon)`
  color: ${props => props.theme.colors.backgroundBadge};
  background: ${props => props.theme.colors.backgroundBadge};
  span {
    color: ${props => props.theme.colors.text};
  }
`
const StyledTooltip = styled(Tooltip)`
  color: ${props => props.theme.colors.backgroundBadge};
  span {
    color: ${props => props.theme.colors.text};
  }
`

const ForecastCard: FC<ForecastCardProps> = ({ weather, timezone, num }) => {
  const { units, forecastNum } = useSelector(getWeatherList)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [unitTemp, setUnitTemp] = useState({
    max: Math.round(weather.temp.max),
    min: Math.round(weather.temp.min),
  })

  useEffect(() => {
    switch (units) {
      case 'celsius':
        setUnitTemp({ ...unitTemp, max: Math.round(weather.temp.max), min: Math.round(weather.temp.min) })
        break
      case 'fahrenheit':
        setUnitTemp({ ...unitTemp, max: toFahrenheit(weather.temp.max), min: toFahrenheit(weather.temp.min) })
        break
      default:
        break
    }
  }, [units])

  const onForecastClick = (dayForecast: DailyWeather, num: number) => {
    if (forecastNum !== num) {
      dispatch(weatherActions.forecastReceived(dayForecast, num))
    }
    if (num === 0 && forecastNum !== num) {
      dispatch(weatherActions.toggleHasWeather())
      dispatch(weatherActions.toggleHasForecast())
    }
  }

  const { weekDay, date, month } = timestampToDate(weather.dt, timezone)
  const weatherDescription = parseWeatherDescription(weather.weather)
  return (
    <MyBadge text={`${date} ${t(month.short)}`}>
      <StyledCard
        active={num === forecastNum ? 1 : 0}
        bordered
        size='small'
        onClick={() => onForecastClick(weather, num)}
        hoverable
        bodyStyle={{ paddingTop: 0 }}
        cover={
          <Image>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          </Image>
        }>
        <Card.Meta
          title={<StyledText>{t(weekDay.short)}</StyledText>}
          description={
            <StyledText>
              <StyledTooltip placement='bottom' title={weatherDescription}>
                <Typography.Text ellipsis>{weatherDescription}</Typography.Text>
              </StyledTooltip>
              <div>
                {unitTemp.min}°...{unitTemp.max}°{units === 'celsius' ? 'C' : 'F'}
              </div>
            </StyledText>
          }
        />
      </StyledCard>
    </MyBadge>
  )
}

export default ForecastCard
