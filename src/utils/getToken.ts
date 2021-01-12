import cookies from 'js-cookie';

// on server => ctx.req exists => get token in cookies from request
// on client => ctx.req undefined => get token in cookies from client browser

export default function getToken(ctx) {
  return ctx.req?.cookies.token || decodeURIComponent(cookies.get('token') || '') || undefined;
}
