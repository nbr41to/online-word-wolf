import Image from 'next/image'
import React from 'react'
import { TopMenuButtons } from 'src/components/displays/TopMenuButtons'
import styled from 'styled-components';

export default function Home() {

  return (
    <>
      <StyledImageBox>
        <Image src='/arctic-wolf.jpg' width={1920 / 2} height={1280 / 2} />
      </StyledImageBox>
      <TopMenuButtons />
      <p>わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！わーどうるふだよ！</p>
    </>
  )
}

const StyledImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -8px -8px 0;
`