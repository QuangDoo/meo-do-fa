import React from 'react';

type ArrowButtonProps = {
  onClick?: () => void;
  type?: 'prev' | 'next';
};

export const ArrowButton = ({ onClick, type = 'prev' }: ArrowButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`slide-arrow ${type}-arrow slick-arrow`}
      aria-disabled="true">
      <i className={`fas fa-chevron-${type === 'prev' ? 'left' : 'right'}`}></i>
    </button>
  );
};
