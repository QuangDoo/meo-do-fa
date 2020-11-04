import React from 'react';

import { mockFlashSale } from '../../mockData/mockFlashSale';
import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const FlashSale = (): JSX.Element => {
  return (
    <ProductsContainer title="Flash Sale" seeMoreUrl="#" deals>
      <ProductsCarousel products={mockFlashSale} />
    </ProductsContainer>
  );
};
