import React, { ReactFragment } from 'react'
import Image from 'next/image';
import styled from 'styled-components';

type UserIconProps = {
  icon: 'lion' | 'neko'
  size: number
}

export const UserIcon: React.FC<UserIconProps> = ({ icon, size }) => {
  return (
    <StyledImage src={`/icons/user-icon/${icon}.png`} width={size} height={size} />
  )
}

const StyledImage = styled(Image)`
  /* border-radius: 50% */
`