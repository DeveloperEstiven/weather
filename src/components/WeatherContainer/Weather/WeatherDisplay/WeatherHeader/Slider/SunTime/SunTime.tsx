import React, { FC } from 'react'
import { timestampToDate } from '../../../../../../../utils/parseTimestamp'
import { StyledSpace } from './SunTime.styles'
import { SunTimeProps } from './SunTime.types'

const SunTime: FC<SunTimeProps> = ({ title, dt, timezone, Icon }) => {
  const { hours, minutes } = timestampToDate(dt, timezone)
  return (
    <StyledSpace direction='vertical'>
      <div>{title}</div>
      <Icon style={{ fontSize: '64px' }} />
      <div>{`${hours}:${minutes}`}</div>
    </StyledSpace>
  )
}

export default SunTime
