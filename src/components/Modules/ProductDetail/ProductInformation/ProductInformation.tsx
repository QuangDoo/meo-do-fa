import Link from 'next/link';
import React from 'react';

import ProductDetailInfor from '../ProductDetaiInfor';
import ProducerInformation from './ProducerInformation';
import ProuductDetailImage from './ProductDetailImage';
import ProductSidebar from './ProductSidebar';
type PropsType = {
  id: string;
  image_128: string;
  image_256: string;
  image_512: string;
  name: string;
  description: string;
  views: number;
  totalOrders: number;
  list_price: number;
  uom_name: string;
  is_quick_invoice: string;
  is_exclusive: string;
  is_vn: string;
  manufacturers: Display_name;
  categories: Display_name[];
  ingredients: Display_name[];
  info?: string;
  indication?: string;
  contraindication?: string;
  direction?: string;
  interaction?: string;
  preservation?: string;
  overdose?: string;
  itemImgUrl?: string;
  title?: string;
};
type Display_name = {
  name: string;
  id: number;
  amount: string;
};
const ProductInformation = (props: PropsType): JSX.Element => {
  return (
    <div className="row py-3 mb-5 elevated">
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-6">
            <ProuductDetailImage imageUrl={props.image_512} />
          </div>
          <div className="col-md-6">
            <ProductDetailInfor {...props} />
          </div>
        </div>
        <ProducerInformation {...props} />
      </div>
      <div className="col-md-4 mb-3 ">
        <ProductSidebar itemImgUrl={props.itemImgUrl} title={props.title}></ProductSidebar>
      </div>
    </div>
  );
};
export default ProductInformation;
