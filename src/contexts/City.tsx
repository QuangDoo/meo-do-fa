import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  cities?: any;
  setCity?(value: any): void;
};

const CityContext = createContext<ContextValue>({});

const CityProvider = ({ children }: Props) => {
  const [state, setState] = useState();

  return (
    <CityContext.Provider value={{ cities: state, setCity: setState }}>
      {children}
    </CityContext.Provider>
  );
};

const useCityContext = () => useContext(CityContext);

export { CityProvider, useCityContext };
