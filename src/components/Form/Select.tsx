/* eslint-disable jsx-a11y/no-onchange */
import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

const Select = (props: Props, ref): JSX.Element => {
  return (
    <select
      onChange={props.onChange}
      ref={ref}
      name={props.name}
      className={clsx('custom-select d-block', props.className)}
      disabled={props.disabled}>
      {props.children}
    </select>
  );
};

export default forwardRef(Select);
