import React from 'react';

import { mockProducts } from '../../mockData/mockProducts';
import ProductCard from '../ProductCard';
import { ProductsContainer } from './ProductsContainer';

export const Promotion = (): JSX.Element => {
  return (
    <ProductsContainer title="Khuyến mãi" seeMoreUrl="/deals" deals className="px-0 px-sm-3">
      <div className="products__cards">
        {mockProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </ProductsContainer>
  );
};
