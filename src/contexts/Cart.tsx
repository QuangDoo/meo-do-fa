import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  cart?: Value;
  setCart?(value: any): void;
};

type Cart = {
  _id: string;
  quantity: number;
  productId: string;
  productName: string;
  price: number;
  oldPrice: number;
  product: {
    image_512: string;
  };
};

type Value = {
  carts: Cart[];
  totalQty: number;
  totalPrice: number;
  refetchCart: () => void;
};

const CartContext = createContext<ContextValue>({});

const CartProvider = ({ children }: Props) => {
  const [state, setState] = useState();

  return (
    <CartContext.Provider value={{ cart: state, setCart: setState }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartProvider, useCartContext };
