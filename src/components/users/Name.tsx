import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { user } from '../../recoil/atom'
type NameProps = {
  className?: string
  name: string
  label?: boolean
}
export const Name: React.FC<NameProps> = ({ name, label = false, className }) => {
  const userInfo = useRecoilValue(user)
  return (
    <StyledNamePlate className={className} isOwn={name === userInfo.name}>
      {label && <div>おなまえ：</div>}
      <div className='name'>{name}</div>
    </StyledNamePlate>
  )
}

const StyledNamePlate = styled.div<{ isOwn: boolean }>`
  font-size: ${({ theme }) => theme.fonts.large};
  .name {
    color: ${(props) => props.isOwn ? 'tomato' : ''}
  }
`
