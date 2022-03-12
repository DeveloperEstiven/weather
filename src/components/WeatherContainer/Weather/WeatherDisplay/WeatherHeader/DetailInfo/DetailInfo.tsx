import { Row } from 'antd'
import React, { FC } from 'react'
import { commonUnitSymbols } from '../../FilterHourlyForecast/FilterHourlyForecast.types'
import ColumnItem from './ColumnItem'
import { DetailInfoProps } from './DetailInfo.types'

const gutter = { xs: 4, sm: 8, md: 8, lg: 16 }

const DetailInfo: FC<DetailInfoProps> = ({ weather, unit }) => {
  const titles: (keyof typeof commonUnitSymbols)[] = ['pressure', 'humidity', 'wind_speed', 'dew_point', 'uvi', 'clouds']

  return (
    <Row gutter={[gutter, gutter]} style={{ height: '100%' }}>
      {titles.map(title => (
        <ColumnItem key={title} weather={weather} title={title} unit={title === 'dew_point' ? unit : undefined} />
      ))}
    </Row>
  )
}

export default DetailInfo
