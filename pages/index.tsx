import Image from 'next/image'
import React from 'react'
import { TopMenuButtons } from 'src/components/displays/TopMenuButtons'

export default function Home() {

  return (
    <>
      <div className='flex center m--8'>
        <Image src='/arctic-wolf.jpg' width={1920 / 2} height={1280 / 2} />
      </div>
      <TopMenuButtons />
      <p>わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。</p>
    </>
  )
}
