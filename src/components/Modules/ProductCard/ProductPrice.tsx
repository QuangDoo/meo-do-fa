import clsx from 'clsx';
import React from 'react';

type ProductPriceProps = {
  price: number;
  standard_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const priceIsDifferent = props.standard_price && props.price !== props.standard_price;

  return (
    <>
      <span className={clsx('product-card__price', priceIsDifferent && 'mr-1')}>
        {props.price.toLocaleString('de-DE')}
        <span className="unit">đ</span>
      </span>

      {/* {priceIsDifferent && (
        <span className="product-card__old-price">
          {props.standard_price.toLocaleString('de-DE')}
          <span className="unit">đ</span>
        </span>
      )} */}
    </>
  );
};
