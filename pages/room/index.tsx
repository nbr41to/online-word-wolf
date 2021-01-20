import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import React from 'react'
import { NamePlate } from 'src/components/templates/NamePlate'
import { StartButtons } from 'src/components/displays/StartButtons'

const Room = () => {
  return (
    <>
      <div className="mb-16">
        <NamePlate />
      </div>
      <StartButtons />
    </>
  )
}

export default Room