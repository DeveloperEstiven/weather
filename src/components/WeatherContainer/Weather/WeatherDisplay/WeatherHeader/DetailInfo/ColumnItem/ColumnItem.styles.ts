import styled from 'styled-components'

export const CardItem = styled.div`
  background: ${props => props.theme.colors.backgroundPrimary};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius};
  padding: 10px;
  div {
    margin-bottom: 5px;
  }
`
