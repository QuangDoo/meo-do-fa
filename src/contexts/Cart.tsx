import { ApolloQueryResult } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

import { useToken } from './Token';

type ContextValue = {
  data: GetCartData['getCart'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<GetCartData>>;
};

const CartContext = createContext<ContextValue>(undefined);

const useCart = () => useContext(CartContext);

const CartProvider = (props) => {
  const token = useToken();

  const { t } = useTranslation(['errors']);

  const { data, loading, refetch } = useQueryAuth<GetCartData, undefined>(GET_CART, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

      toast.error(t(`errors:code_${errorCode}`), {
        autoClose: 1500
      });
    },
    skip: !token
  });

  return (
    <CartContext.Provider value={{ data: data?.getCart, loading, refetch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
