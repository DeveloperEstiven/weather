import { Divider } from 'antd'
import styled from 'styled-components'

export const SelectCityContainer = styled.div`
  margin-top: 20px;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  padding: 20px;
`

export const StyledUl = styled.ul`
  margin-bottom: 0;
  li {
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 5px;
    cursor: pointer;
    margin-left: 18px;
    transition: background-color 0.3s ease 0s;
    &:first-child {
      margin-top: 0;
    }
    &:hover {
      background-color: ${props => props.theme.colors.backgroundSecondary};
    }
  }
`
export const StyledDivider = styled(Divider)`
  height: 2px;
  background-color: #fff;
  margin: 20px 0;
`
export const SelectCityTitle = styled.h2`
  margin-bottom: 0;
  color: inherit;
  font-size: 16px;
  display: flex;
  position: relative;
  p {
    margin-left: 20px;
    margin-bottom: 0;
  }
`
