import React from 'react'
import styled from 'styled-components'
import { Button, OpenModalButton } from 'src/components/Button'
import { useRouter } from 'next/router'

export const TopMenuButtons = () => {
  const router = useRouter()
  return (
    <div className='flex center'>
      <StyledModalButton label='遊び方' />
      <StyledButton label='始める' onClick={() => router.push('/game')} />
    </div>
  )
}

const StyledModalButton = styled(OpenModalButton)`
  margin: 16px;
`
const StyledButton = styled(Button)`
  margin: 16px;
`
