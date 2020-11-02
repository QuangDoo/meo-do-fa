import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  white?: boolean;
};

const DescriptionBox = (props: Props): JSX.Element => {
  return (
    <div
      className={clsx('checkout__description mt-2', props.white && 'checkout__description--white')}>
      {props.children}
    </div>
  );
};

export default DescriptionBox;
