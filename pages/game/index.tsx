import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { userInfo } from 'src/recoil/atom'
import { NamePlate } from 'src/components/organisms/NamePlate'


export default () => {
  const [text, setText] = useRecoilState(userInfo)
  const router = useRouter()
  const _gameId = 'qwerty123'

  return (
    <>
      <div className="mb-16">
        <NamePlate />
      </div>
      <div className='box flex center column'>
        <Button label='自分で部屋をつくる' fill onClick={() => router.push(`/game/${_gameId}`)} />
        <Button className='mt-16' fill label='友達の部屋にはいる' onClick={() => { }} />
      </div>
    </>
  )
}
