import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';

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

  return {
    cart,
    loading,
    getCart,
    refetchCart: refetch
  };
}
