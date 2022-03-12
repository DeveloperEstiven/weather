import { Divider } from 'antd'
import styled from 'styled-components'

export const CityNameText = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
`

export const StyledDivider = styled(Divider)`
  color: ${props => props.theme.colors.text};
  &::after,
  &::before {
    border-top: 2px solid ${props => props.theme.colors.text} !important;
  }
`
