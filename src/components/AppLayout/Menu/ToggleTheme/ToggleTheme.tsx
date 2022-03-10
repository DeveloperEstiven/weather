import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appActions } from '../../../../store/reducers/app/appActionCreators'
import { AppTheme } from '../../../../store/reducers/app/appReducer'
import { getAppTheme } from '../../../../store/reducers/app/appSelectors'
import { DarkIcon, LightIcon } from '../../../UI/icons/icons'
import './ToggleTheme.scss'

const ToggleTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(getAppTheme)

  const changeMode = (mode: AppTheme) => {
    localStorage.setItem('theme', mode)
    dispatch(appActions.setTheme(mode))
  }

  const toggleTheme = () => {
    theme === 'dark' ? changeMode('light') : changeMode('dark')
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as AppTheme | null
    if (localTheme) {
      dispatch(appActions.setTheme(localTheme))
    } else changeMode('dark')
  }, [])

  return (
    <div onClick={toggleTheme} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      {theme === 'dark' ? <DarkIcon style={{ fontSize: 64 }} /> : <LightIcon style={{ fontSize: 64 }} />}
    </div>
  )
}

export default ToggleTheme
