import { Card, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { DailyWeather } from '../../../../../api/WeatherResponseTypes'
import { weatherActions } from '../../../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../../../store/reducers/weather/weatherSelectors'
import { toFahrenheit } from '../../../../../utils/convertTemperature'
import { parseWeatherDescription } from '../../../../../utils/parse'
import { timestampToDate } from '../../../../../utils/parseTimestamp'
import { Image, MyBadge, StyledCard, StyledText, StyledTooltip } from './ForecastCard.styles'
import { ForecastCardProps } from './ForecastCard.types'

const ForecastCard: FC<ForecastCardProps> = ({ weather, timezone, cardNum }) => {
  const { units, forecastNum } = useSelector(getWeatherList)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { code, cityPath } = useParams()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units])

  const onForecastClick = (dayForecast: DailyWeather, dayNum: number) => {
    if (forecastNum !== dayNum) {
      dispatch(weatherActions.forecastReceived(dayForecast, dayNum))
    }
    if (dayNum === 0 && forecastNum !== dayNum) {
      dispatch(weatherActions.toggleHasWeather())
      dispatch(weatherActions.toggleHasForecast())
    }
    navigate(`/${code}/${cityPath || ''}/day=${dayNum}`)
  }

  const { weekDay, date, month } = timestampToDate(weather.dt, timezone)
  const weatherDescription = parseWeatherDescription(weather.weather)
  return (
    <MyBadge text={`${date} ${t(month.short)}`}>
      <StyledCard
        active={cardNum === forecastNum ? 1 : 0}
        bordered
        size='small'
        onClick={() => onForecastClick(weather, cardNum)}
        hoverable
        bodyStyle={{ paddingTop: 0 }}
        cover={
          <Image>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather' />
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
