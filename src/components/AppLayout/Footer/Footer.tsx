import React from 'react'
import styled from 'styled-components'
import { media } from '../../../styles/theme/globalStyle'
import { TelegramIcon } from '../../UI/icons/icons'
import './Footer.scss'

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  text-align: center;
  /* min-height: 50px; */
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  a {
    display: flex;
    align-items: center;
    transition: color 0.3s ease 0s;
    ${media.md3} {
      margin-top: 5px;
    }
    svg {
      margin-left: 20px;
      fill: #fff;
      font-size: 24px;
      cursor: pointer;
      transition: fill 0.3s ease 0s;
      ${media.md3} {
        margin-left: 5px;
      }
    }
    &:hover {
      color: ${props => props.theme.colors.body};
      svg {
        fill: ${props => props.theme.colors.body};
      }
    }
  }
`

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.md3} {
    flex-direction: column;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div className='container'>
        <FooterInner>
          <div>© 2022 Created by EstGonz</div>
          <a href='https://telegram.me/estgonz' target='_blank'>
            <span>Telegram</span>
            <TelegramIcon />
          </a>
        </FooterInner>
      </div>
    </StyledFooter>
  )
}

export default Footer
