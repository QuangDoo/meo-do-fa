import slugify from '@sindresorhus/slugify';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import Checkbox from 'src/components/Form/Checkbox';
import PriceText from 'src/components/Form/PriceText';
import { useCart } from 'src/contexts/Cart';
import {
  GET_INVOICE_COUNSEL,
  GetInvoiceCounselData,
  GetInvoiceCounselVars
} from 'src/graphql/product/getProductInvoice.query';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

import { CheckoutFormInputs } from '.';

type Props = {
  orderNo: string;
};

const InvoiceProducts = (props: Props) => {
  const { t } = useTranslation(['checkout']);

  const { register, watch } = useFormContext<CheckoutFormInputs>();

  const showInvoiceProducts = watch('showInvoiceProducts');

  const router = useRouter();

  const { data } = useQueryAuth<GetInvoiceCounselData, GetInvoiceCounselVars>(GET_INVOICE_COUNSEL, {
    variables: {
      orderNo: props.orderNo
    },
    onError: (err) => {
      const errorCode = err.graphQLErrors[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    },
    skip: !props.orderNo
  });

  const products = data?.getInvoiceCounsel || [];

  return (
    <Checkbox
      ref={register}
      name="showInvoiceProducts"
      label={t('checkout:list_products_have_invoice')}>
      <div className="mt-2" hidden={!showInvoiceProducts}>
        {products.map((item, index) => {
          const productLink = `products/${slugify(item.name as string)}-pid${item.id}`;

          return (
            <div className="cart-item" key={index}>
              <div className="row align-items-center">
                <Link href={productLink}>
                  <a>
                    <div
                      className="cart-item__image lozadloaded flex-shrink-0"
                      style={{
                        backgroundImage: `url(${item.image_128})`
                      }}
                    />
                  </a>
                </Link>
                <div className="flex-1 pl-2 pr-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <Link href={productLink}>
                        <a className="cart-item__name" title={item.name}>
                          {item.name}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-1 flex-column">
                      {t('checkout:price_invoice')}: <PriceText price={item.list_price} />
                      {item.discount_percentage && <span>({item.discount_percentage}%)</span>}
                      <div className="ml-3">{/* <div>{t('checkout:quantity')}</div> */}</div>
                      {t('checkout:price_VAT')}: <PriceText price={item.sale_price} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Checkbox>
  );
};

export default InvoiceProducts;
