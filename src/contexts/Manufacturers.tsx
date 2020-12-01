import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/client';
import React, { createContext, useContext, useEffect } from 'react';
import {
  GET_ALL_MANUFACTURERS,
  GetAllManufacturersData
} from 'src/graphql/manufacturers/manufacturers.query';
import { Manufacturer } from 'src/types/Manufacturer';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  data: Manufacturer[];

  loading: boolean;
  error: ApolloError;
};

const ManufacturersContext = createContext<ContextValue>(null);
ManufacturersContext.displayName = 'ManufacturersContext';

const ManufacturersProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data, loading, error } = useQuery<GetAllManufacturersData, undefined>(
    GET_ALL_MANUFACTURERS
  );

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
