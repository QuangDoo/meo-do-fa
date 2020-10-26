import clsx from 'clsx'
import React, { forwardRef } from 'react'
import FormGroup from './FormGroup'
import FormGroupLabel from './FormGroupLabel'

type Props = {
  label: React.ReactNode
  name: string
  type: 'text' | 'number'

  containerClass?: string
  labelClass?: string
  placeholder?: string
  required?: boolean
}

const InputWithLabel = (props: Props, ref) => {
  return (
    <FormGroup className={props.containerClass}>
      <FormGroupLabel required={props.required} className={props.labelClass}>
        {props.label}
      </FormGroupLabel>

      <input
        ref={ref}
        name={props.name}
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
      />
    </FormGroup>
  )
}

export default forwardRef(InputWithLabel)
