import { Button, Drawer, Space, Switch } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { weatherActions } from '../../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../../store/reducers/weather/weatherSelectors'

const StyledSpan = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: 20px;
  line-height: 1;
`
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`
const StyledSwitch = styled(Switch)`
  margin: 0 15px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
  box-shadow: 0;
`

type UnitsButtonsProps = {}

const UnitsButtons: FC<UnitsButtonsProps> = ({}) => {
  const dispatch = useDispatch()
  const [isCelsius, setIsCelsus] = useState(true)

  const { units } = useSelector(getWeatherList)

  const toggleUnit = (checked: boolean) => {
    if (checked) {
      dispatch(weatherActions.setUnits('fahrenheit'))
      localStorage.setItem('units', 'fahrenheit')
      setIsCelsus(false)
    } else {
      dispatch(weatherActions.setUnits('celsius'))
      localStorage.setItem('units', 'celsius')
      setIsCelsus(true)
    }
  }

  // const onSetFahrenheit = () => {
  //   if (units !== 'fahrenheit') {
  //     dispatch(weatherActions.setUnits('fahrenheit'))
  //     localStorage.setItem('units', 'fahrenheit')
  //     setIsCelsus(false)
  //   }
  // }
  // const onSetCelsius = () => {
  //   if (units !== 'celsius') {
  //     dispatch(weatherActions.setUnits('celsius'))
  //     localStorage.setItem('units', 'celsius')
  //     setIsCelsus(true)
  //   }
  // }

  useEffect(() => {
    const localUnits = localStorage.getItem('units') as 'celsius' | 'fahrenheit' | null
    if (localUnits) {
      dispatch(weatherActions.setUnits(localUnits))
      setIsCelsus(localUnits === 'celsius' ? true : false)
    } else dispatch(weatherActions.setUnits('celsius'))
  }, [])

  return (
    <StyledDiv>
      <StyledSpan>°C</StyledSpan>
      <StyledSwitch onChange={toggleUnit} checked={units === 'fahrenheit'} />
      <StyledSpan>°F</StyledSpan>
    </StyledDiv>
  )
}

export default UnitsButtons
