import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { City, GET_CITIES, GetCitiesData } from 'src/graphql/address/city.query';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  data: City[];
  loading: boolean;
};

const CityContext = createContext<ContextValue>(null);
CityContext.displayName = 'CityContext';

const CityProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data, loading } = useQuery<GetCitiesData, undefined>(GET_CITIES, {
    onError: (error) => {
      console.log('Get cities error:', error);

      toast.error('Get cities error: ' + error);
    }
  });

  const cities = data?.getCities || [];

  return (
    <CityContext.Provider
      value={{
        data: cities,
        loading
      }}>
      {children}
    </CityContext.Provider>
  );
});

const useCities = () => useContext(CityContext);

export { CityProvider, useCities };
