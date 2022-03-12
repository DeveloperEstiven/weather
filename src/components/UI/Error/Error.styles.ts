import { Result } from 'antd'
import styled from 'styled-components'

export const StyledError = styled(Result)`
  margin-top: 50px;
  div {
    color: ${props => props.theme.colors.text};
  }
`
