import { useEffect } from 'react';
import { useCountCartContext } from 'src/contexts/CountCart';
import { COUNT_CART, CountCartData } from 'src/graphql/cart/countCart.query';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useLazyQueryAuth } from './useApolloHookAuth';

export default function useCountCart() {
  const { countCart, setCountCart } = useCountCartContext();

  const [getCountCart, { refetch }] = useLazyQueryAuth<CountCartData, undefined>(COUNT_CART, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setCountCart(data.countCarts.data);
    },
    onError: (error) => {
      console.log('Get count cart error:', error);
    }
  });

  const [token] = useLocalStorage('token');

  // Get count cart if token is available
  useEffect(() => {
    if (!token && countCart !== undefined) return;

    getCountCart();
  }, [token]);

  return {
    countCart,
    refetchCountCart: refetch
  };
}
