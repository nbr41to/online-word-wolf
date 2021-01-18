import React from 'react'
import { Button, OpenModalButton } from '../Button'
import { useRecoilState } from 'recoil'
import { userName } from 'src/recoil/atom'
import styled from 'styled-components'

export const NamePlate = () => {
  const [name, setName] = useRecoilState(userName)
  const [text, setText] = React.useState('')
  return (
    <div className='box flex center'>
      <StyledNamePlate>
        <div>おなまえ：</div>
        <div>{name}</div>
      </StyledNamePlate>
      <OpenModalButton className='ml-16' label='編集' modalSize='small' buttonSize='small'>
        <StyledInput className='box type="text" onChange={(e) => setText(e.target.value)}' />
        <Button label='保存' onClick={() => setName(text)} />
      </OpenModalButton>
    </div>
  )
}

const StyledNamePlate = styled.div`
  font-size: 20px;
`
const StyledInput = styled.input`
  font-size: 20px;
`
