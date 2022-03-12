import { FormikErrors } from 'formik'
import { AutocompleteResult } from '../../../../api/geocoderAPI/geocoderAPI.types'

export type FormInputProps = {
  errors: FormikErrors<{ autocomplete: string }>
  autocompleteResult: AutocompleteResult
  value: string
  setValue: (value: string) => void
}
