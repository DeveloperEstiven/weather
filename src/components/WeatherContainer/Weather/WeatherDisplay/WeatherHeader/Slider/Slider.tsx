import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Weather } from '../../../../../../api/WeatherResponseTypes'
import { UnitTemp } from '../../../../../../utils/convertTemperature'
import { parseWeatherDescription } from '../../../../../../utils/parse'
import { SunriseIcon, SunsetIcon } from '../../../../../UI/icons/icons'
import SunTime from './SunTime'

const MainCard = styled.div`
  background: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  display: flex;
  font-size: 16px;
  line-height: 1em;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  overflow-wrap: break-word;
  border-radius: ${props => props.theme.borderRadius};
  padding: 20px;
  margin-bottom: 16px;
`

const ColumnDiv = styled.div`
  display: flex;
  flex-basis: 33.33333%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Temperature = styled.div`
  font-size: 45px;
  line-height: 1em;
  font-weight: bold;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    font-size: 32px;
  }
`
const FeelsLike = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
`
const Image = styled.div`
  img {
    height: 100px;
    width: 100px;
  }
`
type SliderProps = {
  unit: UnitTemp
  weather: Weather[]
  timezone: string
  sunset: number
  sunrise: number
  temperature: number
  feels_like: number
}

const Slider: FC<SliderProps> = ({ unit, weather, timezone, sunset, sunrise, temperature, feels_like }) => {
  const { t } = useTranslation()
  return (
    <MainCard>
      <SunTime title={t('sunrise')} dt={sunrise} timezone={timezone} Icon={SunriseIcon} />

      <ColumnDiv>
        <Temperature>
          {temperature}
          {unit}
        </Temperature>
        <div>
          {t('feels_like')}
          <FeelsLike>
            {feels_like} {unit}
          </FeelsLike>
        </div>
        <Image>
          <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt='weather icon' />
        </Image>
        <div>
          <strong>{parseWeatherDescription(weather)}</strong>
        </div>
      </ColumnDiv>

      <SunTime title={t('sunset')} dt={sunset} timezone={timezone} Icon={SunsetIcon} />
    </MainCard>
  )
}

export default Slider
