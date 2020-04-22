const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'http://167.99.149.199/',
      changeOrigin: true,
    }),
  );
};
