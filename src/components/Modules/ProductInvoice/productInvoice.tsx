import slugify from '@sindresorhus/slugify';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import BillingExport from '../Checkout/BillingExport';

type Props = {
  arrayProducts: ArrayProducts;
} & ReactHookFormRegister;

type ArrayProducts = {
  id: number;
  name: string;
  image: string;
  price: number;
  total_price?: number;
  quantity: number;
  dc_amt_product?: number;
  tax?: number;
  price_percentage?: number;
}[];

const ProductInvoice = (props: Props) => {
  const { t } = useTranslation(['checkout']);
  return (
    // <div className="mt-3">
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
                backgroundImage: `url(${item.image})`
              }}
            />
            <div className="flex-1 pl-2 pr-2">
              <div className="d-flex align-items-center">
                <div>
                  <Link href={'products/' + slugify(item.name) + `-pid${item.id}`}>
                    <a className="cart-item__name" title={item.name}>
                      {item.name}
                    </a>
                  </Link>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-1 flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <PriceText price={item.price} />
                    <div className="ml-3">
                      <div>
                        {t('checkout:quantity')}: {item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </BillingExport>
    // </div>
  );
};

export default ProductInvoice;
