import clsx from 'clsx'
import React, { forwardRef } from 'react'

type Props = {
  children: React.ReactNode
  name: string
  className?: string
}

const Select = (props: Props, ref) => {
  return (
    <select ref={ref} name={props.name} className={clsx('custom-select d-block', props.className)}>
      {props.children}
    </select>
  )
}

export default forwardRef(Select)
