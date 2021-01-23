import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

export type UserIconProps = {
  className?: string
  icon: 'lion' | 'neko'
  size: number
}

export const UserIcon: React.FC<UserIconProps> = ({ icon, size, className }) => {
  return (
    <StyledImage className={className} src={`/icons/user-icon/${icon}.png`} width={size} height={size} />
  )
}

const StyledImage = styled(Image)`
  /* border-radius: 50% */
`
