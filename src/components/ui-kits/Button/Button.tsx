import React from 'react'
import { StyledButton } from './Button.styled'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
}

export default Button
