var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  public: '192.168.195.139',
  disableHostCheck: true
}).listen(3000, '0.0.0.0', function (err, res) {
  err ? console.log(err) : console.log("Listening at 0.0.0.0:3000")
})
