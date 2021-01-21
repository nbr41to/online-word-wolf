import React from 'react'
import { useRecoilValue } from 'recoil'
import { room, user } from '../../recoil/atom'
import { firebase } from 'src/firebase'
import { Button } from '../Button'
import styled from 'styled-components'
import { UserIcon } from '../users/UserIcon'
import { Name } from '../users/Name'

type GameBoardProps = {

}

export const GameBoard: React.FC<GameBoardProps> = () => {
  const roomInfo = useRecoilValue(room)
  const userInfo = useRecoilValue(user)
  const playlerInfo = roomInfo.member[userInfo.id]
  const playlerIds = Object.keys(roomInfo.member)
  const gameFinish = () => {
    firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      finished: true
    })
  }

  React.useEffect(() => {
    console.log('gameBoard!!')
  })
  const vote = (userId: string): void => {
    firebase.firestore().collection("rooms").doc(roomInfo.roomId).update({
      [`member.${userId}.votes`]: firebase.firestore.FieldValue.arrayUnion(userInfo.id)
    })
  }
  return (
    <div className='box flex column center'>
      <div>あなたのお題</div>
      <div>{playlerInfo.theme}</div>
      <div>残り時間</div>
      <div>{ }</div>
      <div className='box flex column center'>
        <div>投票</div>
        {Object.keys(roomInfo.member).map((id, index) => <Button label={roomInfo.member[id].name} onClick={() => vote(id)} />)}
      </div>
      {playlerIds.length === playlerIds.map(id => {
        if (roomInfo.member[id].voted)
          return id
      }).length &&
        <div className='box flex column center'>
          <div>結果発表</div>
          {playlerIds.map((id, index) =>
            <StyledPlayerPlate className='m-8 flex' key={index}>
              <UserIcon size={50} icon={roomInfo.member[id].icon} />
              <Name className='ml-16' name={roomInfo.member[id].name} />
              <div className='ml-8'>{roomInfo.member[id].votes.length}票</div>
            </StyledPlayerPlate>)}
          <div></div>
        </div>
      }
      <Button label='終了する' onClick={gameFinish} />
    </div>
  )
}

const StyledPlayerPlate = styled.div`
  border: 2px solid #333;
  border-radius: 12px;
  align-items: center;
  padding: 8px;
`
