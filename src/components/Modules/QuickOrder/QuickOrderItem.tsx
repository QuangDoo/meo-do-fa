import Link from 'next/link';
import React from 'react';
import { useToken } from 'src/contexts/Token';

import QuantityInput from '../../Form/QuantityInput';
import LoginToSeePrice from '../ProductCard/LoginToSeePrice';
import { ProductPrice } from '../ProductCard/ProductPrice';

type Props = {
  image: string;
  productName: string;
  productId: number;
  uom_name: string;
  price: number;
  sale_price: number;
  quantity: number;
  list_price: number;
  _id: number;
  slug: string;
  discount_percentage: number;
};

function QuickOrderItem(props: Props) {
  const token = useToken();

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div
          className="cart-item__image lozadloaded flex-shrink-0"
          style={{
            backgroundImage: `url(${props.image})`
          }}
        />
        <div className="flex-1 pl-2 pr-2">
          <div className="d-flex align-items-center">
            <div>
              <Link href={'products/' + props.slug}>
                <a className="cart-item__name" title={props.productName}>
                  {props.productName}
                </a>
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-1 flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {token ? (
                    <ProductPrice price={props.price} sale_price={props.sale_price} />
                  ) : (
                    <LoginToSeePrice />
                  )}
                </div>

                {token && (
                  <div className="cart-item__qty">
                    <QuantityInput
                      productId={props.productId}
                      productPrice={props.list_price}
                      productName={props.productName}
                      productImg={props.image}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickOrderItem;
