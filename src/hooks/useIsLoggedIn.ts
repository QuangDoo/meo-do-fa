import { useToken } from 'src/contexts/Token';

export default function useIsLoggedIn(): boolean {
  const token = useToken();

  return Boolean(token);
}
