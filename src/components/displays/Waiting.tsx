import React from 'react'
import { Button } from '../Button'

type Props = {

}

export const Waiting: React.FC<Props> = ({ }) => {
  return (
    <div>
      {true && <Button label="準備OK" onClick={() => { }} />}
      {true && <Button label="GameStart" onClick={() => { }} />}

    </div>
  )
}