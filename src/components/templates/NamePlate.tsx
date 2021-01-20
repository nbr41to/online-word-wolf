import React from 'react'
import { Button } from '../Button'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import { UserIcon } from '../users/UserIcon'
import { Name } from '../users/Name'
import { Modal } from '../Modal'
import { Input } from '../Input'

export const NamePlate = () => {
  const [userInfo, setUserInfo] = useRecoilState(user)
  const [name, setName] = React.useState(userInfo.name)
  const [isEditing, setIsEditing] = React.useState(false)

  const saveName = (e: React.MouseEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name !== '') {
      setUserInfo({ ...userInfo, name: name })
      setIsEditing(false)
    } else alert('名前を入力してください')
  }
  return (
    <div className='box flex between'>
      <UserIcon icon={userInfo.icon} size={60} />
      <Name name={userInfo.name} label />
      <Button className='ml-16' label='編集' size='small' onClick={() => { setIsEditing(true) }} />
      <Modal className='ml-16' size='small' isOpen={isEditing} closed={() => { setIsEditing(false) }}>
        <form className='flex center column' onSubmit={(e) => saveName(e)}>
          <div className='m-8'>あなたのおなまえは</div>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <div className='m-8'>です。</div>
          <Button label='決定' size='small' onClick={(e) => saveName(e)} />
        </form>
      </Modal>
    </div>
  )
}
