import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  countCart?: Value;
  setCountCart?(value: any): void;
};

type CountCart = {
  data: number;
};

type Value = {
  countCart: CountCart;
  refetchCountCart: () => void;
};

const CountCartContext = createContext<ContextValue>({});

const CountCartProvider = ({ children }: Props) => {
  const [state, setState] = useState();

  return (
    <CountCartContext.Provider value={{ countCart: state, setCountCart: setState }}>
      {children}
    </CountCartContext.Provider>
  );
};

const useCountCartContext = () => useContext(CountCartContext);

export { CountCartProvider, useCountCartContext };
