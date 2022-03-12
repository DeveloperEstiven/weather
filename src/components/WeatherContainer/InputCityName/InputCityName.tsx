import { Formik, FormikHelpers } from 'formik'
import React, { FC, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import { CityResponse, WeatherResponse } from '../../../api/WeatherResponseTypes'
import useDebounce from '../../../hooks/useDebounce'
import { getCities, getCitiesByTerm, weatherActions } from '../../../store/reducers/weather/weatherActionCreators'
import { getWeatherList } from '../../../store/reducers/weather/weatherSelectors'
import { getLanguageFromCookie } from '../../AppLayout/Menu/SelectLanguage/SelectLanguage'
import FormInput from './FormInput'
import { Search } from './InputCityName.styles'

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

export default InputCityName
