/* eslint-disable jsx-a11y/no-onchange */
import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  required?: boolean;
};

const Select = (props: Props, ref) => {
  return (
    <select
      onChange={props.onChange}
      value={props.value}
      ref={ref}
      name={props.name}
      defaultValue={props.defaultValue}
      className={clsx('custom-select d-block', props.className)}
      disabled={props.disabled}
      required={props.required}>
      {props.children}
    </select>
  );
};

export default forwardRef(Select);
