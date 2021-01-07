import React, { forwardRef, useState } from 'react';

type Option = {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
  options: Option[];
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioInput = (props: Props, ref): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleChange = () => {
    setShow(!show);
    props.onChange;
  };

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
              onChange={handleChange}
            />

            <label className="form__label custom-control-label" htmlFor={id}>
              {option.label}
            </label>
            {show && option.children}
          </div>
        );
      })}
    </>
  );
};

export default forwardRef(RadioInput);
