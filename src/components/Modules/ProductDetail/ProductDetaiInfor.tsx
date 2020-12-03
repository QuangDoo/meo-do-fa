import Link from 'next/link';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

import AddCart from '../AddCart';
import ProductBadge from '../ProductCard/ProductBadge';
import QuantityInput from '../QuantityInput';

type PropsType = {
  name: string;
  list_price: number;
  uom_name: string;
  id: string;
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
const ProductDetailInfor = (props: PropsType): JSX.Element => {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="h3 text-capitalize">{props.name}</h1>
        <div className="product__status mb-1" />
        {!token ? (
          <Link href="/login">
            <a className="btn btn-sm btn-secondary" data-modal="true">
              Đăng nhập để xem giá
            </a>
          </Link>
        ) : (
          <div className="d-flex align-items-center flex-wrap justify-content-between mb-4">
            <div>
              <div className="product__price-group">
                <span className="product__price">
                  <PriceText price={props.list_price} />
                  <span className="unit">đ </span>
                  <small className="text-muted">(Đã bao gồm VAT)</small>
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="product__status mb-3">
          {props.is_quick_invoice && <ProductBadge type="is_quick_invoice" />}

          {props.is_exclusive && <ProductBadge type="is_exclusive" />}

          {props.is_vn && <ProductBadge type="is_vn" />}
        </div>
        <div className="mb-3">
          <div className="product__info-label">Nhà sản xuất</div>
          <div className="text-capitalize">
            <Link href={`/manufacturers/${props.manufacturers?.id}`}>
              <a>{props.manufacturers?.name}</a>
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <div className="product__info-label">Nhóm thuốc</div>
          {props?.categories?.map((item, index) => {
            return (
              <>
                <Link href={`/categories/${item.id}`}>
                  <a className="text-capitalize" key={index}>
                    {item.name}
                  </a>
                </Link>
              </>
            );
          })}
        </div>
        <div className="product__status mb-4" />
        {!token ? null : (
          <AddCart productId={props.id} price={props.list_price} name={props.name} />
        )}
      </div>
    </div>
  );
};
export default ProductDetailInfor;
