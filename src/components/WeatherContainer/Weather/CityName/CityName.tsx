import React, { FC } from 'react'
import './CityName.scss'
import { Breadcrumb, Divider } from 'antd'
import { CityResponse } from '../../../../api/WeatherResponseTypes'
import styled from 'styled-components'

type CityNameProps = {
  city: CityResponse
}

const CityNameText = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
`

const StyledDivider = styled(Divider)`
  color: ${props => props.theme.colors.text};
  &::after,
  &::before {
    border-top: 2px solid ${props => props.theme.colors.text} !important;
  }
`

const CityName: FC<CityNameProps> = ({ city }) => {
  return (
    <StyledDivider>
      <CityNameText>{[city.country, city.state, city.name].filter(place => place).join(', ')}</CityNameText>
    </StyledDivider>
  )
}

export default CityName
