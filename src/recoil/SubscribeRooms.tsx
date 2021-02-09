import React from 'react'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import { room, Room } from 'src/recoil/atom'
import { firebase } from 'src/firebase'
import { useRouter } from 'next/router'

export const SubscribeRooms: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  const router = useRouter()
  let roomId: string
  if (roomInfo) {
    roomId = roomInfo.roomId
  } else {
    router.push("/room")
  }
  React.useEffect(() => {
    let unSubscribe: () => void
    if (roomId !== '' && router.asPath.endsWith(roomId)) {
      console.log('SubscribeRooms!!')
      unSubscribe = firebase.firestore().collection('rooms').doc(roomId).onSnapshot((doc) => {
        if (!doc) return router.push('/room')
        const roomDoc = doc.data() as Room
        setRoomInfo(roomDoc)
      })
    }
    return () => {
      if (roomId) {
        unSubscribe()
        firebase.firestore().collection('rooms').doc(roomId).delete()
        setRoomInfo({
          roomId: '',
          inviteCode: '',
          theme: [],
          member: {
            [userInfo.id]: {
              name: userInfo.name,
              icon: userInfo.icon,
              isHost: false,
              isReady: false,
              theme: '',
              votes: [],
              voted: false,
            }
          },
          isGaming: false,
          finished: false,
        })
      }
    }
  }, [])
  // console.log("=== local_db_user ===")
  // console.log(userInfo)
  // console.log("=== local_db_room ===")
  console.log(roomInfo)
  return <>{children}</>
}
