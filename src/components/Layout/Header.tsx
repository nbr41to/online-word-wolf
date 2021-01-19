import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const Header = () => {
  const router = useRouter()
  return (
    <StyledHeader className='flex center'>
      <div
        className='mr-16'
        onClick={() => router.push('/')}
      >
        Online Word Wolf</div>
      <Image src='/animal-white.png' width={40} height={40} />
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.color};
  padding: 8px 0;
  &:hover {
    cursor: pointer;
  }
`
