import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const FormGroup = (props: Props) => {
  return <div className={clsx('form-group', props.className)}>{props.children}</div>;
};

export default FormGroup;
