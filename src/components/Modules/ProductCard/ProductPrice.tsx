import clsx from 'clsx';
import React from 'react';

type ProductPriceProps = {
  list_price: number;
  standard_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const priceIsDifferent = props.list_price !== props.standard_price;

  return (
    <>
      <span className={clsx('product-card__price', priceIsDifferent && 'mr-1')}>
        {props.list_price.toLocaleString('de-DE')}
        <span className="unit">đ</span>
      </span>

      {priceIsDifferent && (
        <span className="product-card__old-price">
          {/* {props.standard_price.toLocaleString('de-DE')} */}
          <span className="unit">đ</span>
        </span>
      )}
    </>
  );
};
