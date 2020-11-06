import clsx from 'clsx';
import React from 'react';

type ProductPriceProps = {
  price: string;
  oldPrice?: string;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const CurrentPrice = () => (
    <span className={clsx('product-card__price', props.oldPrice && 'mr-1')}>
      {props.price}
      <span className="unit">đ</span>
    </span>
  );

  return props.oldPrice ? (
    <p>
      <CurrentPrice />

      <span className="product-card__old-price">
        {props.oldPrice}
        <span className="unit">đ</span>
      </span>
    </p>
  ) : (
    <CurrentPrice />
  );
};
