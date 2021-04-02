import clsx from 'clsx';
import i18n, { useTranslation } from 'i18n';
import React, { useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClass?: string;
  containerClass?: string;
  inputClass?: string;
  itemRight?: React.ReactNode;
}

const Input = (props: Props, ref) => {
  const { containerClass, inputClass, itemRight, iconClass, ...inputProps } = props;
  const { t, i18n } = useTranslation();
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
            lang={i18n.language}
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
            'form-control',
            type === 'number' && 'no-spinner',
            type === 'password' && 'input__password',
            inputClass
          )}
          type={showPassword ? 'text' : type}
          onBlur={handleTextBlur}
        />
      )}

      {/* Show password checkbox */}
      {type === 'password' && (
        <button type="button" className="form__password-label" onClick={toggleShowPassword}>
          <i className={clsx('fas fa-fw mr-1', showPassword ? 'fa-eye-slash' : 'fa-eye')} />
        </button>
      )}

      {itemRight && <div className="input-group-prepend">{itemRight}</div>}

      {required && <div className="form__required-label">*</div>}
    </div>
  );
};

export default React.forwardRef(Input);
