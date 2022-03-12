import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledUl } from './Menu.styles'
import { MenuProps } from './Menu.types'
import SelectLanguage from './SelectLanguage'
import ToggleTheme from './ToggleTheme'
import UnitsButtons from './UnitsButtons'

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
