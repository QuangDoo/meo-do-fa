import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useCartContext } from '../contexts/Cart';
import { useLazyQueryAuth } from './useApolloHookAuth';

type Props = {
  onCompleted?: (data: GetCartData) => void;
};

export default function useCart(props: Props = {}) {
  const [getCart, { loading, refetch }] = useLazyQueryAuth<GetCartData, undefined>(GET_CART, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setCart(data);
      props?.onCompleted?.(data);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { cart, setCart } = useCartContext();

  const [token] = useLocalStorage('token');

  // Get cart if token is available
  useEffect(() => {
    if (!token) return;

    getCart();
  }, [token]);

  return {
    cart,
    loading,
    getCart,
    refetchCart: refetch
  };
}
