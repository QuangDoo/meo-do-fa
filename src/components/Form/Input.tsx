import React, { useState } from 'react';

type Props = {
  name: string;
  iconClass: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'password' | 'email' | 'file';
  containerClass?: string;
  itemRight?: React.ReactNode;
  disabled?: boolean;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props, ref) => {
  const { containerClass = '', type = 'text', itemRight } = props;

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={`input-group form__input-group ${containerClass} `}>
      <i className={`${props.iconClass} form__input-icon`} />

      {type === 'file' ? (
        <div className="input-file">
          <input
            ref={ref}
            name={props.name}
            disabled={props.disabled}
            type="file"
            className="input-file-input form-control no-spinner"
            accept={props.accept}
            onChange={props.onChange}
          />

          <div className="input-file-label overflow-hidden">
            <span>{props.placeholder}</span>
          </div>
        </div>
      ) : (
        <input
          ref={ref}
          name={props.name}
          className="form-control no-spinner"
          placeholder={props.placeholder}
          required={props.required}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        />
      )}

      {/* {type !== 'file' && (
        <input
          ref={ref}
          name={props.name}
          className="form-control no-spinner"
          placeholder={props.placeholder}
          required={props.required}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        />
      )} */}

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

      {props.required && <div className="form__required-label">*</div>}
    </div>
  );
};

export default React.forwardRef(Input);
