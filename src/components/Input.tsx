import React, { useState } from 'react';

type Props = {
  name: string;
  iconClass: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'password';
  containerClass?: string;
};

const Input = (props: Props, ref) => {
  const { containerClass = '', type = 'text' } = props;

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={`input-group form__input-group ${containerClass}`}>
      <i className={`${props.iconClass} form__input-icon`}></i>
      <input
        name={props.name}
        ref={ref}
        className="form-control no-spinner"
        placeholder={props.placeholder}
        required={props.required}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      />

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
    </div>
  );
};

export default React.forwardRef(Input);
