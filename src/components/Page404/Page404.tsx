import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  font-size: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  line-height: 2em;
`

const Page404 = () => {
  return (
    <StyledPage>
      404 <br /> not found
    </StyledPage>
  )
}

export default Page404
