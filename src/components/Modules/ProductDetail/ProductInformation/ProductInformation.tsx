import React from 'react';

import ProductDetailInfor from '../ProductDetaiInfor';
import ProuductDetailImage from './PoruductDetailImage';
type PropsType = {
  image_128: string;
  image_256: string;
  image_512: string;
  name: string;
  description: string;
  views: number;
  totalOrders: number;
  list_price: number;
  uom_name: string;
};
const ProductInformation = (props: PropsType): JSX.Element => {
  return (
    <div className="row py-3 mb-5 elevated">
      <ProuductDetailImage imageUrl={props.image_128} />
      <ProductDetailInfor {...props} />
    </div>
  );
};
export default ProductInformation;
