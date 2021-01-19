import React from 'react'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import { user } from 'src/recoil/atom'
import { useRecoilValue } from 'recoil'
import firebase from 'src/firebase'
type GameStartButtonsProps = {

}

export const GameStartButtons: React.FC<GameStartButtonsProps> = () => {

  const _user = useRecoilValue(user)

  const createRoom = async () => {
    if (_user.name !== "") {
      const inviteCode = String(Math.random() * 1).slice(2, 8) // 6桁の乱数文字列生成

      await firebase.auth().signInAnonymously()
      const roomId = firebase.firestore().collection('rooms').doc().id
      await firebase.firestore().collection("rooms").doc(roomId).set(
        {
          roomId,
          inviteCode,
          theme: ['サル', 'チンパンジー'],
          // host: name,
          // players: [name],
          // table: {},
          // isGaming: false,
          // finished: false,
          // votes: [],
        }
      )
      await router.push(`/room/${roomId}`)
    } else {
      alert("名前を入力してください")
    }
  }


  const router = useRouter()
  return (
    <div className='box flex center column'>
      <Button label='自分で部屋をつくる' fill onClick={createRoom} />
      <Button className='mt-16' fill label='友達の部屋にはいる' onClick={() => { }} />
    </div>
  )
}
