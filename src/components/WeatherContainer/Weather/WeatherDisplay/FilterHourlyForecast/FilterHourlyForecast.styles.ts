import { media } from './../../../../../styles/theme/globalStyle'
import styled from 'styled-components'

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
  ${media.md3} {
    padding-right: 12px;
  }
  .ant-select {
    border-radius: ${props => props.theme.borderRadius};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.backgroundPrimary};
  }
`
export const Arrow = styled.span`
  color: ${props => props.theme.colors.text};
`
