const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mockend.com/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/aliguzz/react-take-Todo-list',
      },
    })
  );
};
