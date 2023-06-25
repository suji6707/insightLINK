const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        // ['/api/login', '/api/users/me'],
        createProxyMiddleware({
            target: 'http://3.35.239.116:8800',
            changeOrigin: true
        })
    );
};