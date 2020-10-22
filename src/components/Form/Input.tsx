import React from 'react'

type CustomInputProps = {
  placeholder?: string
  required?: boolean
  type?: 'text' | 'number'
  containerClass?: string
  icon: string
}

const Input = (props: CustomInputProps, ref) => {
  const { containerClass = '', icon } = props
  return (
    <div className={`input-group form__input-group ${containerClass}`}>
      <i className={`icomoon icon-${icon} form__input-icon`}></i>
      <input
        ref={ref}
        className="form-control"
        placeholder={props.placeholder}
        required={props.required}
        type={props.type}
      />
    </div>
  )
}

export default React.forwardRef(Input)
