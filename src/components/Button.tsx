import React, { FC } from 'react'

type ButtonProps = {
  onClick?: () => void
  variant: 'primary' | 'secondary' | 'gradient' | 'light' | 'outline-primary' | 'outline-light'
  size?: 'sm' | 'md'
  block?: boolean
  className?: string
  type?: 'button' | 'submit'
}

const Button: FC<ButtonProps> = (props) => {
  const { variant = 'primary', size = 'md', className = '', block } = props

  return (
    <button
      onClick={props.onClick}
      className={`btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`}
    >
      {props.children}
    </button>
  )
}

export default Button
