import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  setTimeout(() => {
    router.push('/')
  }, 2000)

  return <div>解散されました。トップに戻ります。</div>
}
