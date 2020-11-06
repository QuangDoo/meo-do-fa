import React from 'react';

import { mockProducts } from '../../../mockData/mockProducts';
import { ProductsContainer } from '../Home/ProductsContainer';
import { ProductsCarousel } from '../ProductsCarousel';

const RelativeProducts = (): JSX.Element => {
  return (
    <ProductsContainer title="Có thể bạn muốn mua " seeMoreUrl="#">
      <ProductsCarousel products={mockProducts} />
    </ProductsContainer>
  );
};

export default RelativeProducts;
