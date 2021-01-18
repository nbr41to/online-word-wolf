import React from 'react'

type ModalProps = {
  isOpen: boolean
}

export const Modal = ({ children, isOpen }) => {

  if (isOpen) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return null
  }
}
