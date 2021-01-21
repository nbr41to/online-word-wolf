import React from 'react'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import { user, room, User, Room } from 'src/recoil/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { firebase } from 'src/firebase'
import { Modal } from '../Modal'
import { Input } from '../Input'
type StartButtonsProps = {

}

export const StartButtons: React.FC<StartButtonsProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inviteCode, setInviteCode] = React.useState('')
  const userInfo = useRecoilValue(user)
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  console.log(inviteCode)

  const createRoom = async () => {
    const inviteCode = String(Math.random() * 1).slice(2, 8) // 6桁の乱数文字列生成
    // await firebase.auth().signInAnonymously()
    const roomId = firebase.firestore().collection('rooms').doc().id
    await firebase.firestore().collection("rooms").doc(roomId).set(
      {
        roomId,
        inviteCode,
        theme: ['サル', 'チンパンジー'],
        member: {
          [userInfo.id]: {
            name: userInfo.name,
            icon: userInfo.icon,
            isHost: true,
            isReady: true,
            votes: 0,
            theme: '',
            isWolf: false,
            voted: false,
          }
        },
        isGaming: false,
      }
    )
    setRoomInfo({ ...roomInfo, roomId })
    await router.push(`/room/${roomId}`)
  }

  const getRoomId = async (code: string) => {
    if (code.length === 6) {
      let roomId
      // await firebase.auth().signInAnonymously() // 消す
      await firebase.firestore().collection('rooms')
        .where("inviteCode", "==", code).where("isGaming", "==", false).limit(1).get()
        .then(
          docs => docs.forEach(doc => {
            roomId = doc.id
          })
        ).catch(e => console.log(e))
      return roomId
    }
  }
  const joinRoom = async () => {
    if (inviteCode.length === 6) {
      const roomId = await getRoomId(inviteCode)
      if (roomId) {
        const addKey = `member.${userInfo.id}` // dotつければobj追加できるからそれをkeyにする
        await firebase.firestore().collection("rooms").doc(roomId).update(
          {
            [addKey]: {
              name: userInfo.name,
              icon: userInfo.icon,
              isHost: false,
              isReady: false,
              votes: 0,
              theme: '',
              isWolf: false,
              voted: false,
            }
          }
        )
        setRoomInfo({ ...roomInfo, roomId })
        await router.push(`/room/${roomId}`)
      } else alert('部屋は、存在しないかプレイ中です。')
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
        <Input className='mb-16' type='tel' value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} autoFocus />
        <Button label='入る' size='small' onClick={joinRoom} />
      </Modal>
    </div>
  )
}
