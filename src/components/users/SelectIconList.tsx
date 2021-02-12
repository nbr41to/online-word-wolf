import React from 'react'
import { Icon, user } from 'src/recoil/atom'
import styled from 'styled-components'
import Image from 'next/image'
import { useRecoilValue } from 'recoil';

const userIcons: { value: Icon, name: string }[] = [{ value: "buta", name: "ぶた" }, { value: "inu", name: "いぬ" }, { value: "kuma", name: "くま" }, { value: "lion", name: "らいおん" }, { value: "neko", name: "ねこ" }, { value: "panda", name: "ぱんだ" }, { value: "penguin", name: "ぺんぎん" }, { value: "tora", name: "とら" }, { value: "uma", name: "うま" }, { value: "usagi", name: "うさぎ" }, { value: "zou", name: "ぞう" }]
type SelectIconListProps = {
  className?: string
  saveIcon: (icon: Icon) => void
}

export const SelectIconList: React.FC<SelectIconListProps> = ({ className, saveIcon }) => {
  const userInfo = useRecoilValue(user)
  return (
    <StyledSelectIconList className={className}>
      {userIcons.map((userIcon): JSX.Element =>
        <StyledSelectIcon onClick={() => saveIcon(userIcon.value)} selected={userInfo.icon === userIcon.value}>
          <Image src={`/icons/user-icon/${userIcon.value}.png`} width={40} height={40} />
          <div>{userIcon.name}</div>
        </StyledSelectIcon>
      )}
    </StyledSelectIconList>
  )
}

const StyledSelectIconList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
const StyledSelectIcon = styled.div<{ selected: boolean }>`
  font-size: 12px;
  width: 65px;
  border: ${({ selected }) => selected ? '3px solid tomato' : '2px solid #333'};;
  border-radius: 8px;
  padding: 8px 0;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`