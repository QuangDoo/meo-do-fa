import Router from 'next/router';

// ctx.res available => on server => redirect by writing to response head
// ctx.res undefined => on client => redirect with Router
// status 302 means temporarily redirect

function redirect({ ctx, location, status = 302 }) {
  if (ctx.res) {
    // Seems to be the version used by zeit
    ctx.res.writeHead(status, {
      Location: location
    });
    ctx.res.end();
    return;
  }

  Router.replace(location);
}

export default redirect;
