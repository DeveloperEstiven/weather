import { media } from './../../../styles/theme/globalStyle'
import styled from 'styled-components'

export const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  text-align: center;
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
      fill: ${props => props.theme.colors.text};
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

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.md3} {
    flex-direction: column;
  }
`
