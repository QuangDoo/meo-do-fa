import React, { forwardRef } from 'react'

type Props = {
  onClick?: () => void
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'gradient' | 'light' | 'outline-primary' | 'outline-light'
  size?: 'sm' | 'md'
  block?: boolean
  className?: string
  type?: 'button' | 'submit'
}

const Button = (props: Props, ref) => {
  const { variant = 'primary', size = 'md', className = '', block, type = 'button' } = props

  return (
    <button
      onClick={props.onClick}
      className={`btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`}
      type={type}
    >
      {props.children}
    </button>
  )
}

export default forwardRef(Button)
