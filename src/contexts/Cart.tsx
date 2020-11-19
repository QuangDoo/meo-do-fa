import { QueryLazyOptions, useLazyQuery } from '@apollo/react-hooks';
import { createContext, useContext, useEffect } from 'react';
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
  getCart: (options?: QueryLazyOptions<undefined>) => void;
};

const CartContext = createContext<Value>(null);
CartContext.displayName = 'CartContext';

const CartProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const [getCart, { data }] = useLazyQuery<GetCartData, undefined>(GET_CART);

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
        getCart
      }}>
      {children}
    </CartContext.Provider>
  );
});

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
