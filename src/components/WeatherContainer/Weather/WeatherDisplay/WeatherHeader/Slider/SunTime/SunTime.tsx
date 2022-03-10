import { Space } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components'
import { timestampToDate } from '../../../../../../../utils/parseTimestamp'
import './SunTime.scss'

type SunTimeProps = {
  title: string
  dt: number
  timezone: string
  Icon: (props: any) => JSX.Element
}

const StyledSpace = styled(Space)`
  flex-basis: 33.33333%;
`

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
