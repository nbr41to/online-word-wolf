import React from 'react'
import styled from 'styled-components'

export type ButtonProps = {
  className?: string
  onClick: (event?: React.MouseEvent<HTMLInputElement>) => void
  label: string
  size?: 'small' | 'middle' | 'large'
  fullwide?: boolean
  disabled?: boolean
  color?: string
  pressColor?: string
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  label,
  onClick,
  size = 'middle',
  fullwide = false,
  color = '#333',
  pressColor = 'palegreen',
  disabled = false,
}) => {
  return (
    <StyledButton
      className={`${className} ${size}`}
      onClick={onClick}
      fullwide={fullwide}
      color={color}
      pressColor={pressColor}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  )
}

export const StyledButton = styled.button<{ color: string, pressColor: string, fullwide: boolean }>`
  width: ${props => props.fullwide ? '100%' : ''};
  font-weight: bold;
  display: block;
  text-align: center;
  border: 3px solid ${props => props.color};
  border-radius: 18px;
  box-shadow: 0px 4px 0px ${props => props.color};
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
    box-shadow: 0px 2px 0px ${props => props.color};
    background-color: ${props => props.pressColor};
  }
  &:disabled {
    opacity: 0.4;
  }
`
