import React from 'react';

import { mockProducts } from '../../../mockData/mockProducts';
import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const BestSelling = (): JSX.Element => {
  return (
    <ProductsContainer title="Sản phẩm bán chạy" seeMoreUrl="#">
      <ProductsCarousel products={mockProducts} />
    </ProductsContainer>
  );
};
