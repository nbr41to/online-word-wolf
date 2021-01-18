import React from 'react'
import Image from 'next/image'

type ImageBoxProps = {
  src: string
  width: number
  height: number
}

export const ImageBox: React.FC<ImageBoxProps> = ({ src, width, height }) => {
  return (
    <div className='flex center'>
      <Image
        src={src}
        width={width}
        height={height}
      />
    </div>
  )
}
