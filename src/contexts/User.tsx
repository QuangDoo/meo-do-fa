import { QueryLazyOptions, useLazyQuery } from '@apollo/react-hooks';
import React, { createContext, useContext, useEffect } from 'react';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser.mutation';
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
  const [getUser, { data }] = useLazyQuery<GetUserData, undefined>(GET_USER, {
    onError: (error) => {
      console.log('Get user error:', { error });
    }
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: data?.getUser, getUser }}>{children}</UserContext.Provider>
  );
});

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
