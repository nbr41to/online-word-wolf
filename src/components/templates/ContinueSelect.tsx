import React from 'react'
import { Button } from '../Button'
import { useRouter } from 'next/router'

type ContinueSelectProps = {

}

export const ContinueSelect: React.FC<ContinueSelectProps> = () => {
  const router = useRouter()
  return (
    <div className='box'>
      <Button label='部屋を出る' fullwide onClick={() => router.back()} className='mb-8' />
      <Button label='もう一度遊ぶ coming soon' fullwide disabled onClick={() => { }} />
    </div>
  )
}
