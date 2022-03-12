import { message } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from 'formik'
import { AutoComplete, Form, SubmitButton } from 'formik-antd'
import React, { FC, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import * as Yup from 'yup'
import { AutocompleteResult } from '../../../api/geocoderAPI'
import { CityResponse, WeatherResponse } from '../../../api/WeatherResponseTypes'
import useDebounce from '../../../hooks/useDebounce'
import { getCities, getCitiesByTerm, weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { getLanguageFromCookie } from '../../AppLayout/Menu/SelectLanguage/SelectLanguage'
import './InputCityName.scss'

const Search = styled.div`
  padding-top: 20px;
`

const StyledButton = styled(SubmitButton)`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  border: 0px;
  border-radius: 0;
  margin-left: 10px;
  border-radius: 2px;
`

const FlexedDiv = styled.div`
  display: flex;
`

const StyledAutoComplete = styled(AutoComplete)`
  background-color: ${props => props.theme.colors.backgroundMain};
  font-size: 16px;
`

message.config({
  duration: 1,
  maxCount: 1,
})

const InputCityName: FC = memo(() => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { possibleCities, autocompleteResult } = useSelector(getWeatherList)
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

  const validationSchema = Yup.object({
    autocomplete: Yup.string()
      .min(2, t('min_input', { symbols: '2' }))
      .max(35, t('max_input', { symbols: '35' }))
      .required(t('required_input')),
  })

  const onFinish = (values: { autocomplete: string }, actions: FormikHelpers<{ autocomplete: string }>) => {
    const { autocomplete } = values

    if (autocomplete) {
      dispatch(weatherActions.weatherReceived({} as WeatherResponse))
      const code = getLanguageFromCookie()
      navigate(`/${code}`)
      dispatch(getCities(autocomplete, code))
    }

    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Search>
      <Formik onSubmit={onFinish} validationSchema={validationSchema} initialValues={{ autocomplete: '' }}>
        {({ errors, touched }) => (
          <FormInput
            errors={errors}
            touched={touched}
            autocompleteResult={autocompleteResult}
            value={value}
            setValue={setValue}
          />
        )}
      </Formik>
    </Search>
  )
})

type FormInputProps = {
  errors: FormikErrors<{ autocomplete: string }>
  touched: FormikTouched<{ autocomplete: string }>
  autocompleteResult: AutocompleteResult
  value: string
  setValue: (value: string) => void
}

const FormInput: FC<FormInputProps> = ({ autocompleteResult, value, setValue, errors, touched }) => {
  const { t } = useTranslation()

  useEffect(() => {
    errors.autocomplete && touched.autocomplete && message.error(errors.autocomplete)
  }, [errors])

  return (
    <Form>
      <FlexedDiv>
        <StyledAutoComplete
          name='autocomplete'
          placeholder={t('city_name')}
          options={autocompleteResult as DefaultOptionType[]}
          style={{ width: '100%' }}
          value={value}
          onChange={setValue}
        />
        <StyledButton>{t('search')}</StyledButton>
      </FlexedDiv>
    </Form>
  )
}

export default InputCityName
