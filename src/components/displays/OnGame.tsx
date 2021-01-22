import { firebase } from 'src/firebase'
import React from 'react'
import { ContinueSelect } from '../templates/ContinueSelect'
import { ReadyCheck } from '../templates/ReadyCheck'
import { useRecoilState } from 'recoil'
import { room, user } from 'src/recoil/atom'
import { GameBoard } from '../templates/GameBoard'

export const OnGame = () => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const [roomInfo, setRoomInfo] = useRecoilState(room)

  // WolfとThemeの割り振りとゲーム中への切り替え
  const gameStart = async () => {
    const themeDice = Math.floor(Math.random() * 2)
    const wolfDice = Math.floor(Math.random() * Object.keys(roomInfo.member).length)
    const wolfId = Object.keys(roomInfo.member)[wolfDice]
    Object.keys(roomInfo.member).map(id => {
      if (id === wolfId) {
        // wolf theme in
        firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
          [`member.${id}.theme`]: roomInfo.theme[themeDice]
        })
        // console.log(id + ':' + roomInfo.theme[themeDice])
      } else {
        // no wolf theme in
        firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
          [`member.${id}.theme`]: roomInfo.theme[themeDice === 0 ? 1 : 0]
        })
        // console.log(id + ':' + roomInfo.theme[themeDice === 0 ? 1 : 0])
      }
    })
    await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      isGaming: true,
    }).then(() => console.log('gamingOn'))
  }

  return (
    <div>
      <ReadyCheck gameStart={gameStart} />
      {roomInfo?.isGaming && <GameBoard />}
      {roomInfo?.finished && <ContinueSelect />}
    </div>
  )
}
