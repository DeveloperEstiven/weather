import { Badge, Card, Tooltip } from 'antd'
import styled, { css } from 'styled-components'

export const Image = styled.div`
  user-select: none;
  img {
    height: 100px;
    width: 100px;
  }
`

export const StyledCard = styled(Card)<{ active: number }>`
  text-align: center;
  background: ${props => props.theme.colors.backgroundPrimary};
  border-color: ${props => props.theme.colors.backgroundMain};
  ${props =>
    props.active &&
    css`
      background: ${props => props.theme.colors.backgroundSecondary};
    `};
`

export const StyledText = styled.div`
  color: ${props => props.theme.colors.text};
  span {
    color: ${props => props.theme.colors.text};
  }
`

export const MyBadge = styled(Badge.Ribbon)`
  color: ${props => props.theme.colors.backgroundBadge};
  background: ${props => props.theme.colors.backgroundBadge};
  span {
    color: ${props => props.theme.colors.text};
  }
`
export const StyledTooltip = styled(Tooltip)`
  color: ${props => props.theme.colors.backgroundBadge};
  span {
    color: ${props => props.theme.colors.text};
  }
`
