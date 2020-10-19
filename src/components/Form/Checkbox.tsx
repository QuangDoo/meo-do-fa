import React from 'react'

type CheckboxProps = {
  required?: boolean
  name: string
  label: React.ReactNode
}

const Checkbox = (props: CheckboxProps, ref) => {
  return (
    <div className="form-group custom-control custom-checkbox">
      <input
        className="custom-control-input"
        required={props.required}
        name={props.name}
        type="checkbox"
        ref={ref}
      />

      <label className="custom-control-label pt-1" htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  )
}

export default React.forwardRef(Checkbox)
