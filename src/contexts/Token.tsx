import { createContext, useContext } from 'react';

const TokenContext = createContext(undefined);

const useToken = () => useContext(TokenContext);

export { useToken, TokenContext };
