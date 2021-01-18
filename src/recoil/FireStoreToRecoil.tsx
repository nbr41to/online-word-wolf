import React from 'react'
import { useRecoilState } from 'recoil'
import { userName } from 'src/recoil/atom'

export const FireStoreToRecoil = () => {
  const [text, setText] = useRecoilState(userName)

  return null
}
