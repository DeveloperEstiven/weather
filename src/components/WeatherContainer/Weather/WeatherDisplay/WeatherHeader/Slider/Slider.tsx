import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { parseWeatherDescription } from '../../../../../../utils/parse'
import { SunriseIcon, SunsetIcon } from '../../../../../UI/icons/icons'
import { ColumnDiv, FeelsLike, Image, MainCard, Temperature } from './Slider.styles'
import { SliderProps } from './Slider.types'
import SunTime from './SunTime'

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
