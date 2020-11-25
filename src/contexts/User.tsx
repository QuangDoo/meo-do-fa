import React, { createContext, useContext, useState } from 'react';
import { User } from 'src/types/User';

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  user?: User;
  setUser?(value: any): void;
};

const UserContext = createContext<ContextValue>({});

const UserProvider = ({ children }: Props) => {
  const [state, setState] = useState();

  return (
    <UserContext.Provider value={{ user: state, setUser: setState }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
