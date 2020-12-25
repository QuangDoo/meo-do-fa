import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import BillingExport from '../Checkout/BillingExport';

type Props = {
  arrayProducts: ArrayProducts;
} & ReactHookFormRegister;

type ArrayProducts = {
  productId: number;
  productName: string;
  quantity: number;
}[];

const ProductInvoice = (props: Props) => {
  const { t } = useTranslation(['checkout']);

  return (
    <BillingExport
      ref={props.register}
      name="isProductInvoice"
      label={t('checkout:list_products_have_invoice')}>
      {props.arrayProducts.map((item, index) => (
        <div className="cart-item" key={index}>
          <div className="row align-items-center">
            <div
              className="cart-item__image lozadloaded flex-shrink-0"
              style={{
                backgroundImage: `url(https://salt.tikicdn.com/cache/w444/ts/product/55/16/72/fed3f507256cbeaacea0521fdecf0eb5.jpg)`
              }}
            />
            <div className="flex-1 pl-2 pr-2">
              <div className="d-flex align-items-center">
                <div>
                  <Link href={'products/' + item.productId}>
                    <a className="cart-item__name" title={item.productName}>
                      {item.productName}
                    </a>
                  </Link>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-1 flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <div>gia</div> */}
                    <div className="ml-3">
                      <div className="">{item.quantity}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </BillingExport>
  );
};

export default ProductInvoice;
