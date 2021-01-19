import React from 'react'
import styled from 'styled-components'
type NameProps = {
  name: string
}
export const Name: React.FC<NameProps> = ({ name }) => {
  return (
    <StyledNamePlate>
      <div>おなまえ：</div>
      <div>{name}</div>
    </StyledNamePlate>
  )
}

const StyledNamePlate = styled.div`
  font-size: ${({ theme }) => theme.fonts.large};
`