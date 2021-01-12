import slugify from '@sindresorhus/slugify';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import {
  GET_INVOICE_COUNSEL,
  GetInvoiceCounselData,
  GetInvoiceCounselVars
} from 'src/graphql/product/getProductInvoice.query';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

import BillingExport from './BillingExport';

type Props = {
  orderNo: string;
};

const InvoiceProducts = (props: Props) => {
  const { t } = useTranslation(['checkout']);

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
    <BillingExport name="isProductInvoice" label={t('checkout:list_products_have_invoice')}>
      {products.map((item, index) => {
        const productLink = `products/${slugify(item.name)}-pid${item.id}`;

        return (
          <div className="cart-item" key={index}>
            <div className="row align-items-center">
              <Link href={productLink}>
                <a>
                  <div
                    className="cart-item__image lozadloaded flex-shrink-0"
                    style={{
                      backgroundImage: `url(${item.image})`
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
        );
      })}
    </BillingExport>
  );
};

export default InvoiceProducts;
