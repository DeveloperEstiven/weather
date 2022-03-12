import styled from 'styled-components'

export const StyledDiv = styled.div`
  height: 400px;
  border-radius: ${props => props.theme.borderRadius};
  width: 100%;
  position: relative;
  overflow: hidden;
  fill: ${props => props.theme.colors.text} !important;
`
