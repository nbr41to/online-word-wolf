import { firebase } from 'src/firebase'
import React from 'react'
import { Button } from '../Button'
import { ContinueSelect } from '../templates/ContinueSelect'
import { ReadyCheck } from './ReadyCheck'
import { useRecoilState } from 'recoil'
import { room, user } from 'src/recoil/atom'

type Props = {

}

export const OnGame: React.FC<Props> = ({ }) => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  // Wolfの決定
  const choiceWolf = async () => {
    const dice = Math.floor(Math.random() * Object.keys(roomInfo.member).length)
    const wolfName = Object.keys(roomInfo.member)[dice]
    await firebase.auth().signInAnonymously() // 消す
    await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      ...roomInfo,
      member: {
        ...roomInfo.member,
        [wolfName]: {
          ...roomInfo.member[wolfName],
          isWolf: true,
        }
      }
    })
  }
  // themeの割り振り
  const sortTheme = async () => {
    if (roomInfo.theme && Object.keys(roomInfo.member).filter(name => roomInfo.member[name].isWolf)) {
      const dice = Math.floor(Math.random() * 2)
      await firebase.auth().signInAnonymously() // 消す
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
    }
  }
  const gameStart = async () => {
    await gamingOn()
    await choiceWolf()
    await sortTheme()
  }
  return (
    <div>
      <ReadyCheck />

      <ContinueSelect />
    </div>
  )
}
