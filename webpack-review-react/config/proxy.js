module.exports = {
    proxy: {
        "/api/": {
            target: 'http://localhost:9000/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}