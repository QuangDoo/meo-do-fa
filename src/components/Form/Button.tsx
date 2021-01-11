import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

type ButtonProps = {
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'gradient' | 'light' | 'outline-primary' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  children: ReactNode;
};

const Button = (props: ButtonProps, ref) => {
  const { variant = 'primary', size = 'md', className = '', block, type = 'button' } = props;

  return (
    <button
      ref={ref}
      onClick={props.onClick}
      className={clsx('btn', `btn-${variant}`, `btn-${size}`, block && 'btn-block', className)}
      type={type}>
      {props.children}
    </button>
  );
};

export default forwardRef(Button);
