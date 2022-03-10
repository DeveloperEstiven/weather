import { Space } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components'
import { timestampToDate } from '../../../../../../utils/parseTimestamp'
import { ClockCircleOutlined } from '@ant-design/icons'

import './Header.scss'
import { useTranslation } from 'react-i18next'

const StyledHeader = styled.div<{ istoday: boolean }>`
  display: flex;
  justify-content: ${props => (props.istoday ? 'space-between' : 'center')};
  margin-bottom: ${props => (props.istoday ? '24px' : '12px')};
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`

type HeaderType = {
  dt: number
  timezone: string
}

const Header: FC<HeaderType> = ({ dt, timezone }) => {
  const { t } = useTranslation()
  const { date, month, weekDay, hours, minutes } = timestampToDate(dt, timezone)
  const currentDate = new Date().getDate()
  const isToday = date === currentDate

  return (
    <StyledHeader istoday={isToday}>
      <span>
        {date} {t(month.full).toLowerCase()}, {t(weekDay.full).toLowerCase()}
      </span>
      {isToday && (
        <span>
          {t('update_time')}:{' '}
          <strong>
            {hours}:{minutes} <ClockCircleOutlined />
          </strong>
        </span>
      )}
    </StyledHeader>
  )
}

export default Header
