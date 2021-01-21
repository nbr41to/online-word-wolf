import { firebase } from 'src/firebase'
import React from 'react'
import { Button } from '../Button'
import { useRecoilValue } from 'recoil'
import { room, user } from 'src/recoil/atom'

type ReadyCheckProps = {
  gameStart: () => void
}

export const ReadyCheck: React.FC<ReadyCheckProps> = ({ gameStart }) => {
  const userInfo = useRecoilValue(user)
  const roomInfo = useRecoilValue(room)
  const [readyDisabled, setReadyDisabled] = React.useState(false)

  // 全員isReadyでスタートButton
  // const allReady = Object.values(roomInfo.member).length === Object.values(roomInfo.member).filter(member => member.isReady).length
  const allReady = true
  const ready = () => {
    const key = `member.${userInfo.id}.isReady` // ネスト深くても更新できる
    firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      [key]: true
    })
    setReadyDisabled(true)
  }

  const isHost = roomInfo.member === null ? false : roomInfo.member[userInfo.id].isHost
  return (
    <div className='mb-8'>
      {(!isHost && !roomInfo.isGaming) && <Button label={readyDisabled ? 'Ready!!' : 'Ready??'} fill disabled={readyDisabled} onClick={ready} />}
      {(isHost && !roomInfo.isGaming) && <Button label="GameStart" fill disabled={!allReady} onClick={gameStart} />}
    </div>
  )
}
