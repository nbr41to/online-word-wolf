import { SetterOrUpdater } from "recoil"
import { firebase } from "src/firebase"
import { Room, User } from "src/recoil/atom"

const roomsRef =firebase.firestore().collection('rooms')
// roomIdの取得
 export const getRoomId = async (code: string,roomInfo:Room,setRoomInfo:SetterOrUpdater<Room>) => {
    if (code.length === 6) {
      let roomId
      await firebase.auth().signInAnonymously() // 消す
      await firebase.firestore().collection('rooms')
        .where("inviteCode", "==", code).limit(1).get()
        .then(
          docs => docs.forEach(doc => {
            roomId = doc.id
          })
        ).catch(e => console.log(e))
      return roomId
    }
  }
 export const prepJoinRoom = async(userInfo:User,code: string,roomInfo:Room,setRoomInfo:SetterOrUpdater<Room>) =>{
    if (code.length === 6) {
    const roomId = await getRoomId(code,roomInfo,setRoomInfo)
    await roomsRef.doc(roomId).onSnapshot(doc=>setRoomInfo(doc.data() as Room))
    await roomsRef.doc(roomId).update({
      ...roomInfo,
      member:{
        ...roomInfo.member,
        [userInfo.id]:{
            name: userInfo.name,
            icon: userInfo.icon,
            isHost: false,
            ready: false,
            theme: '',
            isWolf: false,
            voted: false,
        }
      }
    })
  }
}
// Wolfの決定
export const gameStart = async (roomInfo:Room) => {
  await gamingOn(roomInfo)
  await choiceWolf(roomInfo)
  await sortTheme(roomInfo)
}
const choiceWolf = async (roomInfo:Room) => {
  const dice = Math.floor(Math.random()*Object.keys(roomInfo.member).length)
  const wolfName = Object.keys(roomInfo.member)[dice]
  await firebase.auth().signInAnonymously() // 消す
  await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
    ...roomInfo,
    member:{
      ...roomInfo.member,
      [wolfName]:{
        ...roomInfo.member[wolfName],
        isWolf: true,
      }
    }
  })
}
// themeの割り振り
export const sortTheme = async (roomInfo) => {
  if(roomInfo.theme && Object.keys(roomInfo.member).filter(name=>roomInfo.member[name].isWolf)){
    const dice = Math.floor(Math.random()*2)
    await firebase.auth().signInAnonymously() // 消す
    Object.keys(roomInfo.member).map(name=>{
      if(roomInfo.member[name].isWolf){
        // wolf theme in
        firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
          ...roomInfo,
          member:{
            ...roomInfo.member,
            [name]:{
              ...roomInfo.member[name],
              theme: roomInfo.theme[dice]
            }
          }
        })
      }else {
        // no wolf theme in
        firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
          ...roomInfo,
          member:{
            ...roomInfo.member,
            [name]:{
              ...roomInfo.member[name],
              theme: roomInfo.theme[dice===0?1:0]
            }
          }
        })
      }
    })
  }
}
// Game中に切り替える
const gamingOn = async (roomInfo) => {
  if (roomInfo.member.isHost) {
    await firebase.auth().signInAnonymously() // 消す
    await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      ...roomInfo,
      isGaming: true
    })
  }
}
