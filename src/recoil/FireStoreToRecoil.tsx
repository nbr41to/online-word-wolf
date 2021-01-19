import React from 'react'
import { useRecoilState } from 'recoil'
import { user } from 'src/recoil/atom'

export const FireStoreToRecoil = () => {
  const [text, setText] = useRecoilState(user)

  return null
}
