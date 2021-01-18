import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import React from 'react'

export default () => {
  const router = useRouter()
  const _gameId = 'qwerty123'

  return (
    <div>
      <h1>game start</h1>
      <div className='box flex center'>
        <Button label='自分で部屋をつくる' onClick={() => router.push(`/game/${_gameId}`)} />
        <Button label='友達の部屋にはいる' onClick={() => { }} />
      </div>
    </div>
  )
}
