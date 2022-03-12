import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appActions } from '../../../../store/reducers/app/appActionCreators'
import { AppTheme } from '../../../../store/reducers/app/appReducer'
import { getAppTheme } from '../../../../store/reducers/app/appSelectors'
import { DarkIcon, LightIcon } from '../../../UI/icons/icons'
import { StyledDiv } from './ToggleTheme.styles'

const ToggleTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(getAppTheme)

  // const changeMode = (mode: AppTheme) => {
  //   localStorage.setItem('theme', mode)
  //   dispatch(appActions.setTheme(mode))
  // }

  const changeMode = useCallback(
    (mode: AppTheme) => {
      localStorage.setItem('theme', mode)
      dispatch(appActions.setTheme(mode))
    },
    [dispatch]
  )

  const toggleTheme = () => {
    theme === 'dark' ? changeMode('light') : changeMode('dark')
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as AppTheme | null
    if (localTheme) {
      dispatch(appActions.setTheme(localTheme))
    } else changeMode('dark')
  }, [changeMode, dispatch]) //! changeMode, dispatch

  return (
    <StyledDiv onClick={toggleTheme}>
      {theme === 'dark' ? <DarkIcon style={{ fontSize: 64 }} /> : <LightIcon style={{ fontSize: 64 }} />}
    </StyledDiv>
  )
}

export default ToggleTheme
