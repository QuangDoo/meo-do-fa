import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

type CheckboxProps = {
  required?: boolean
  name?: string
  label: React.ReactNode
}

const Checkbox = (props: CheckboxProps, ref) => {
  const [id] = useState(uuid())

  return (
    <div className="form-group custom-control custom-checkbox">
      <input
        className="custom-control-input"
        required={props.required}
        name={props.name}
        type="checkbox"
        ref={ref}
        id={id}
      />

      <label className="custom-control-label pt-1" htmlFor={id}>
        {props.label}
      </label>
    </div>
  )
}

export default React.forwardRef(Checkbox)
