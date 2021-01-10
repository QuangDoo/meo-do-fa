import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/cart/getCart';

import { useCartContext } from '../contexts/Cart';
import { useQueryAuth } from './useApolloHookAuth';

type Props = {
  onCompleted?: (data: GetCartData) => void;
};

export default function useCart(props: Props = {}) {
  const { data, loading, refetch } = useQueryAuth<GetCartData, undefined>(GET_CART, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setCart(data);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { cart, setCart } = useCartContext();

  return {
    cart,
    loading,
    refetchCart: refetch
  };
}
