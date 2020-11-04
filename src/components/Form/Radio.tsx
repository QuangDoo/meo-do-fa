import React, { forwardRef } from 'react';

type Option = {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
  options: Option[];
  name: string;
};

const RadioInput = (props: Props, ref): JSX.Element => {
  return (
    <>
      {props.options.map((option) => {
        const id = `${props.name}_option_${option.value}`;

        return (
          <div key={id} className="custom-control custom-radio">
            <input
              className="custom-control-input"
              type="radio"
              value={option.value}
              name={props.name}
              id={id}
              ref={ref}
              disabled={option.disabled}
            />

            <label className="form__label custom-control-label" htmlFor={id}>
              {option.label}
            </label>

            {option.children}
          </div>
        );
      })}
    </>
  );
};

export default forwardRef(RadioInput);
