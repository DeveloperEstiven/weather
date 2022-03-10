import React, { FC } from 'react'
import './Preloader.scss'

type PreloaderT = {
  color?: string
}

const Preloader: FC<PreloaderT> = ({ color }) => {
  return (
    <div className='lds-ellipsis__container'>
      <div className='lds-ellipsis'>
        <div style={color ? { background: color } : {}}></div>
        <div style={color ? { background: color } : {}}></div>
        <div style={color ? { background: color } : {}}></div>
        <div style={color ? { background: color } : {}}></div>
      </div>
    </div>
  )
}

export default Preloader
