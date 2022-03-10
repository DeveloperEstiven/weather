import { DownOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { weatherActions } from '../../../../../store/reducers/weather/weatherActionCreators'
import { UnitTemp } from '../../../../../utils/convertTemperature'
import './FilterHourlyForecast.scss'
import { filterUnitSymbols } from './FilterHourlyForecast.types'

const { Option } = Select

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
  //? Landscape tablets and medium desktops //! < 480px
  @media (max-width: 767px) {
    padding-right: 12px;
  }
  .ant-select {
    border-radius: ${props => props.theme.borderRadius};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.backgroundPrimary};
  }
`
const Arrow = styled.span`
  color: ${props => props.theme.colors.text};
`

export type FilterOption = keyof typeof filterUnitSymbols
export type UnitSymbolT = typeof filterUnitSymbols[FilterOption]
export type UnitType = UnitTemp | UnitSymbolT

const FilterHourlyForecast: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const onFilterSelect = (value: FilterOption) => dispatch(weatherActions.setSelectedFilter(value))
  return (
    <SelectWrapper>
      <Select
        bordered={false}
        suffixIcon={
          <Arrow>
            <DownOutlined />
          </Arrow>
        }
        style={{ width: 150 }}
        defaultValue='temp'
        onChange={onFilterSelect}>
        {Object.keys(filterUnitSymbols).map(option => (
          <Option key={option} value={option}>
            {t(option)}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  )
}

export default FilterHourlyForecast
