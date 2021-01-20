import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Room, room, user, Member } from '../recoil/atom';

// const firebaseConfig = {
//     apiKey: process.env.DB_API_KEY,
//     authDomain: process.env.DB_AUTH_DOMAIN,
//     databaseURL: process.env.DB_DATABASE_URL,
//     projectId: process.env.DB_PROJECT_ID,
//     storageBucket: process.env.DB_STORAGE_BUCKET,
//     messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
//     appId: process.env.DB_APP_ID,
// }

const firebaseConfig = {
  apiKey: "AIzaSyDYC1uz2tSHeyRNZVvxqWLoeVLBy0_6WII",
  authDomain: "word-wolf-app.firebaseapp.com",
  databaseURL: "https://word-wolf-app.firebaseio.com",
  projectId: "word-wolf-app",
  storageBucket: "word-wolf-app.appspot.com",
  messagingSenderId: "96840990243",
  appId: "1:96840990243:web:dc2f966327e830226abb96"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
const db = firebase.firestore()
// const [userInfo, setUserInfo] = useRecoilState(user)
// const [roomInfo, setRoomInfo] = useRecoilState(room)

// roomId の取得
// export const getRoomId = async (code: string) => {
//   if (code.length === 6) {
//     let roomId
//     await firebase.auth().signInAnonymously() // 消す
//     await firebase.firestore().collection('rooms')
//       .where("inviteCode", "==", code).limit(1).get()
//       .then(
//         docs => docs.forEach(doc => {
//           roomId = doc.id
//           setRoomInfo({ ...roomInfo, roomId })
//         })
//       ).catch(e => console.log(e))
//     return roomId
//   }
// }

// export const gameStart = async () => {
//   await gamingOn()
//   await choiceWolf()
//   await sortTheme()
// }
// // Wolfの決定
// const choiceWolf = async () => {
//   const dice = Math.floor(Math.random()*Object.keys(roomInfo.member).length)
//   const wolfName = Object.keys(roomInfo.member)[dice]
//   await firebase.auth().signInAnonymously() // 消す
//   await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
//     ...roomInfo,
//     member:{
//       ...roomInfo.member,
//       [wolfName]:{
//         ...roomInfo.member[wolfName],
//         isWolf: true,
//       }
//     }
//   })
// }
// // themeの割り振り
// export const sortTheme = async () => {
//   if(roomInfo.theme && Object.keys(roomInfo.member).filter(name=>roomInfo.member[name].isWolf)){
//     const dice = Math.floor(Math.random()*2)
//     await firebase.auth().signInAnonymously() // 消す
//     Object.keys(roomInfo.member).map(name=>{
//       if(roomInfo.member[name].isWolf){
//         // wolf theme in
//         firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
//           ...roomInfo,
//           member:{
//             ...roomInfo.member,
//             [name]:{
//               ...roomInfo.member[name],
//               theme: roomInfo.theme[dice]
//             }
//           }
//         })
//       }else {
//         // no wolf theme in
//         firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
//           ...roomInfo,
//           member:{
//             ...roomInfo.member,
//             [name]:{
//               ...roomInfo.member[name],
//               theme: roomInfo.theme[dice===0?1:0]
//             }
//           }
//         })
//       }
//     })
//   }
// }
// // Game中に切り替える
// const gamingOn = async () => {
//   if (roomInfo.member.isHost) {
//     await firebase.auth().signInAnonymously() // 消す
//     await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
//       ...roomInfo,
//       isGaming: true
//     })
//   }
// }
