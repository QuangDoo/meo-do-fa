import React from 'react';

type ProductPriceProps = {
  price: string;
};

export const ProductPrice = (props: ProductPriceProps) => (
  <span className="product-card__price">
    {props.price}
    <span className="unit">đ</span>
  </span>
);
