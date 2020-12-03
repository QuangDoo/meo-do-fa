import clsx from 'clsx';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';

type ProductPriceProps = {
  price: number;
  standard_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const priceIsDifferent = props.standard_price && props.price !== props.standard_price;

  return (
    <>
      <span className={clsx('product-card__price', priceIsDifferent && 'mr-1')}>
        <PriceText price={props.price} />
        <span className="unit">đ</span>
      </span>

      {/* {priceIsDifferent && (
        <span className="product-card__old-price">
          <PriceText price={props.standard_price} />
          <span className="unit">đ</span>
        </span>
      )} */}
    </>
  );
};
