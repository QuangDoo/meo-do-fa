import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useContext, useEffect } from 'react';
import { GET_CITY } from 'src/graphql/address/city.query';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type GetCities = {
  getCities: string[];
};

type ContextValue = {
  data: [];

  loading: boolean;
  error: ApolloError;
};

const CityContext = createContext<ContextValue>(null);
CityContext.displayName = 'CityContext';

const CityProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data, loading, error } = useQuery(GET_CITY);

  useEffect(() => {
    if (!error) return;

    console.log('GET CATEGORIES ERROR:', error);
  }, [error]);

  const city = data?.getCities || [];

  return (
    <CityContext.Provider
      value={{
        data: city,
        loading,
        error
      }}>
      {children}
    </CityContext.Provider>
  );
});

const useCities = () => useContext(CityContext);

export { CityProvider, useCities };
