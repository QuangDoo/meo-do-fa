import React from 'react'

type CheckboxProps = {
  required?: boolean
  name: string
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
        Tôi đã đọc và đồng ý với{' '}
        <a href="/terms-and-condition" target="_blank">
          Điều khoản sử dụng
        </a>
        <span className="text-danger"> *</span>
      </label>
    </div>
  )
}

export default React.forwardRef(Checkbox)
