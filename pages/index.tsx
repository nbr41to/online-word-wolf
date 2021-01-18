import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'components/Button'
import { ImageBox } from 'components/ImageBox/index'
import styled from 'styled-components'

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <ImageBox src='/arctic-wolf.jpg' width={1920 / 2} height={1280 / 2} />
      <div className='flex center'>
        <StyledButton label='遊び方' onClick={() => { }} />
        <StyledButton label='始める' onClick={() => router.push('/game')} />
      </div>
    </div>
  )
}

const StyledButton = styled(Button)`
  margin: 16px;
`
