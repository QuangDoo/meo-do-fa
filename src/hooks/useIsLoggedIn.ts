import cookies from 'js-cookie';

export default function useIsLoggedIn(): boolean {
  return !!cookies?.get('token');
}
