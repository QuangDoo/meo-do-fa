import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/order/order.query';
import useLocalStorage from 'src/hooks/useLocalStorage';
import cart from 'src/pages/cart';

import { useCartContext } from '../contexts/Cart';

export default function useCart() {
  const [getCart, { data, error, refetch }] = useLazyQuery<GetCartData, undefined>(GET_CART, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
