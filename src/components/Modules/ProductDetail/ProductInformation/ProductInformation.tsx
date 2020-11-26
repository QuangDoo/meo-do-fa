import Link from 'next/link';
import React from 'react';

import Tab from '../../../Tab/Tab';
import ProductDetailInfor from '../ProductDetaiInfor';
import ProducerInformation from './ProducerInformation';
import ProductSidebar from './ProductSideBar';
import ProuductDetailImage from './ProduductDetailImage';
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
};
type Display_name = {
  name: string;
  id: number;
  amount: string;
};

const ProductInformation = (props: PropsType): JSX.Element => {
  return (
    <div className="row py-3 mb-5 elevated">
      <div className="col-sm-9">
        <div className="row">
          <div className="col-md-5">
            <ProuductDetailImage imageUrl={props.image_512} />
          </div>
          <div className="col-md-7">
            <ProductDetailInfor {...props} />
          </div>
        </div>
        <ProducerInformation {...props} />
      </div>
      <div className="col-sm-3 mb-3 ">
        <ProductSidebar />
      </div>
    </div>
  );
};
export default ProductInformation;
