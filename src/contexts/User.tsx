import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useContext } from 'react';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser.mutation';
import withApollo from 'src/utils/withApollo';

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext(null);

const UserProvider = withApollo({ ssr: true })(({ children }: Props) => {
  const { data } = useQuery<GetUserData, undefined>(GET_USER, {
    onCompleted: (data) => {
      console.log('User data:', data);
    },
    onError: (error) => {
      console.log('Get user error:', { error });
    }
  });

  return <UserContext.Provider value={{ user: 'test' }}>{children}</UserContext.Provider>;
});

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
