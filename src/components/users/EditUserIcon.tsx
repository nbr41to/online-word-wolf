import React from 'react'
import { UserIcon, UserIconProps } from './UserIcon'
import { useRecoilState } from 'recoil'
import { user } from '../../recoil/atom'
import { Modal } from '../Modal'
import Image from 'next/image'

export const EditUserIcon: React.FC<UserIconProps> = ({ icon, size }) => {
  const [isSelecting, setIsSelecting] = React.useState(false)
  const [userInfo, setUserInfo] = useRecoilState(user)
  const saveIcon = (iconName: 'lion' | 'neko') => {
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
      <Modal size='middle' isOpen={isSelecting} closed={() => setIsSelecting(false)}>
        <div className="flex">
          <div className="box flex center column" onClick={() => saveIcon('lion')}>
            <Image src={`/icons/user-icon/${'lion'}.png`} width={40} height={40} />
            <div>らいおん</div>
          </div>
          <div className="box flex center column" onClick={() => saveIcon('neko')}>
            <Image src={`/icons/user-icon/${'neko'}.png`} width={40} height={40} />
            <div>ねこ</div>
          </div>
        </div>
      </Modal>
    </>
  )
}
