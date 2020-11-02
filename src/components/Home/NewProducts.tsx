import React from 'react';

import { exampleProducts } from '../Products';
import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const NewProducts = (props): JSX.Element => {
  return (
    <ProductsContainer title="Sản phẩm mới" seeMoreUrl="#">
      <ProductsCarousel products={exampleProducts} />
    </ProductsContainer>
  );
};
