import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { room } from '../../recoil/atom'

export const Footer = () => {
  const roomInfo = useRecoilValue(room)
  return (
    <StyledFooter className='flex center'>
      {roomInfo.finished ?
        <div>Thank you for playing!!</div>
        :
        <div className='flex center'><span>©</span>2021 nob</div>
      }
    </StyledFooter>
  )
}

const StyledFooter = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.color};
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  span {
    font-size: 24px;
    margin-right:  4px;
  }
`
