import getToken from './getToken';
import redirect from './redirect';

export default function protectRoute(ctx) {
  const token = getToken(ctx);

  if (!token) {
    redirect({
      ctx,
      location: '/'
    });
  }
}
