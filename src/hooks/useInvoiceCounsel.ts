import React, { useEffect } from 'react';
import {
  GET_INVOICE_COUNSEL,
  GetProductsWithInvoiceData,
  GetProductsWithInvoiceVars
} from 'src/graphql/product/getProductInvoice.query';

import { useLazyQueryAuth } from './useApolloHookAuth';

type Props = {
  orderNo: string;
};

export default function useInvoiceCounse(props: Props) {
  const { orderNo } = props;

  const [
    getProductInvoice,
    { data, loading, error, refetch: refetchProductInvoice }
  ] = useLazyQueryAuth<GetProductsWithInvoiceData, GetProductsWithInvoiceVars>(GET_INVOICE_COUNSEL);

  useEffect(() => {
    if (!data) return;

    getProductInvoice({
      variables: {
        orderNo
      }
    });
  }, [data]);
  // console.log('error', error);
  const productsInvoice = data?.getInvoiceCounsel || [];

  return {
    productsInvoice,
    errorProductInvoice: error
  };
}
