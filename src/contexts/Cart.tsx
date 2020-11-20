import { QueryLazyOptions, useLazyQuery } from '@apollo/react-hooks';
import { ApolloQueryResult } from 'apollo-boost';
import { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_CART, GetCartData } from 'src/graphql/order/order.query';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type Cart = {
  _id: string;
  quantity: number;
  productId: string;
  productName: string;
  price: number;
  oldPrice: number;
};

type Value = {
  carts: Cart[];
  totalQty: number;
  totalPrice: number;
  refetchCart: () => void;
};

const CartContext = createContext<Value>(null);
CartContext.displayName = 'CartContext';

const CartProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const [getCart, { data }] = useLazyQuery<GetCartData, undefined>(GET_CART, {
    onError: (error) => {
      console.log('Get cart error: ', error);
      toast.error('Get cart error: ' + error);
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        carts: data?.getCart.carts || [],
        totalQty: data?.getCart.totalQty || 0,
        totalPrice: data?.getCart.totalPrice || 0,
        refetchCart: getCart
      }}>
      {children}
    </CartContext.Provider>
  );
});

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
