import React from 'react'
import styled from 'styled-components'

export type ButtonProps = {
  className?: string
  onClick: () => void
  label: string
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  label,
  onClick,
  size = 'middle',
  disabled = false,
}) => {
  return (
    <StyledButton
      className={`${className} ${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  )
}

export const StyledButton = styled.button`
  font-weight: bold;
  display: block;
  text-align: center;
  border: 3px solid #333;
  border-radius: 18px;
  box-shadow: 0px 4px 0px #333;
  position: relative;
  background-color: #fff;
  &.small {
    font-size: 16px;
    padding: 12px 20px
  }
  &.middle {
    font-size: 18px;
    padding: 16px 24px;
  }

  &:active {
    position: relative;
    top: 2px;
    box-shadow: 0px 2px 0px #333;
    background-color: palegreen;
  }
  &:disabled {
    opacity: 0.4;
  }
`
