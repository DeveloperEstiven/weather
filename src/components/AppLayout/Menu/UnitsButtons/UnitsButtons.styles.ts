import { Switch } from 'antd'
import styled from 'styled-components'

export const StyledSpan = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: 20px;
  line-height: 1;
`
export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`
export const StyledSwitch = styled(Switch)`
  margin: 0 15px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
  box-shadow: 0;
`
