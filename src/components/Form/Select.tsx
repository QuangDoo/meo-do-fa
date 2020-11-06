import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
  name?: string;
  className?: string;
  onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = (props: Props, ref): JSX.Element => {
  return (
    <select
      onBlur={props.onBlur}
      ref={ref}
      name={props.name}
      className={clsx('custom-select d-block', props.className)}>
      {props.children}
    </select>
  );
};

export default forwardRef(Select);
