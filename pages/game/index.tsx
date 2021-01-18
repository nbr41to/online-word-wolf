import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { userName } from 'src/recoil/atom'
import { NamePlate } from 'src/components/organisms/NamePlate'


export default () => {
  const [text, setText] = useRecoilState(userName)
  const router = useRouter()
  const _gameId = 'qwerty123'

  return (
    <div>
      <NamePlate />
      <div className='box flex center'>
        <Button label='自分で部屋をつくる' onClick={() => router.push(`/game/${_gameId}`)} />
        <Button label='友達の部屋にはいる' onClick={() => { }} />
      </div>
    </div>
  )
}
