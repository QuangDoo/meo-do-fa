import clsx from 'clsx';
import React from 'react';

type Props = {
  label?: string;
  children?: React.ReactNode;
  containerClass?: string;
};

const SidebarItem = (props: Props): JSX.Element => {
  return (
    <div className={clsx('col-12', props.containerClass)}>
      {(props.label || props.children) && (
        <div className="checkout__info-item d-flex justify-content-between align-items-center">
          <small className="checkout__info-item-label">{props.label}</small>

          {props.children}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
