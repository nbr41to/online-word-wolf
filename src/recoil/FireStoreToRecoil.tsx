import React from 'react'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import { room, Room } from 'src/recoil/atom'
import { firebase } from 'src/firebase'
import { useRouter } from 'next/router'

export const FireStoreToRecoil = () => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  const roomRef = firebase.firestore().collection('rooms')
  const router = useRouter()
  console.log(roomInfo.roomId)

  console.log(roomInfo.roomId !== '' && router.asPath.endsWith(roomInfo.roomId))
  
  React.useEffect(() => {
    if (roomInfo.roomId !== '' && router.asPath.endsWith(roomInfo.roomId)) {
      console.log('FireStoreToRecoil!!')
      firebase.firestore().collection('rooms').doc(roomInfo.roomId).onSnapshot((doc) => {
        const roomDoc = doc.data() as Room
        setRoomInfo(roomDoc)
      })
    }
  }, [])
  console.log("=== local_db_user ===")
  console.log(userInfo)
  console.log("=== local_db_room ===")
  console.log(roomInfo)
  return null
}
