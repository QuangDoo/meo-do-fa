import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { forwardRef, useState } from 'react';

import FormGroup from './FormGroup';
import FormGroupLabel from './FormGroupLabel';

type Props = {
  label: React.ReactNode;
  name?: string;
  type: 'text' | 'number' | 'password' | 'file' | 'button';

  containerClass?: string;
  labelClass?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  guide?: string;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  maxLength?: number;
  tabIndex?: number;
};

const InputWithLabel = (props: Props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const { i18n } = useTranslation();
  const toggleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const sharedInputProps = {
    ref,
    name: props.name,
    placeholder: props.placeholder,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    maxLength: props.maxLength,
    tabIndex: props.tabIndex
  };

  const handleTextBlur = (e) => {
    e.target.value = e.target.value.trim();
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
            onBlur={handleTextBlur}
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
            onChange={props.onChange}
            lang={i18n.language}
          />
          <div className="custom-file-label">{props.placeholder}</div>
        </div>
      ) : props.type === 'button' ? (
        <div className="input-group mb-3">
          <input type="text" className="form-control no-spinner" {...sharedInputProps} />
          <button onClick={props.onClick}>
            <span className="input-group-text bg-danger text-light">Xác thực tài khoản</span>
          </button>
        </div>
      ) : (
        <input
          {...sharedInputProps}
          type={props.type}
          className="form-control no-spinner"
          onBlur={handleTextBlur}
        />
      )}

      {props.guide && <small className="text-muted">{props.guide}</small>}
    </FormGroup>
  );
};

export default forwardRef(InputWithLabel);
