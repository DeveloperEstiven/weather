import React from 'react'
import { Container } from '../../../styles/theme/globalStyle'
import { TelegramIcon } from '../../UI/icons/icons'
import { FooterInner, StyledFooter } from './Footer.styles'

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <FooterInner>
          <div>© 2022 Created by EstGonz</div>
          <a href='https://telegram.me/estgonz' target='_blank' rel='noreferrer'>
            <span>Telegram</span>
            <TelegramIcon />
          </a>
        </FooterInner>
      </Container>
    </StyledFooter>
  )
}

export default Footer
