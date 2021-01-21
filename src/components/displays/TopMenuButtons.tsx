import React from 'react'
import styled from 'styled-components'
import { Button } from 'src/components/Button'
import { useRouter } from 'next/router'
import { Modal } from '../Modal'
import PlayingRule from 'src/docs/PlayingRule.mdx'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'
import shortid from 'shortid'
import { Input } from '../Input'
import { firebase } from 'src/firebase'

export const TopMenuButtons = () => {
  const [name, setName] = React.useState('')
  const [isCreateUser, setIsCreateUser] = React.useState(false)
  const [isCheckRule, setIsCheckRule] = React.useState(false)
  const [userInfo, setUserInfo] = useRecoilState(user)
  const router = useRouter()

  const entry = () => {
    firebase.auth().signInAnonymously() // 消す
    if (userInfo.id && userInfo.name) {
      router.push('/room')
    } else {
      setIsCreateUser(true)
    }
  }
  const createUserAndEntry = (e: React.MouseEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = shortid.generate()
    setUserInfo({ name, id, icon: 'lion' })
    router.push('/room')
  }
  return (
    <div className='flex center'>
      <StyledButton label='遊び方' onClick={() => setIsCheckRule(true)} />
      <Modal size='large' isOpen={isCheckRule} closed={() => setIsCheckRule(false)}>
        <PlayingRule />
      </Modal>
      <StyledButton label='始める' onClick={entry} />
      <Modal size='small' isOpen={isCreateUser} closed={() => setIsCreateUser(false)}>
        <form className='flex center column' onSubmit={(e) => createUserAndEntry(e)}>
          <div className='m-8'>あなたのおなまえは</div>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <div className='m-8'>です。</div>
          <Button label='決定' size='small' onClick={(e) => createUserAndEntry(e)} />
        </form>
      </Modal>
    </div>
  )
}

const StyledButton = styled(Button)`
  margin: 16px;
`
