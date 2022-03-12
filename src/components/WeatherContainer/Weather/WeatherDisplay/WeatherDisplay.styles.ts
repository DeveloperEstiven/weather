import { media } from './../../../../styles/theme/globalStyle'
import styled from 'styled-components'

export const ChartWrapper = styled.div`
  padding: 24px 0;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundMain};
  ${media.md3} {
    padding: 12px 0;
  }
`
