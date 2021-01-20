import React from 'react'
import styled from 'styled-components'
type NameProps = {
  className?: string
  name: string
  label?: boolean
}
export const Name: React.FC<NameProps> = ({ name, label = false, className }) => {
  return (
    <StyledNamePlate className={className}>
      {label && <div>おなまえ：</div>}
      <div>{name}</div>
    </StyledNamePlate>
  )
}

const StyledNamePlate = styled.div`
  font-size: ${({ theme }) => theme.fonts.large};
`