import { firebase } from 'src/firebase'
import React, { useEffect, useState } from 'react'
import { ContinueSelect } from '../templates/ContinueSelect'
import { ReadyCheck } from '../templates/ReadyCheck'
import { useRecoilState } from 'recoil'
import { room, user } from 'src/recoil/atom'
import { GameBoard } from '../templates/GameBoard'
// import {DataProvider} from "./DataProvider"


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


  //useContext使ってプロパティを渡したかった
  let limit = 180
  const [limitTime,setLimitTime] = useState(limit)
  const [intervalId,setIntervalId] = useState(null)

  


  return (
    <div>
      <ReadyCheck gameStart={gameStart} />
      {roomInfo?.isGaming && <GameBoard 
        limitTime={limitTime} 
        setLimitTime={setLimitTime} 
        intervalId={intervalId}
        setIntervalId={setIntervalId}
        />}
      {/* {roomInfo?.finished && <ContinueSelect setLimitTime={setLimitTime} />} */}
      {roomInfo?.finished && <ContinueSelect 
        limitTime={limitTime}
        setLimitTime={setLimitTime} 
        intervalId={intervalId}
        setIntervalId={setIntervalId}
         />}
    </div>
  )
}
