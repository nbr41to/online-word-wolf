import React from 'react'
import { useRecoilValue } from 'recoil'
import { room } from '../../recoil/atom'
import { firebase } from 'src/firebase'
import { Button } from '../Button'

type GameBoardProps = {

}

export const GameBoard: React.FC<GameBoardProps> = () => {
  const roomInfo = useRecoilValue(room)
  const gameFinish = () => {
    firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      finished: true
    })
  }
  return (
    <div className='box'>
      <div>あなたのお題</div>
      <div>{ }</div>
      <div>残り時間</div>
      <div>{ }</div>
      <div>投票</div>
      <div></div>
      <div></div>
      <Button label='終了する' onClick={gameFinish} />
    </div>
  )
}
