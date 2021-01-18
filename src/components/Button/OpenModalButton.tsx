import React from 'react'
import { Button } from 'src/components/Button'
import { Modal } from 'src/components/Modal'

type OpenModalButtonProps = {
  className?: string
  label: string
  modalSize?: 'small' | 'middle' | 'large'
  buttonSize?: 'small' | 'middle' | 'large'
}

export const OpenModalButton: React.FC<OpenModalButtonProps> = ({ label, modalSize = 'middle', buttonSize = 'middle', className = '', children }) => {
  const [isOpen, set] = React.useState(false)
  return (
    <>
      <Button className={className} label={label} onClick={() => set(true)} size={buttonSize} />
      <Modal isOpen={isOpen} closed={() => set(false)} size={modalSize}>
        {children}
      </Modal>
    </>
  )
}
