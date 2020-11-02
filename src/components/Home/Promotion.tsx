import React from 'react';

import ProductCard from '../ProductCard';
import { exampleProducts } from '../Products';
import { ProductsContainer } from './ProductsContainer';

export const Promotion = (): JSX.Element => {
  return (
    <ProductsContainer title="Khuyến mãi" seeMoreUrl="#" deals className="px-0 px-sm-3">
      <div className="products__cards">
        {exampleProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </ProductsContainer>
  );
};
