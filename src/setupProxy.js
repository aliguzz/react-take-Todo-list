const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Proxy path
    createProxyMiddleware({
      target: 'https://mockend.com/api', // The server to forward requests to
      changeOrigin: true, // Required for virtual hosted sites
      pathRewrite: { // Rewrite the URL path
        '^/api': '/aliguzz/react-take-Todo-list/todos', // Replace '/api' with your Mockend path
      },
    })
  );
};

