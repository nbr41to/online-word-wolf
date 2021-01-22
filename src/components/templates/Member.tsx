import React from 'react'
import { room, user } from 'src/recoil/atom'
import { useRecoilValue } from 'recoil'
import { UserIcon } from '../users/UserIcon'
import { Name } from '../users/Name'
import styled from 'styled-components'

export const Member = () => {
  const userInfo = useRecoilValue(user)
  const roomInfo = useRecoilValue(room)
  const member = roomInfo?.member
  return (
    <div className='box mb-8'>
      <div>この部屋にいる人</div>
      {member && Object.values(member).map((player, index) =>
        <StyledPlayerPlate className='m-8 flex' key={index}>
          <UserIcon size={50} icon={player.icon} />
          <Name className='ml-16' name={player.name} />
          {player.isReady && <div className='ml-8'>ready</div>}
        </StyledPlayerPlate>
      )}
    </div>
  )
}

const StyledPlayerPlate = styled.div`
  border: 2px solid #333;
  border-radius: 12px;
  align-items: center;
  padding: 8px;
`
