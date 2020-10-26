import clsx from 'clsx'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

type CheckboxProps = {
  name?: string
  label: React.ReactNode
  containerClass?: string
  labelClass?: string
  children?: React.ReactNode
}

const Checkbox = (props: CheckboxProps, ref) => {
  const [id] = useState(uuid())

  return (
    <div className={clsx('custom-control custom-checkbox', props.containerClass)}>
      <input className="custom-control-input" name={props.name} type="checkbox" ref={ref} id={id} />

      <label className={clsx('custom-control-label', props.labelClass)} htmlFor={id}>
        {props.label}
      </label>

      {props.children}
    </div>
  )
}

export default React.forwardRef(Checkbox)
