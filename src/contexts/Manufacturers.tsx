import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useContext, useEffect } from 'react';
import { GET_MANUFACTURERS } from 'src/graphql/manufactures/manufacturers.query';
import { Manufacturer } from 'src/types/Manufacturer';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type GetManufacturersData = {
  getManufactoriesAll: Manufacturer[];
};

type ContextValue = {
  data: Manufacturer[];

  loading: boolean;
  error: ApolloError;
};

const ManufacturersContext = createContext<ContextValue>(null);
ManufacturersContext.displayName = 'ManufacturersContext';

const ManufacturersProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data, loading, error } = useQuery<GetManufacturersData, undefined>(GET_MANUFACTURERS);

  useEffect(() => {
    if (!error) return;
  }, [error]);

  const manufacturers = data?.getManufactoriesAll || [];

  return (
    <ManufacturersContext.Provider
      value={{
        data: manufacturers,

        loading,
        error
      }}>
      {children}
    </ManufacturersContext.Provider>
  );
});

const useManufacturers = () => useContext(ManufacturersContext);

export { ManufacturersProvider, useManufacturers };
