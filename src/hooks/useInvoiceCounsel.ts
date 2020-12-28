import React, { useEffect } from 'react';
import {
  GET_INVOICE_COUNSEL,
  GetProductsWithInvoiceData,
  GetProductsWithInvoiceVars
} from 'src/graphql/product/getProductInvoice.query';

import { useQueryAuth } from './useApolloHookAuth';

type Props = {
  orderNo: string;
};

export default function useInvoiceCounse(props: Props) {
  const { orderNo } = props;

  const { data: dataInvoiceCounsel, loading, error, refetch: refetchProductInvoice } = useQueryAuth<
    GetProductsWithInvoiceData,
    GetProductsWithInvoiceVars
  >(GET_INVOICE_COUNSEL, { variables: { orderNo: orderNo } });

  useEffect(() => {
    if (!dataInvoiceCounsel) return;
  }, [dataInvoiceCounsel]);

  const productsInvoice = dataInvoiceCounsel?.getInvoiceCounsel || [];

  return {
    productsInvoice,
    errorProductInvoice: error
  };
}
