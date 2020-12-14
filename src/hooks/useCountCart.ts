import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCountCartContext } from 'src/contexts/CountCart';
import { COUNT_CART, CountCartData } from 'src/graphql/cart/countCart.query';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useLazyQueryAuth } from './useApolloHookAuth';

export default function useCountCart() {
  const { setCountCart } = useCountCartContext();

  const [countCart, { data, error, refetch }] = useLazyQueryAuth<CountCartData, undefined>(
    COUNT_CART,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        setCountCart(data.countCarts.data);
      }
    }
  );
  //   console.log('data', data);
  useEffect(() => {
    if (!error) return;

    console.log('Get count cart error:', error);
    // toast.error(error);
  }, [error]);

  const [token] = useLocalStorage('token');

  // Get count cart if token is available
  useEffect(() => {
    if (!token) return;

    countCart();
  }, [token]);

  return {
    refetchCountCart: refetch,
    countCart,
    data
  };
}
