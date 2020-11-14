import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Select from 'src/components/Form/Select';

import FormGroup from './FormGroup';
import FormGroupLabel from './FormGroupLabel';

type Props = {
  label: string;
  name: string;
  children: React.ReactNode;
  containerClass?: string;
  labelClass?: string;
  selectClass?: string;
  required?: boolean;
};

const SelectWithLabel = (props: Props, ref): JSX.Element => {
  return (
    <FormGroup className={props.containerClass}>
      <FormGroupLabel required={props.required} className={props.labelClass}>
        {props.label}
      </FormGroupLabel>

      <Select
        ref={ref}
        name={props.name}
        className={clsx('custom-select d-block', props.selectClass)}>
        {props.children}
      </Select>
    </FormGroup>
  );
};

export default forwardRef(SelectWithLabel);
