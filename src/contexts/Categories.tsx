import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useContext, useEffect } from 'react';
import { GET_CATEGORIES } from 'src/graphql/category/category.query';
import { Category } from 'src/types/Category';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type GetCategoriesData = {
  getCategories: Category[];
};

type ContextValue = {
  data: Category[];
  nameLookup: {
    [id: string]: string;
  };
  loading: boolean;
  error: ApolloError;
};

const CategoriesContext = createContext<ContextValue>(null);
CategoriesContext.displayName = 'CategoriesContext';

const CategoriesProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data, loading, error } = useQuery<GetCategoriesData, undefined>(GET_CATEGORIES);

  useEffect(() => {
    if (!error) return;

    console.log('GET CATEGORIES ERROR:', error);
  }, [error]);

  const categories = data?.getCategories || [];

  return (
    <CategoriesContext.Provider
      value={{
        data: categories,
        nameLookup: categories.reduce(
          (lookup, categ) => ({ ...lookup, [categ.id]: categ.name }),
          {}
        ),
        loading,
        error
      }}>
      {children}
    </CategoriesContext.Provider>
  );
});

const useCategories = () => useContext(CategoriesContext);

export { CategoriesProvider, useCategories };
