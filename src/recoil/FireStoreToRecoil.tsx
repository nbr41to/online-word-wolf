import React from 'react'
import { useRecoilState } from 'recoil'
import { userInfo } from 'src/recoil/atom'

export const FireStoreToRecoil = () => {
  const [text, setText] = useRecoilState(userInfo)

  return null
}
