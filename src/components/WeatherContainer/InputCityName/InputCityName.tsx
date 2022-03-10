import { SearchOutlined } from '@ant-design/icons'
import { Alert, Button, message } from 'antd'
import React, { FC, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { CityResponse, WeatherResponse } from '../../../api/WeatherResponseTypes'
import useDebounce from '../../../hooks/useDebounce'
import { getCities, getCitiesByTerm, weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { getLanguageFromCookie } from '../../AppLayout/Menu/SelectLanguage/SelectLanguage'
import './InputCityName.scss'
import { Form, AutoComplete, Input, SubmitButton, FormItem } from 'formik-antd'
import { Formik, FormikHelpers } from 'formik'
import { DefaultOptionType } from 'antd/lib/select'

const Search = styled.div`
  padding-top: 20px;
`
const StyledAlert = styled(Alert)`
  margin-top: 20px;
`
const StyledInput = styled(Input)`
  background-color: ${props => props.theme.colors.backgroundMain};
  border-radius: ${props => props.theme.borderRadius};
  span,
  input {
    color: ${props => props.theme.colors.text} !important;
  }
`
const StyledAutocomplete = styled(AutoComplete)`
  width: 100%;
`
const StyledButton = styled(Button)`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  border: 0px;
  border-radius: 0;
`
type InputCityNameProps = {
  // inputRef: React.RefObject<Input>
}
const InputCityName: FC<InputCityNameProps> = memo(
  (
    {
      /* inputRef, */
    }
  ) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [form] = Form.useForm()
    const { t } = useTranslation()
    const { warning, isFetching, possibleCities, autocompleteResult } = useSelector(getWeatherList)
    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 1000)

    useEffect(() => {
      if (debouncedSearchTerm) {
        dispatch(getCitiesByTerm(debouncedSearchTerm))
      } else dispatch(weatherActions.warningReceived(''))
    }, [dispatch, debouncedSearchTerm])

    useEffect(() => {
      possibleCities.length > 1 && dispatch(weatherActions.setCurrentCity({} as CityResponse))
    }, [dispatch, possibleCities])

    const onFinish = (values: { autocomplete: string }, actions: FormikHelpers<{ autocomplete: string }>) => {
      const { autocomplete } = values
      console.log('values', values)

      if (autocomplete) {
        console.log('autocomplete', autocomplete)

        dispatch(weatherActions.weatherReceived({} as WeatherResponse))
        const code = getLanguageFromCookie()
        navigate(`/${code}`)
        dispatch(getCities(autocomplete, code))
      }
      actions.setSubmitting(false)
      actions.resetForm()
    }

    const onFinishFailed = () => message.error(t('search_failed'))

    return (
      <Search>
        <Formik
          onSubmit={onFinish}
          initialValues={{ autocomplete: '' }}
          render={() => (
            <Form>
              <AutoComplete
                name='autocomplete'
                placeholder='City Name'
                options={autocompleteResult as DefaultOptionType[]}
                style={{ width: '100%' }}
                value={value}
                onChange={setValue}
                // filterOption={(inputValue, option) =>
                //   option!.value?.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                // }
              />
              {/* <Input name='city' placeholder='City Name' /> */}
              {/* <SubmitButton /> */}
              {/* </AutoComplete> */}
              <SubmitButton>Submit</SubmitButton>
            </Form>
          )}
        />
      </Search>
    )
  }
)

export default InputCityName
// filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
// <StyledInput
//   ref={inputRef}
//   bordered={false}
//   size='large'
//   onMouseEnter={() => {
//     inputRef.current?.focus()
//   }}
//   allowClear
//   placeholder={t('input_placeholder')}
//   enterButton={
//     <StyledButton
//       type='primary'
//       onClick={() => onFinish({ city: value })}
//       htmlType='submit'
//       icon={<SearchOutlined />}
//       size='large'>
//       {t('search')}
//     </StyledButton>
//   }
//   disabled={isFetching ? true : false}
// />
// {warning && value ? <StyledAlert message={warning} type='warning' showIcon closable /> : null}
