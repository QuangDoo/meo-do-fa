import useLocalStorage from './useLocalStorage';

export default function useIsLoggedIn(): boolean {
  const [token] = useLocalStorage('token');

  return !!token;
}
