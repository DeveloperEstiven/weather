import { ClockCircleOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { timestampToDate } from '../../../../../../utils/parseTimestamp'
import { StyledHeader, StyledSpan } from './Header.styles'

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
        <StyledSpan>
          {t('update_time')}:{' '}
          <strong>
            {hours}:{minutes} <ClockCircleOutlined />
          </strong>
        </StyledSpan>
      )}
    </StyledHeader>
  )
}

export default Header
