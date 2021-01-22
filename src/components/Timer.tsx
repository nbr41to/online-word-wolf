import React from 'react'

type TimerProps = {
  setTime: number
}

export const Timer: React.FC<TimerProps> = ({ setTime }) => {
  const [limitTime, setLimitTime] = React.useState(setTime)
  const [remainingTime, setRemainingTime] = React.useState(setTime)

  return (
    <div>
      <div>残り時間</div>
      <div>{remainingTime}秒</div>
    </div>
  )
}