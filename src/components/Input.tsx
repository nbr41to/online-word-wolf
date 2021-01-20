import React from 'react'
import styled from 'styled-components'

export const Input = styled.input`
  font-size: 20px;
  padding: 12px;
  border: 4px solid #333;
  border-radius: 16px;
`
// // つくれない onchangeがだるい
// type InputProps = {
//   className?: string
//   type?: 'text' | 'tel'
//   value: string
//   onChange: (e: EventTarget & HTMLInputElement | string) => void
// }

// export const Input: React.FC<InputProps> = ({ type = 'text', value, onChange, className }) => {
//   return <StyledInput className={`${className} box`} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
// }
