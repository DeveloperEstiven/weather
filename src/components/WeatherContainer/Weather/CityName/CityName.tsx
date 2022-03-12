import React, { FC } from 'react'
import { CityNameText, StyledDivider } from './CityName.styles'
import { CityNameProps } from './CityName.types'

const CityName: FC<CityNameProps> = ({ city }) => {
  return (
    <StyledDivider>
      <CityNameText>{[city.country, city.state, city.name].filter(place => place).join(', ')}</CityNameText>
    </StyledDivider>
  )
}

export default CityName
