import styled from 'styled-components'
import { media } from '../../../../../../styles/theme/globalStyle'

export const StyledHeader = styled.div<{ istoday: boolean }>`
  display: flex;
  justify-content: ${props => (props.istoday ? 'space-between' : 'center')};
  margin-bottom: ${props => (props.istoday ? '24px' : '12px')};
  ${media.md4} {
    flex-direction: column;
    text-align: center;
  }
`

export const StyledSpan = styled.span`
  ${media.md3} {
    margin-top: 10px;
  }
`
