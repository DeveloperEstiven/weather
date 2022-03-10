import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Drawer, Space } from 'antd'
import React, { FC } from 'react'
import './Menu.scss'
import SelectLanguage from './SelectLanguage'
import ToggleTheme from './ToggleTheme'
import UnitsButtons from './UnitsButtons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

type MenuProps = {
  visible: boolean
  onClose: () => void
}

const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  li {
    margin-bottom: 20px;
  }
`

const Menu: FC<MenuProps> = ({ visible, onClose }) => {
  const { t } = useTranslation()
  return (
    <Drawer
      forceRender={true}
      closeIcon={<MenuUnfoldOutlined style={{ color: '#000' }} />}
      width={250}
      title={t('menu')}
      placement='right'
      onClose={onClose}
      visible={visible}>
      <StyledUl>
        <li>
          <ToggleTheme />
        </li>
        <li>
          <UnitsButtons />
        </li>
        <li>
          <SelectLanguage />
        </li>
      </StyledUl>
    </Drawer>
  )
}

export default Menu
