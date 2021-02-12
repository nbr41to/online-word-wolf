import React from 'react'
import { UserIcon, UserIconProps } from './UserIcon'
import { useRecoilState } from 'recoil'
import { Icon, user } from '../../recoil/atom'
import { Modal } from '../Modal'
import Image from 'next/image'
import styled from 'styled-components'
import { SelectIconModal } from './SelectIconModal'

export const EditUserIcon: React.FC<UserIconProps> = ({ icon, size }) => {
  const [isSelecting, setIsSelecting] = React.useState(false)
  const [userInfo, setUserInfo] = useRecoilState(user)
  const saveIcon = (iconName: Icon) => {
    setUserInfo({
      ...userInfo,
      icon: iconName,
    })
    setIsSelecting(false)
  }
  console.log(isSelecting)
  return (
    <>
      <div onClick={() => setIsSelecting(true)}>
        <UserIcon icon={icon} size={size} />
      </div>
      <SelectIconModal isOpen={isSelecting} closed={() => setIsSelecting(false)} />
    </>
  )
}


