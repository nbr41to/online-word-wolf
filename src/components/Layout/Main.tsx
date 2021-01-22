import React from 'react'
import styled from 'styled-components'

export const Main = ({ children }) => {
  return (
    <StyledMain>
      {children}
    </StyledMain>
  )
}

const StyledMain = styled.div`
  width: 100%;
  padding: 8px;
  margin-bottom:34px;
`
