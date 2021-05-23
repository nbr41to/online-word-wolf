import React from 'react'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import { room, user } from 'src/recoil/atom'
import { useRecoilValue } from 'recoil';
import { firebase } from 'src/firebase';

type ContinueSelectProps = {

}

export const ContinueSelect: React.FC<ContinueSelectProps> = () => {
  const router = useRouter()
  const userInfo = useRecoilValue(user)
  const roomInfo = useRecoilValue(room)
  console.log(userInfo)
  console.log(userInfo.id)
  console.log(roomInfo)
  console.log(roomInfo.member[userInfo.id])
  console.log(roomInfo.member[userInfo.id].isHost)

  const restart = async () => {
    let newMemberState = {};
    Object.keys(roomInfo.member).forEach(memberId => {
      newMemberState[memberId] = {
        ...roomInfo.member[memberId],
        isReady: false,
        theme: '',
        votes: [],
        voted: false,
      }
    })
    console.log(newMemberState)
    await firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      theme: [],
      member: newMemberState,
      isGaming: false,
      finished: false,
    })
  }

  return (
    <div className='box'>
      <Button label='部屋を出る' fullwide onClick={() => router.back()} className='mb-8' />
      {roomInfo.member[userInfo.id].isHost ?
        <Button label='もう一度遊ぶ' fullwide onClick={restart} />
        :
        <Button label='ホストがもう一度遊ぶか決めてます' fullwide disabled onClick={() => { }} />
      }
    </div>
  )
}
