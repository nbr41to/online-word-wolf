import { useRouter } from 'next/router'
import React from 'react'

export default function Custom404() {
  const router = useRouter()
  React.useEffect(() => {
    setTimeout(() => {
      router.push('/room')
    }, 2000)
  }, [])
  return <div>解散されました。トップに戻ります。</div>
}
