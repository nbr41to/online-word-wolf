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

  const getTheme = async () => {
    let themes: string[][] = []
    await firebase.firestore().collection('subjects').get().then(docs => {
      docs.forEach(doc => {
        const theme = doc.data().theme as string[]
        themes.push(theme)
      })
    })
    return themes[Math.floor(Math.random() * themes.length)]
  }

  const createRoom = async () => {
    const inviteCode = String(Math.random() * 1).slice(2, 8) // 6桁の乱数文字列生成
    // await firebase.auth().signInAnonymously()
    const roomId = firebase.firestore().collection('rooms').doc().id
    const theme = await getTheme()
    await firebase.firestore().collection("rooms").doc(roomId).set(
      {
        roomId,
        inviteCode,
        theme,
        member: {
          [userInfo.id]: {
            name: userInfo.name,
            icon: userInfo.icon,
            isHost: true,
            isReady: true,
            theme: '',
            votes: [],
            voted: false,
          }
        },
        isGaming: false,
        finished: false,
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
            [`member.${userInfo.id}`]: {
              name: userInfo.name,
              icon: userInfo.icon,
              isHost: false,
              isReady: false,
              theme: '',
              votes: [],
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
      <Button label='自分で部屋をつくる' fullwide onClick={createRoom} />
      <Button className='mt-16' fullwide label='友達の部屋にはいる' onClick={() => setIsOpen(true)} />
      <Modal size='small' isOpen={isOpen} closed={() => setIsOpen(false)}>
        <div className='mb-16'>招待コードを入力してください</div>
        <Input className='mb-16' type='tel' value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} autoFocus />
        <Button label='入る' size='small' onClick={joinRoom} />
      </Modal>
    </div>
  )
}
