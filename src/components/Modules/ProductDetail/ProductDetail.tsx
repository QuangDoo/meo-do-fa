import React from 'react';

import ProducerInformation from './ProductInformation/ProducerInformation';
import ProductInformation from './ProductInformation/ProductInformation';
import RelativeProducts from './RelativeProducts';

const ProductDetailComponent = (props): JSX.Element => {
  return (
    <div className="product container py-5">
      <ProductInformation {...props} />
      <ProducerInformation />
      <hr />
      <RelativeProducts />
    </div>
  );
};
export default ProductDetailComponent;
