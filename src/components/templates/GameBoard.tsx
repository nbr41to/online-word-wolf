import React from 'react'
import { useRecoilValue } from 'recoil'
import { room, user } from '../../recoil/atom'
import { firebase } from 'src/firebase'
import { Button } from '../Button'
import styled from 'styled-components'
import { UserIcon } from '../users/UserIcon'
import { Name } from '../users/Name'

type GameBoardProps = {

}

export const GameBoard: React.FC<GameBoardProps> = () => {
  const roomInfo = useRecoilValue(room)
  const userInfo = useRecoilValue(user)
  const playlerInfo = roomInfo.member[userInfo.id]
  const playlerIds = Object.keys(roomInfo.member)
  const gameFinish = () => {
    firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      finished: true
    })
  }
  const [remainingTime, setRemainingTime] = React.useState(10)

  const [limitTime, setLimitTime] = React.useState(180) // カウントダウンする秒数

  React.useEffect(() => {
    // 開始日時を設定
    var dt = new Date()
    // 終了時刻を開始日時+カウントダウンする秒数に設定
    var endDt = new Date(dt.getTime() + limitTime * 1000)

    // 1秒おきにカウントダウン
    var cnt = limitTime
    var id = setInterval(function () {
      cnt--
      setLimitTime(cnt)
      // 現在日時と終了日時を比較
      dt = new Date()
      if (dt.getTime() >= endDt.getTime()) {
        clearInterval(id)
      }
    }, 1000)
    return (() => {

    })
  }, [])

  // これでコンパクトに済ませたい
  // React.useEffect(() => {
  //   if (limitTime >= 0) {
  //     setInterval(() => {
  //       setLimitTime(limitTime - 1)
  //     }, 1000)
  //   }
  // }, [limitTime])

  const vote = (userId: string): void => {
    firebase.firestore().collection("rooms").doc(roomInfo.roomId).update({
      [`member.${userId}.votes`]: firebase.firestore.FieldValue.arrayUnion(userInfo.id),
      [`member.${userInfo.id}.voted`]: true,
    })
  }
  return (
    <div className='box flex column center mb-8'>
      <div>あなたのお題</div>
      <div>{playlerInfo.theme}</div>
      <div>残り時間</div>
      <div>{limitTime}秒</div>
      {(limitTime <= 0 || roomInfo.finished) &&
        <>
          <div>終了！</div>
          <div className='box flex column center fill m-8'>
            <div>投票</div>
            {Object.keys(roomInfo.member).map((id, index) =>
              <Button
                key={index}
                fullwide
                label={roomInfo.member[id].name}
                disabled={playlerIds.length > 1 && (playlerInfo.voted || id == userInfo.id)}
                onClick={() => vote(id)}
                className='m-8'
              />
            )}
          </div>
        </>
      }
      {playlerIds.length === playlerIds.filter(id => roomInfo.member[id].voted).length &&
        <div className='box flex column center fill m-8'>
          <div>結果発表</div>
          {playlerIds.map((id, index) =>
            <StyledPlayerPlate className='m-8 flex between' key={index}>
              <UserIcon size={50} icon={roomInfo.member[id].icon} />
              <Name name={roomInfo.member[id].name} />
              <div>{roomInfo.member[id].votes.length}票</div>
              <div className='mr-8'>{roomInfo.member[id].theme}</div>
            </StyledPlayerPlate>)}
          <div></div>
        </div>
      }
      <Button label='ゲームを終了する' onClick={gameFinish} disabled={!playlerInfo.isHost || roomInfo.finished} className='mt-16' />
    </div>
  )
}

const StyledPlayerPlate = styled.div`
  width: 100%;
  border: 2px solid #333;
  border-radius: 12px;
  align-items: center;
  padding: 8px;
`
