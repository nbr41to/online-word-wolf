import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

type ModalProps = {
  isOpen: boolean
  closed: () => void
  size: 'small' | 'middle' | 'large'
}

export const Modal: React.FC<ModalProps> = ({ isOpen, closed, size, children }) => {
  if (isOpen) {
    return (
      <StyleOverlay className='flex center column'>
        <StyleModal className={`flex center column box ${size}`}>
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
  max-height: 70%;
  background-color: #fff;
  /* 案1 */
  /* box-shadow: 6px 8px 8px rgba(0,0,0,0.6); */
  /* 案2 */
  box-shadow: 0px 4px 0px #333;

  &.small {
    height: 30%;
    max-height: 30%;
  }
  &.middle {
    height: 50%;
    max-height: 50%;
  }
  &.large {
    height: 70%;
    max-height: 70%;
  }
`
