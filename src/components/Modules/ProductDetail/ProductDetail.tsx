import React from 'react';

import ProducerInformation from './ProductInformation/ProducerInformation';
import ProductInformation from './ProductInformation/ProductInformation';
import RelativeProducts from './RelativeProducts';

const ProductDetailComponent = (props): JSX.Element => {
  return (
    <div className="product container py-5">
      <ProductInformation {...props} />
      <ProducerInformation
        manufacturers={props.manufacturer_id}
        categories={props.categories}
        ingredients={props.ingredients}
        info={props.info}
        indication={props.indication}
        contraindication={props.contraindication}
        direction={props.direction}
        interaction={props.interaction}
        preservation={props.preservation}
        overdose={props.overdose}
      />
      <hr />
      <RelativeProducts />
    </div>
  );
};
export default ProductDetailComponent;
