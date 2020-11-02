import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

const FormGroupLabel = (props: Props): JSX.Element => {
  return (
    <label className={clsx('form__label', props.required && 'required', props.className)}>
      {props.children}
    </label>
  );
};

export default FormGroupLabel;
