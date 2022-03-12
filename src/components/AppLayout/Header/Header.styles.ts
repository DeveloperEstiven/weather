import { Typography, Space } from 'antd'
import styled from 'styled-components'

export const StyledText = styled(Typography.Text)`
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  letter-spacing: 0.1em;
`

export const CenteredSpace = styled(Space)`
  div {
    display: flex;
    align-items: center;
  }
`
export const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  height: 50px;
  line-height: 1;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  &.calc {
    background-color: ${props => props.theme.colors.backgroundPrimary};
    width: calc(100% - 17px);
  }
`

export const HeaderInner = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const IconWrapper = styled.div`
  color: ${props => props.theme.colors.backgroundPrimary};
  border-color: ${props => props.theme.colors.backgroundSecondary} !important;
`
