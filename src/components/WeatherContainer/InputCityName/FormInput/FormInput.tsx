import { message } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { Form } from 'formik-antd'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlexedDiv, StyledAutoComplete, StyledButton } from './FormInput.styles'
import { FormInputProps } from './FormInput.types'

message.config({
  duration: 1,
  maxCount: 1,
})

const FormInput: FC<FormInputProps> = ({ autocompleteResult, value, setValue, errors, touched }) => {
  const { t } = useTranslation()

  useEffect(() => {
    errors.autocomplete && touched.autocomplete && message.error(errors.autocomplete)
  }, [errors, touched.autocomplete]) //! touched.autocomplete

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
export default FormInput
