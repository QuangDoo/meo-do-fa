import { ApolloQueryResult, QueryLazyOptions, useLazyQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import React, { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';

import { useCheckboxCarts } from './CheckboxCarts';

type ContextValue = {
  data: GetCartData['getCart'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<GetCartData>>;
  getCart: (options?: QueryLazyOptions<undefined>) => void;
};

const CartContext = createContext<ContextValue>(undefined);

const useCart = () => useContext(CartContext);

const CartProvider = (props) => {
  const { t } = useTranslation(['errors']);

  const { setCheckboxCarts, isFirst, setIsFirst } = useCheckboxCarts();

  // Lazy query
  const [fetch, { data, loading, refetch }] = useLazyQuery<GetCartData, undefined>(GET_CART, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

      toast.error(t(`errors:code_${errorCode}`));
    },
    onCompleted: () => {
      if (isFirst) {
        setCheckboxCarts(data?.getCart?.carts.map((cart) => cart._id));
        setIsFirst(false);
      }
    }
  });

  // Get cart with token in cookies
  const getCart = () => {
    fetch({
      context: {
        headers: {
          authorization: cookies.get('token') || ''
        }
      }
    });
  };

  // Get cart on mount if has token in cookies
  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ data: data?.getCart, loading, refetch, getCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
