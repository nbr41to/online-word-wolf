import React from 'react'
import { Button } from 'src/components/Button'
import { Modal } from 'src/components/Modal'

type OpenModalButtonProps = {
  label: string
}

export const OpenModalButton: React.FC<OpenModalButtonProps> = ({ label, children }) => {
  const [isOpen, set] = React.useState(false)
  return (
    <>
      <Button label={label} onClick={() => set(true)} />
      <Modal isOpen={isOpen} closed={() => set(false)}>
        {children}
      </Modal>
    </>
  )
}
