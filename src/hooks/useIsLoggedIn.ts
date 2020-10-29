import { useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';

export default function useIsLoggedIn() {
  const [token, setToken] = useLocalStorage('token');

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return isLoggedIn;
}
