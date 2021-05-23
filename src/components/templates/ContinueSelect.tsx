import React, { useEffect } from 'react'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import firebase from "firebase"
import {useRecoilState} from "recoil"
import { room, user } from 'src/recoil/atom'

type ContinueSelectProps = {
  limitTime: number
  setLimitTime: any
  intervalId: any,
  setIntervalId:any
}

export const ContinueSelect: React.FC<ContinueSelectProps> = ({limitTime,setLimitTime,intervalId,setIntervalId}) => {
  const router = useRouter()
  const [roomInfo,setRoomInfo] = useRecoilState(room)
  const [userInfo,setUserInfo] = useRecoilState(user)



  return (
    <div className='box'>
     
      <Button label='部屋を出る' fullwide onClick={() => router.back()} className='mb-8' />
        
          <Button label='もう一度遊ぶ coming soon' fullwide onClick={async () => {

          const firebaseRoom = await firebase.firestore().collection("rooms").doc(roomInfo.roomId)
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

          const newTheme = await getTheme()

          
          
          await firebaseRoom.update({
            isGaming: true,
            finished: false,
            theme: newTheme
          }).then(async ()=>{
            const membersId = Object.keys(roomInfo.member)
            const wolfDice = Math.floor(Math.random() * membersId.length)
            const themeDice =  Math.floor(Math.random() * 2)
            const wolfId = membersId[wolfDice]
            
            //firebase変更によるsubScribe直後とfirebaseの部屋のお題変更語ではタイミング合わないのでfirebaseからお題を取っておく
            let roomTheme
            await firebaseRoom.get().then((doc)=>{
              roomTheme = doc.data().theme
            })
            
            Object.keys(roomInfo.member).map(id => {
              
              if (id === wolfId) {
                // wolf theme in
                firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
                  [`member.${id}.theme`]: roomTheme[themeDice],
                  [`member.${id}.votes`]:[],
                  [`member.${id}.voted`]: false
                })
              } else {
                firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
                  [`member.${id}.theme`]: roomTheme[themeDice === 0 ? 1 : 0],
                  [`member.${id}.votes`]:[],
                  [`member.${id}.voted`]: false
                })
              }
            })
            // 何故かこれでは正しくお題が変更されなかった
            // membersId.forEach(async (memberId,index)=>{
            //     await firebaseRoom.update({
            //       [`member.${memberId}.votes`]:[],
            //       [`member.${memberId}.voted`]: false
            //     })
                
            //   if(memberId === wolfId){
            //     firebaseRoom.update({
            //       [`member.${memberId}.theme`]: roomInfo.theme[themeDice]
            //     })
            //   }else{
            //     firebaseRoom.update({
            //       [`members.${memberId}.theme`]: newTheme[themeDice === 0 ? 1 : 0]
            //     })
            //   }
            // })
          })

      }} />
    </div>
  )
}
