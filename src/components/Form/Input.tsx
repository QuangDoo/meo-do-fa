import clsx from 'clsx';
import React, { useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClass?: string;
  containerClass?: string;
  inputClass?: string;
  itemRight?: React.ReactNode;
}

const Input = (props: Props, ref) => {
  const { containerClass, inputClass, itemRight, iconClass, ...inputProps } = props;

  const { type, required, placeholder } = inputProps;

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleTextBlur(e) {
    e.target.value = e.target.value.trim();

    props.onBlur?.(e);
  }

  return (
    <div className={clsx('input-group form__input-group', iconClass && 'has-icon', containerClass)}>
      {iconClass && <i className={clsx('form__input-icon', iconClass)} />}

      {type === 'file' ? (
        <div className="input-file">
          <input
            {...inputProps}
            placeholder={undefined}
            ref={ref}
            type="file"
            className={clsx('input-file-input form-control', inputClass)}
          />

          <div className="input-file-label overflow-hidden">
            <span>{placeholder}</span>
          </div>
        </div>
      ) : (
        <input
          {...inputProps}
          ref={ref}
          className={clsx(
            'form-control no-spinner',
            type === 'number' && 'no-spinner',
            type === 'password' && 'input__password',
            inputClass
          )}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          onBlur={handleTextBlur}
        />
      )}

      {/* Show password checkbox */}
      {type === 'password' && (
        <div
          className="form__password-label"
          onClick={toggleShowPassword}
          onKeyPress={toggleShowPassword}
          role="checkbox"
          aria-checked={showPassword}
          tabIndex={0}
          style={{ zIndex: 4 }} // Because focused input has z-index: 3
        >
          {showPassword ? (
            <span className="form__password-label-hide">
              <i className="fas fa-eye-slash mr-1"></i>
            </span>
          ) : (
            <span className="form__password-label-show">
              <i className="fas fa-eye mr-1"></i>
            </span>
          )}
        </div>
      )}

      {itemRight && <div className="input-group-prepend">{itemRight}</div>}

      {required && <div className="form__required-label">*</div>}
    </div>
  );
};

export default React.forwardRef(Input);
