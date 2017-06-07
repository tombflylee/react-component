let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let express = require('express');
let path = require('path');
let config = require('./webpack-dev-config');// 使用相对路径：表示在同一目录下

let app = express();
let port = 3000;
let compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
	noInfo: false,// 只显示warning和error
	quiet: false,
	publicPath: config.output.publicPath,// 与webpack中的publicPath一样
	stats: {
		colors: true
	}
}));

app.use(webpackHotMiddleware(compiler));// webpack-dev-middleware的配置

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './app/index.html'));// path.resolve 类似于cd命令，./:当前目录
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});