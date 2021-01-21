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

  // Wolfの決定
  const choiceWolf = async () => {
    const dice = Math.floor(Math.random() * Object.keys(roomInfo.member).length)
    const wolf = Object.keys(roomInfo.member)[dice]
    const key = `member.${wolf}.isWolf`
    await firebase.auth().signInAnonymously() // 消す
    await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      [key]: true
    })
    console.log('choiceWolf')
  }

  // themeの割り振り
  const sortTheme = async () => {
    if (roomInfo.theme && Object.keys(roomInfo.member).filter(name => roomInfo.member[name].isWolf)) {
      const dice = Math.floor(Math.random() * 2)
      // await firebase.auth().signInAnonymously() // 消す
      Object.keys(roomInfo.member).map(name => {
        if (roomInfo.member[name].isWolf) {
          // wolf theme in
          firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
            ...roomInfo,
            member: {
              ...roomInfo.member,
              [name]: {
                ...roomInfo.member[name],
                theme: roomInfo.theme[dice]
              }
            }
          })
        } else {
          // no wolf theme in
          firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
            ...roomInfo,
            member: {
              ...roomInfo.member,
              [name]: {
                ...roomInfo.member[name],
                theme: roomInfo.theme[dice === 0 ? 1 : 0]
              }
            }
          })
        }
      })
      console.log('sortTheme')
    }
  }

  // Game中に切り替える
  const gamingOn = async () => {
    if (roomInfo.member.isHost) {
      await firebase.auth().signInAnonymously() // 消す
      await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
        ...roomInfo,
        isGaming: true
      })
      console.log('gamingOn')
    }
  }
  const gameStart = async () => {
    await choiceWolf()
    await sortTheme()
    await gamingOn()
  }
  return (
    <div>
      <ReadyCheck gameStart={gameStart} />
      {roomInfo.isGaming && <GameBoard />}
      {roomInfo.finished && <ContinueSelect />}
    </div>
  )
}
