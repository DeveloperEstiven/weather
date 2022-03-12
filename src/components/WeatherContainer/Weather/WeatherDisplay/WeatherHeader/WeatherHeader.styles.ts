import { media } from './../../../../../styles/theme/globalStyle'
import styled from 'styled-components'

export const WeatherCards = styled.div`
  background: ${props => props.theme.colors.backgroundMain};
  color: #333;
  border-radius: ${props => props.theme.borderRadius};
  padding: 24px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.text};

  svg {
    fill: ${props => props.theme.colors.text};
  }

  ${media.md3} {
    padding: 24px 12px 12px;
  }
`
