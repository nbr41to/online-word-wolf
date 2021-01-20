import React from 'react'
import { useRecoilValue } from 'recoil'
import { room } from 'src/recoil/atom'
import { Button } from '../Button'
import Clipboard from 'react-clipboard.js'
import styled from 'styled-components'

export const InviteCode = () => {
  const roomInfo = useRecoilValue(room)
  return (
    <div className='box flex between mb-8'>
      <div>招待コード</div>
      <StyledInviteCode>{roomInfo.inviteCode}</StyledInviteCode>
      <Clipboard data-clipboard-text={roomInfo.inviteCode}>
        <Button label='copy' size='small' onClick={() => { }} />
      </Clipboard>
    </div>
  )
}

const StyledInviteCode = styled.div`
  font-size: ${({ theme }) => theme.fonts.large};
`
