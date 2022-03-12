import { media } from './../../../../../../styles/theme/globalStyle'
import styled from 'styled-components'

export const MainCard = styled.div`
  background: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  display: flex;
  font-size: 16px;
  line-height: 1em;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  overflow-wrap: break-word;
  border-radius: ${props => props.theme.borderRadius};
  padding: 20px;
  margin-bottom: 16px;
`

export const ColumnDiv = styled.div`
  display: flex;
  flex-basis: 33.33333%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Temperature = styled.div`
  font-size: 45px;
  line-height: 1em;
  font-weight: bold;
  margin-bottom: 10px;
  ${media.md3} {
    font-size: 32px;
  }
`
export const FeelsLike = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
`
export const Image = styled.div`
  img {
    height: 100px;
    width: 100px;
  }
`
