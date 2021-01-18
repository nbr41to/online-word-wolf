import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

type ModalProps = {
  isOpen: boolean
  closed: () => void
}

export const Modal: React.FC<ModalProps> = ({ isOpen, closed, children }) => {
  if (isOpen) {
    return (
      <StyleOverlay className='flex center column'>
        <StyleModal className='box'>
          {children}
        </StyleModal>
        <Button label='閉じる' onClick={closed} />
      </StyleOverlay>
    )
  } else {
    return null
  }
}
const StyleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
`
const StyleModal = styled.div`
  width: 90%;
  height: 70%;
  max-height: 70%;
  background-color: #fff;
`
