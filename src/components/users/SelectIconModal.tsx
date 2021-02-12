import React from 'react'
import { useRecoilState } from 'recoil'
import { Icon, user } from 'src/recoil/atom'
import styled from 'styled-components'
import { Modal, ModalProps } from '../Modal'
import { SelectIconList } from './SelectIconList'

export const SelectIconModal: React.FC<Omit<ModalProps, 'size'>> = ({ isOpen, closed }) => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const saveIcon = (icon: Icon) => {
    setUserInfo({
      ...userInfo,
      icon,
    })
    close()
  }
  return (
    <Modal size='middle' isOpen={isOpen} closed={closed}>
      <div className='m-8'>動物を選ぶ</div>
      <SelectIconList saveIcon={saveIcon} />
    </Modal>
  )
}
