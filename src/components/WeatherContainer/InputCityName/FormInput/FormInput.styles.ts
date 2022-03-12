import { AutoComplete, SubmitButton } from 'formik-antd'
import styled from 'styled-components'

export const StyledButton = styled(SubmitButton)`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  color: ${props => props.theme.colors.text};
  border: 0px;
  border-radius: 0;
  margin-left: 10px;
  border-radius: 2px;
`

export const FlexedDiv = styled.div`
  display: flex;
`

export const StyledAutoComplete = styled(AutoComplete)`
  background-color: ${props => props.theme.colors.backgroundMain};
  font-size: 16px;
`
