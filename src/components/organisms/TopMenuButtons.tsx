import React from 'react'
import styled from 'styled-components'
import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import { Modal } from '../Modal'
import PlayingRole from 'src/docs/PlayingRule.mdx'
export const TopMenuButtons = () => {
  const router = useRouter()
  const [isOpen, set] = React.useState(false)
  return (
    <div className='flex center'>
      <StyledButton label='遊び方' onClick={() => set(true)} />
      <StyledButton label='始める' onClick={() => router.push('/room')} />
      <Modal size="large" isOpen={isOpen} closed={() => set(false)}>
        <PlayingRole />
      </Modal>
    </div>
  )
}

const StyledButton = styled(Button)`
  margin: 16px;
`
