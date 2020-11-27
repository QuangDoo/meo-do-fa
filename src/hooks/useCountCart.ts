import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCountCartContext } from 'src/contexts/CountCart';
import { COUNT_CART } from 'src/graphql/cart/countCart.query';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useLazyQueryAuth } from './useApolloHookAuth';

export default function useCountCart() {
  const [countCart, { data, error, refetch }] = useLazyQueryAuth(COUNT_CART, {
    fetchPolicy: 'network-only'
  });
  //   console.log('data', data);
  useEffect(() => {
    if (!error) return;

    toast.error(error);
  }, [error]);

  const { setCountCart } = useCountCartContext();

  const [token] = useLocalStorage('token');
  // Get count cart if token is available
  useEffect(() => {
    if (!token) return;

    countCart();
  }, [token]);

  useEffect(() => {
    if (data) {
      setCountCart(data.data);
    }
  }, [data]);

  return {
    refetchCountCart: refetch,
    countCart,
    data
  };
}
