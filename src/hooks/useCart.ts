import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_CART } from 'src/graphql/order/order.query';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useCartContext } from '../contexts/Cart';
import { useQueryAuth } from './useApolloHookAuth';

export default function useCart() {
  const { data, loading, refetch } = useQueryAuth(GET_CART, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setCart(data);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { setCart } = useCartContext();

  const [token] = useLocalStorage('token');

  // Get cart if token is available
  useEffect(() => {
    if (!token) return;

    refetch();
  }, [token]);

  return {
    refetchCart: refetch,
    cart: data,
    loading
  };
}
