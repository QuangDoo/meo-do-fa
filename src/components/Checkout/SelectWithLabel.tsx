import clsx from 'clsx'
import { StringifyOptions } from 'querystring'
import React, { forwardRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

type Props = {
  label: string
  name: string
  children: React.ReactNode

  containerClass?: string
  labelClass?: string
  selectClass?: StringifyOptions
}

const InputWithLabel = (props: Props, ref) => {
  const [id] = useState(uuid())

  return (
    <div className={clsx('form-group', props.containerClass)}>
      <label className={clsx('form__label', props.labelClass)} htmlFor={id}>
        {props.label}
      </label>

      <select
        ref={ref}
        name={props.name}
        id={id}
        className={clsx('custom-select d-block', props.selectClass)}
      >
        {props.children}
      </select>
    </div>
  )
}

export default forwardRef(InputWithLabel)
