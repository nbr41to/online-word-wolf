import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import React from 'react'
import { NamePlate } from 'src/components/organisms/NamePlate'
import { GameStartButtons } from 'src/components/organisms/GameStartButtons'

export default () => {

  return (
    <>
      <div className="mb-16">
        <NamePlate />
      </div>
      <GameStartButtons />
    </>
  )
}
