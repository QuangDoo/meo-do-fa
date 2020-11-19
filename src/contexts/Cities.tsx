import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useContext, useEffect } from 'react';
import { City, GET_CITIES, GetCitiesData } from 'src/graphql/address/city.query';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  data: City[];
  loading: boolean;
  error: ApolloError;
};

const CitiesContext = createContext<ContextValue>(null);
CitiesContext.displayName = 'CityContext';

const CitiesProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data, loading, error } = useQuery<GetCitiesData, undefined>(GET_CITIES);

  useEffect(() => {
    if (!error) return;

    console.log('GET CITIES ERROR:', error);
  }, [error]);

  const cities = data?.getCities || [];

  return (
    <CitiesContext.Provider
      value={{
        data: cities,
        loading,
        error
      }}>
      {children}
    </CitiesContext.Provider>
  );
});

const useCities = () => useContext(CitiesContext);

export { CitiesProvider, useCities };
