import React, { createContext, useContext, useState } from 'react';
import { GetCartData } from 'src/graphql/cart/getCart';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  cart?: GetCartData;
  setCart?: (value: GetCartData) => void;
};

const CartContext = createContext<ContextValue>({});

const CartProvider = ({ children }: Props) => {
  const [state, setState] = useState<GetCartData>();

  return (
    <CartContext.Provider value={{ cart: state, setCart: setState }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartProvider, useCartContext };
