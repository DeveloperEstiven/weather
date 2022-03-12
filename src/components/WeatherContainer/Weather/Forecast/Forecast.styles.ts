import { media } from './../../../../styles/theme/globalStyle'
import { Collapse } from 'antd'
import styled from 'styled-components'

export const StyledCollapse = styled(Collapse)`
  background-color: ${props => props.theme.colors.backgroundMain};
  margin-bottom: 24px;
  .ant-collapse-content-box {
    padding: 24px 24px 8px 24px !important;
    ${media.md3} {
      padding: 12px 12px 0 12px !important;
    }
  }
  .ant-collapse-item {
    border-bottom: 0;
  }
`
export const ForecastTitle = styled.span`
  user-select: none;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  .anticon .anticon-right .ant-collapse-arrow {
    color: ${props => props.theme.colors.text};
    fill: ${props => props.theme.colors.text} !important;
  }
`

export const Arrow = styled.span`
  color: ${props => props.theme.colors.text};
`
