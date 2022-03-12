import { DownOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { weatherActions } from '../../../../../store/reducers/weather/weatherActionCreators'
import { UnitTemp } from '../../../../../utils/convertTemperature'
import { Arrow, SelectWrapper } from './FilterHourlyForecast.styles'
import { filterUnitSymbols } from './FilterHourlyForecast.types'

const { Option } = Select

export type FilterOption = keyof typeof filterUnitSymbols
export type UnitSymbolT = typeof filterUnitSymbols[FilterOption]
export type UnitType = UnitTemp | UnitSymbolT

const FilterHourlyForecast: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [filterValue, setFilterValue] = useState<FilterOption | null>(null)

  useEffect(() => {
    const filterValue = (localStorage.getItem('filter') as FilterOption) || 'temp'
    dispatch(weatherActions.setSelectedFilter(filterValue))
    setFilterValue(filterValue)
  }, [dispatch])

  const onFilterSelect = (value: FilterOption) => {
    localStorage.setItem('filter', value)
    dispatch(weatherActions.setSelectedFilter(value))
    setFilterValue(value)
  }

  return (
    <div>
      {filterValue && (
        <SelectWrapper>
          <Select
            bordered={false}
            suffixIcon={
              <Arrow>
                <DownOutlined />
              </Arrow>
            }
            style={{ width: 150 }}
            defaultValue={filterValue}
            onChange={onFilterSelect}>
            {Object.keys(filterUnitSymbols).map(option => (
              <Option key={option} value={option}>
                {t(option)}
              </Option>
            ))}
          </Select>
        </SelectWrapper>
      )}
    </div>
  )
}

export default FilterHourlyForecast
