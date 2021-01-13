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
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectWithLabel = (props: Props, ref) => {
  return (
    <FormGroup className={props.containerClass}>
      <FormGroupLabel required={props.required} className={props.labelClass}>
        {props.label}
      </FormGroupLabel>

      <Select
        ref={ref}
        name={props.name}
        className={clsx('custom-select d-block', props.selectClass)}
        disabled={props.disabled}
        onChange={props.onChange}>
        {props.children}
      </Select>
    </FormGroup>
  );
};

export default forwardRef(SelectWithLabel);
