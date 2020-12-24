// import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';

import QuantityInput from '../../Form/QuantityInput';
import { ProductPrice } from '../ProductCard/ProductPrice';

type Props = {
  image: string;
  productName: string;
  productId: string;
  uom_name: string;
  list_price: number;
  sale_price?: number;
  quantity: number;
  _id: string;
  slug: string;
};

function QuickOrderItem(props: Props): JSX.Element {
  // const { t } = useTranslation(['cart', 'errors']);

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
                  <ProductPrice list_price={props.list_price} sale_price={props.sale_price} />
                </div>

                {props.sale_price ? (
                  <QuantityInput
                    productId={props._id}
                    price={props.sale_price}
                    name={props.productName}
                  />
                ) : (
                  <QuantityInput
                    productId={props._id}
                    price={props.list_price}
                    name={props.productName}
                  />
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
