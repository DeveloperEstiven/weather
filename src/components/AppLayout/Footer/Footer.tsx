import React from 'react'
import { TelegramIcon } from '../../UI/icons/icons'
import { FooterInner, StyledFooter } from './Footer.styles'

const Footer = () => {
  return (
    <StyledFooter>
      <div className='container'>
        <FooterInner>
          <div>© 2022 Created by EstGonz</div>
          <a href='https://telegram.me/estgonz' target='_blank' rel='noreferrer'>
            <span>Telegram</span>
            <TelegramIcon />
          </a>
        </FooterInner>
      </div>
    </StyledFooter>
  )
}

export default Footer
