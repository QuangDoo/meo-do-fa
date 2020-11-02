import { useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';

export default function useIsLoggedIn(): boolean {
  const [token] = useLocalStorage('token');

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  console.log('Token:', token);
  console.log('Is logged in:', !!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return isLoggedIn;
}
