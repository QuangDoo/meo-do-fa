import React from 'react';

type Props = {
  className?: string;
};

export default function Loading(props: Props) {
  return (
    <div className={`lds-roller ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
