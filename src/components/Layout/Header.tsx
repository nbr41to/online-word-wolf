import React from 'react'
import styled from 'styled-components'

export const Header = () => {
  return (
    <StyledHeader className='flex center'>
      <h1>Online Word Wolf</h1>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  background-color: #00AD9F;
  padding: 8px 0;
`
