import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

type Props = {
  name?: string;
  label: React.ReactNode;
  containerClass?: string;
  labelClass?: string;
  children?: React.ReactNode;
  register?: React.ReactNode;
};

const BillingExport = (props: Props, ref): JSX.Element => {
  const [id] = useState(uuid());
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow((show) => !show);
  }
  return (
    <div
      className={clsx('custom-control custom-checkbox mb-3', props.containerClass)}
      role="button">
      <input
        className={clsx('custom-control-input')}
        name={props.name}
        type="checkbox"
        ref={ref}
        id={id}
        onChange={toggleShow}
      />

      <label className={clsx('custom-control-label', props.labelClass)} htmlFor={id}>
        {props.label}
      </label>
      {show && <div className={clsx('mt-2 ', props.register)}>{props.children}</div>}
    </div>
  );
};

export default forwardRef(BillingExport);
