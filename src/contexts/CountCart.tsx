import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  countCart?: number;
  setCountCart?: (value: number) => void;
};

const CountCartContext = createContext<ContextValue>({});

const CountCartProvider = ({ children }: Props) => {
  const [countCart, setCountCart] = useState<number>();

  return (
    <CountCartContext.Provider value={{ countCart, setCountCart }}>
      {children}
    </CountCartContext.Provider>
  );
};

const useCountCartContext = () => useContext(CountCartContext);

export { CountCartProvider, useCountCartContext };
