const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    proxy('/rest', {
      target: process.env.REACT_APP_SECRET_CODE,
      changeOrigin: true
    })
  )
}