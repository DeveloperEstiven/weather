import { Col } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { toCurrentUnit } from '../../../../../../../utils/convertTemperature'
import {
  CloudsIcon,
  DewPointIcon,
  E,
  ENE,
  ESE,
  HumidityIcon,
  N,
  NE,
  NNE,
  NNW,
  NW,
  PressureIcon,
  S,
  SE,
  SSE,
  SSW,
  SW,
  UviIcon,
  VisibilityIcon,
  W,
  WindIcon,
  WNW,
  WSW,
} from '../../../../../../UI/icons/icons'
import { commonUnitSymbols } from '../../../FilterHourlyForecast/FilterHourlyForecast.types'
import { CardItem } from './ColumnItem.styles'
import { ColumnItemProps } from './ColumnItem.types'

const windDirection = (deg: number, fontSize: string) => {
  const compassSector = [
    <N style={{ fontSize }} />,
    <NNE style={{ fontSize }} />,
    <NE style={{ fontSize }} />,
    <ENE style={{ fontSize }} />,
    <E style={{ fontSize }} />,
    <ESE style={{ fontSize }} />,
    <SE style={{ fontSize }} />,
    <SSE style={{ fontSize }} />,
    <S style={{ fontSize }} />,
    <SSW style={{ fontSize }} />,
    <SW style={{ fontSize }} />,
    <WSW style={{ fontSize }} />,
    <W style={{ fontSize }} />,
    <WNW style={{ fontSize }} />,
    <NW style={{ fontSize }} />,
    <NNW style={{ fontSize }} />,
    <N style={{ fontSize }} />,
  ]
  return compassSector[+(deg / 22.5).toFixed(0)]
}

const getIcon = (key: keyof typeof commonUnitSymbols, fontSize: string, wind_deg: number | null) => {
  const icons = {
    pressure: <PressureIcon style={{ fontSize }} />,
    humidity: <HumidityIcon style={{ fontSize }} />,
    wind_speed: (
      <div>
        <WindIcon style={{ fontSize }} /> {wind_deg && windDirection(wind_deg, fontSize)}
      </div>
    ),
    dew_point: <DewPointIcon style={{ fontSize }} />,
    uvi: <UviIcon style={{ fontSize }} />,
    clouds: <CloudsIcon style={{ fontSize }} />,
    visibility: <VisibilityIcon style={{ fontSize }} />,
  }
  return icons[key]
}

export const ColumnItem: FC<ColumnItemProps> = ({ weather, title, unit }) => {
  const { t } = useTranslation()
  const wind_deg = title === 'wind_speed' ? weather.wind_deg : null
  const isCelsius = unit === '°C' ? true : false
  return (
    <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
      <CardItem>
        <div>{t(title)}</div>
        <div>{getIcon(title, '32px', wind_deg)}</div>
        <strong>
          {unit ? toCurrentUnit(weather[title], isCelsius) : weather[title]}
          {unit ? unit : t(commonUnitSymbols[title])}
        </strong>
      </CardItem>
    </Col>
  )
}

export default ColumnItem
