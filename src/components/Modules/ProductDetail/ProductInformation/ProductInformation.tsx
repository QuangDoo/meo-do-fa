import Link from 'next/link';
import React from 'react';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

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
  sale_price?: number;
  uom_name: string;
  is_quick_invoice: string;
  is_exclusive: string;
  is_vn: string;
  categories: Category[];
  manufacturers: Display_name;
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
    <div className="elevated">
      <div className="row py-3 mb-5">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <ProuductDetailImage imageUrl={props.image_512} />
            </div>
            <div className="col-md-6">
              <ProductDetailInfor {...props} />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3 ">
          <ProductSidebar itemImgUrl={props.itemImgUrl} title={props.title}></ProductSidebar>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-10">
          <ProducerInformation {...props} />
        </div>
      </div>
    </div>
  );
};
export default ProductInformation;
