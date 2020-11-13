import { useMutation } from '@apollo/react-hooks';
import React, { createContext, useContext } from 'react';

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
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);

  console.log('error', JSON.stringify(error));
  return <OrderContext.Provider value={{ addToCart }}>{children}</OrderContext.Provider>;
});

const useOrder = () => useContext(OrderContext);

export { OrderProvider, useOrder };

// const { addToCart } = useasdasd();

// addTocart({
//   asdasda
// });
