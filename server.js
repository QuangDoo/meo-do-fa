const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const isDevelopment = process.env.NODE_ENV !== 'production';

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      '/graphql',
      createProxyMiddleware({
        target: 'http://gateway.medofa.svc.cluster.local',
        changeOrigin: true,
        ws: true,
        auth: 'medofa:medofa-bb-999'
      })
    );

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error:::::', err);
  });
