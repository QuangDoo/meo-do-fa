import React, { HTMLAttributes } from 'react'
import { StyledButton } from './Button.styled'

// Has all normal button props
export type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, 'type'> & {
  // Button theme color
  variant?: 'primary' | 'secondary' | 'tertiary' | 'white'

  // Button is outlined or filled
  outline?: boolean

  // Button size
  size?: 'normal' | 'small'
}

const Button = ({
  variant = 'primary',
  outline = false,
  size = 'normal',
  ...rest
}: ButtonProps) => {
  return <StyledButton size={size} outline={outline} variant={variant} {...rest}></StyledButton>
}

export default Button
