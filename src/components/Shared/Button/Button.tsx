import React, { HTMLAttributes } from 'react'
import { StyledButton } from './Button.styled'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const Button = ({ variant = 'primary', ...rest }: ButtonProps) => {
  return <StyledButton variant={variant} {...rest} />
}

export default Button
