import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { weatherActions } from '../../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../../store/reducers/weather/weatherSelectors'
import { StyledDiv, StyledSpan, StyledSwitch } from './UnitsButtons.styles'

const UnitsButtons: FC = () => {
  const dispatch = useDispatch()
  // const [isCelsius, setIsCelsus] = useState(true)

  const { units } = useSelector(getWeatherList)

  const toggleUnit = (checked: boolean) => {
    if (checked) {
      dispatch(weatherActions.setUnits('fahrenheit'))
      localStorage.setItem('units', 'fahrenheit')
      // setIsCelsus(false)
    } else {
      dispatch(weatherActions.setUnits('celsius'))
      localStorage.setItem('units', 'celsius')
      // setIsCelsus(true)
    }
  }

  useEffect(() => {
    const localUnits = localStorage.getItem('units') as 'celsius' | 'fahrenheit' | null
    if (localUnits) {
      dispatch(weatherActions.setUnits(localUnits))
      // setIsCelsus(localUnits === 'celsius' ? true : false)
    } else dispatch(weatherActions.setUnits('celsius'))
  }, [dispatch]) //! dispatch

  return (
    <StyledDiv>
      <StyledSpan>°C</StyledSpan>
      <StyledSwitch onChange={toggleUnit} checked={units === 'fahrenheit'} />
      <StyledSpan>°F</StyledSpan>
    </StyledDiv>
  )
}

export default UnitsButtons
