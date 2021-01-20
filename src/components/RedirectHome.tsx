import React from 'react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { user } from '../recoil/atom'

export const RedirectHome = () => {
  const userInfo = useRecoilValue(user)
  const router = useRouter()
  React.useEffect(() => {
    if (!userInfo.id || !userInfo.name) {
      router.push('/')
    }
  }, [])
  return null
}
