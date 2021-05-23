import React, { useEffect,useContext } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { room, user } from '../../recoil/atom'
import { firebase } from 'src/firebase'
import { Button } from '../Button'
import styled from 'styled-components'
import { UserIcon } from '../users/UserIcon'
import { Name } from '../users/Name'
// import { DataContext } from '../displays/DataProvider'

type GameBoardProps = {
  limitTime: number,
  setLimitTime: any,
  intervalId: any,
  setIntervalId: any
}

export const GameBoard: React.FC<GameBoardProps> = ({limitTime,setLimitTime,intervalId,setIntervalId}) => {
  // const roomInfo = useRecoilValue(room)
  const roomInfo = useRecoilValue(room)
  const userInfo = useRecoilValue(user)
  const playlerInfo = roomInfo.member[userInfo.id]
  const playlerIds = Object.keys(roomInfo.member)
  let limit = 180
  // これでコンパクトに済ませたい

  useEffect(()=>{
    if(roomInfo.finished){
      clearInterval(intervalId)
      setLimitTime(0)
    }else if(!roomInfo.finished){
      limit = 180
      clearInterval(intervalId)
      setLimitTime(limit)
      
      setIntervalId(setInterval(()=>{
        limit = limit - 1
        setLimitTime(limit)
        if(limit <= 0 ){
          limit = 0
          firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
            finished: true,
            // isGaming: false falseにすると途中参加できるがGAMESTARTボタンが表示されてしまう
            // 新しく酸化OKのプロパティ作るかfinished: trueかつisGaming: trueの部屋に入れるようにする
          })
        }
      },1000))

    }
  },[roomInfo.finished])

  const gameFinish = () => {
    limit = 0
    setLimitTime(limit)
    clearInterval(intervalId)

    firebase.firestore().collection('rooms').doc(roomInfo.roomId).update({
      finished: true,
      // isGaming: false
    })
  }
  // const [remainingTime, setRemainingTime] = React.useState(10)


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
