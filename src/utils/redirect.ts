import Router from 'next/router';

function redirect({ ctx, location, status = 302 }) {
  if (ctx.res) {
    // Seems to be the version used by zeit
    ctx.res.writeHead(status, {
      Location: location,
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8'
    });
    ctx.res.end();
    return;
  }

  Router.replace(location);
}

export default redirect;
