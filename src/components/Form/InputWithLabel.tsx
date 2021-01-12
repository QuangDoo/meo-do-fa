import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';

import FormGroup from './FormGroup';
import FormGroupLabel from './FormGroupLabel';

type Props = {
  label: React.ReactNode;
  name?: string;
  type: 'text' | 'number' | 'password' | 'file';

  containerClass?: string;
  labelClass?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  guide?: string;
  accept?: string;
};

const InputWithLabel = (props: Props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const sharedInputProps = {
    ref,
    name: props.name,
    placeholder: props.placeholder,
    defaultValue: props.defaultValue,
    disabled: props.disabled
  };

  return (
    <FormGroup className={props.containerClass}>
      <FormGroupLabel required={props.required} className={props.labelClass}>
        {props.label}
      </FormGroupLabel>

      {props.type === 'password' ? (
        <div className="form__password">
          <input
            {...sharedInputProps}
            type={showPassword ? 'text' : 'password'}
            className="form-control"
          />

          <button type="button" className="form__password-label" onClick={toggleShowPassword}>
            <span>
              <i className={clsx('fas mr-1', showPassword ? 'fa-eye-slash' : 'fa-eye')}></i>
            </span>
          </button>
        </div>
      ) : props.type === 'file' ? (
        <div className="custom-file">
          <input
            ref={ref}
            name={props.name}
            disabled={props.disabled}
            type="file"
            className="custom-file-input"
            accept={props.accept}
          />
          <div className="custom-file-label">{props.placeholder}</div>
        </div>
      ) : (
        <input {...sharedInputProps} type={props.type} className="form-control no-spinner" />
      )}

      <small className="text-muted">{props.guide}</small>
    </FormGroup>
  );
};

export default forwardRef(InputWithLabel);
