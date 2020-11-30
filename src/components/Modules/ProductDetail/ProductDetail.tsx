import React from 'react';

import ProductInformation from './ProductInformation/ProductInformation';

// import RelativeProducts from './RelativeProducts';

const ProductDetailComponent = (props): JSX.Element => {
  return (
    <div className="product container py-5">
      <ProductInformation {...props} />
      {/* <RelativeProducts /> */}
    </div>
  );
};
export default ProductDetailComponent;
