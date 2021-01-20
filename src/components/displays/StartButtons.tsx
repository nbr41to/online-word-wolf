import React from 'react'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import { user, room, Room } from 'src/recoil/atom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { firebase } from 'src/firebase'
import { Modal } from '../Modal'
import { Input } from '../Input'
type StartButtonsProps = {

}

export const StartButtons: React.FC<StartButtonsProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inviteCode, setInviteCode] = React.useState('')
  const _user = useRecoilValue(user)
  const _setRoomInfo = useSetRecoilState(room)
  console.log(inviteCode)
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

  const joinRoom = async () => {
    if (inviteCode.length === 6) {
      let roomId
      await firebase.auth().signInAnonymously()
      await firebase.firestore().collection('rooms')
        .where("inviteCode", "==", inviteCode).limit(1).get()
        .then(docs => {
          if (docs) {
            // console.log(docs[0]) // undefined 配列ではない
            docs.forEach(doc => {
              const roomInfo = doc.data() as Room
              roomId = roomInfo.roomId
              _setRoomInfo(roomInfo)
            })
          } else alert("部屋が存在しません")
        })
      await router.push(`/room/${roomId}`)
    } else {
      alert("6桁の招待コードを入力してください")
    }
  }


  const router = useRouter()
  return (
    <div className='box flex center column'>
      <Button label='自分で部屋をつくる' fill onClick={createRoom} />
      <Button className='mt-16' fill label='友達の部屋にはいる' onClick={() => setIsOpen(true)} />
      <Modal size='small' isOpen={isOpen} closed={() => setIsOpen(false)}>
        <div className='mb-16'>招待コードを入力してください</div>
        <Input className='mb-16' type='tel' value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />
        <Button label='入る' size='small' onClick={joinRoom} />
      </Modal>
    </div>
  )
}
