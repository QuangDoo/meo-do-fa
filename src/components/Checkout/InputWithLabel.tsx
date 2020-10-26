import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

type Props = {
  label: string
  name: string
  type: 'text' | 'number'

  containerClass?: string
  labelClass?: string
  placeholder?: string
  instructions?: string
}

const InputWithLabel = (props: Props, ref) => {
  const [id] = useState(uuid())

  return (
    <div className={clsx('form-group', props.containerClass)}>
      <label className={clsx('form__label', props.labelClass)} htmlFor={id}>
        {props.label}

        {props.instructions && <span className="text-muted"> ({props.instructions})</span>}
      </label>

      <input
        ref={ref}
        name={props.name}
        type={props.type}
        className="form-control"
        id={id}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default forwardRef(InputWithLabel)
