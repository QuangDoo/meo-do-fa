import React, { useEffect } from 'react';
import {
  GET_INVOICE_COUNSEL,
  GetProductsWithInvoiceData,
  GetProductsWithInvoiceVars
} from 'src/graphql/product/getProductInvoice.query';

import { useLazyQueryAuth } from './useApolloHookAuth';

type Props = {
  cartId: string;
  productId: number;
  quantity: number;
  productName: string;
};

export default function useInvoiceCounse(props: Props) {
  const { cartId, productId, quantity, productName } = props;

  const [
    getProductInvoice,
    { data, loading, error, refetch: refetchProductInvoice }
  ] = useLazyQueryAuth<GetProductsWithInvoiceData, GetProductsWithInvoiceVars>(GET_INVOICE_COUNSEL);

  useEffect(() => {
    if (!data) return;

    getProductInvoice({
      variables: {
        counsels: [
          {
            cartId: cartId,
            productId: productId,
            quantity: quantity,
            productName: productName
          }
        ]
      }
    });
  }, [data]);
  const productsInvoice = data?.getInvoiceCounsel || [];
  console.log('loading', loading);
  return {
    productsInvoice,
    errorProductInvoice: error
  };
}
