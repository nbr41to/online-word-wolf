import React from 'react'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import { room, Room } from 'src/recoil/atom'
import { firebase } from 'src/firebase';

export const FireStoreToRecoil = () => {
  const [userInfo, setUser] = useRecoilState(user)
  const [roomInfo, setRoom] = useRecoilState(room)
  const roomRef = firebase.firestore().collection('room')

  React.useEffect(() => {
    if (roomInfo.inviteCode) {
      roomRef.where("inviteCode", "==", roomInfo.inviteCode).limit(1).onSnapshot((docs) => {
        docs.forEach(doc => {
          const roomDoc = doc.data() as Room
          setRoom({
            ...roomInfo,
            roomId: roomDoc.roomId
          })
        })
      })
    }
  }, [roomInfo.inviteCode])
  console.log("=== local_db_user ===")
  console.log(userInfo)
  console.log("=== local_db_room ===")
  console.log(roomInfo)
  return null
}
