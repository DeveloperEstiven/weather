import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  font-size: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  line-height: 2em;
`

const Page404 = () => {
  return (
    <StyledPage>
      404 <br /> Not found
    </StyledPage>
  )
}

export default Page404
