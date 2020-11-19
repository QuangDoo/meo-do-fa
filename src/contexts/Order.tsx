import { useMutation } from '@apollo/react-hooks';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import { ADD_TO_CART } from '../graphql/order/order.mutation';
import withApollo from '../utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  addToCart: (p) => void;
  data?: string;
  loading?: boolean;
  error?: null;
};
const OrderContext = createContext<ContextValue>(null);
OrderContext.displayName = 'OrderContext';

const OrderProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      if (data.createCart.code !== 200) return;

      toast.success('Add to cart success');
    },
    onError: () => {
      toast.error('Error adding to cart');
    }
  });

  return <OrderContext.Provider value={{ addToCart }}>{children}</OrderContext.Provider>;
});

const useOrder = () => useContext(OrderContext);

export { OrderProvider, useOrder };
