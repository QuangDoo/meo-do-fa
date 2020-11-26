import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_CART } from 'src/graphql/order/order.query';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useCartContext } from '../contexts/Cart';
import { useLazyQueryAuth } from './useApolloHookAuth';

export default function useCart() {
  const [getCart, { data, error, refetch }] = useLazyQueryAuth(GET_CART, {
    fetchPolicy: 'network-only'
  });

  const { setCart } = useCartContext();

  useEffect(() => {
    if (!error) return;

    toast.error(error);
  }, [error]);

  const [token] = useLocalStorage('token');

  // Get cart if token is available
  useEffect(() => {
    if (!token) return;

    getCart();
  }, [token]);

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data, setCart]);

  return {
    refetchCart: refetch,
    getCart,
    cart: data
  };
}
