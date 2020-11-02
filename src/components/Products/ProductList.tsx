import React from 'react';

import ProductCard, { Product } from '../ProductCard';

type Props = {
  products: Product[];
};

const ProductList = (props: Props): JSX.Element => {
  const { products } = props;

  return (
    <div className="products__cards mb-3">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
