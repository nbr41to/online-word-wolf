import React from 'react'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import { room, Room } from 'src/recoil/atom'
import { firebase } from 'src/firebase'
import { useRouter } from 'next/router'

export const SubscribeRooms = () => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  const router = useRouter()
  let roomId: string
  if (roomInfo) {
    roomId = roomInfo.roomId
  } else {
    router.back()
  }
  console.log(roomId)
  React.useEffect(() => {
    let unSubscribe
    if (roomId !== '' && router.asPath.endsWith(roomId)) {
      console.log('SubscribeRooms!!')
      unSubscribe = firebase.firestore().collection('rooms').doc(roomId).onSnapshot((doc) => {
        const roomDoc = doc.data() as Room
        setRoomInfo(roomDoc)
      })
    }
    return () => {
      if (roomId) {
        unSubscribe()
        firebase.firestore().collection('rooms').doc(roomId).delete()
      }
      setRoomInfo({
        roomId: '',
        inviteCode: '',
        theme: [],
        member: null,
        isGaming: false,
        finished: false,
      })
    }
  }, [])
  console.log("=== local_db_user ===")
  console.log(userInfo)
  console.log("=== local_db_room ===")
  console.log(roomInfo)
  return null
}
