import { QueryLazyOptions, useLazyQuery } from '@apollo/react-hooks';
import React, { createContext, useContext, useEffect } from 'react';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser.mutation';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { User } from 'src/types/User';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  user?: User;
  getUser: (options?: QueryLazyOptions<undefined>) => void;
};

const UserContext = createContext<ContextValue>(null);

const UserProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const [getUser, { data, error }] = useLazyQuery<GetUserData, undefined>(GET_USER);

  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!error) return;

    if (error.graphQLErrors[0].extensions.code === 500) {
      localStorage.removeItem('token');
    }
  }, [error]);

  useEffect(() => {
    if (!token) return;

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <UserContext.Provider value={{ user: data?.getUser, getUser }}>{children}</UserContext.Provider>
  );
});

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
