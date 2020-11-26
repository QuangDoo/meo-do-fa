// const express = require('express');
// const next = require('next');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const port = process.env.PORT || 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const isDevelopment = process.env.NODE_ENV !== 'production';

// app
//   .prepare()
//   .then(() => {
//     const server = express();

//     const filter = function (pathname, req) {
//       return pathname.match('^/graphql') && req.method === 'POST';
//     };

//     const apiProxy = createProxyMiddleware(filter, {
//       target: 'http://gateway.medofa.svc.cluster.local',
//       changeOrigin: false,
//       ws: true
//     });

//     server.use(apiProxy);

//     server.all('*', (req, res) => {
//       return handle(req, res);
//     });

//     server.listen(port, (err) => {
//       if (err) throw err;
//       console.log(`> Ready on http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log('Error:::::', err);
//   });
