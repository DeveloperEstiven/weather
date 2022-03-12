import { FormikErrors, FormikTouched } from 'formik'
import { AutocompleteResult } from '../../../../api/geocoderAPI/geocoderAPI.types'

export type FormInputProps = {
  errors: FormikErrors<{ autocomplete: string }>
  touched: FormikTouched<{ autocomplete: string }>
  autocompleteResult: AutocompleteResult
  value: string
  setValue: (value: string) => void
}
