import React from 'react'
import { Button } from '../Button'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import { UserIcon } from '../users/UserIcon'
import { Name } from '../users/Name'
import { Modal } from '../Modal'
import { Input } from '../Input'

export const NamePlate = () => {
  const [info, setInfo] = useRecoilState(user)
  const [text, setText] = React.useState(info.name)
  const [isEditing, setIsEditing] = React.useState(false)
  const saveName = () => {
    setInfo({ name: text, icon: info.icon })
    setIsEditing(false)
  }
  return (
    <div className='box flex between'>
      <UserIcon icon={info.icon} size={60} />
      <Name name={info.name} label />
      <Button className='ml-16' label='編集' size='small' onClick={() => { setIsEditing(true) }} />
      <Modal className='ml-16' size='small' isOpen={isEditing} closed={() => { setIsEditing(false) }}>
        <Input className='box mb-16' type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <Button label='保存' size='small' onClick={saveName} />
      </Modal>
    </div>
  )
}
