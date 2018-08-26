const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

const publicPath = express.static(path.join(__dirname, '/public'));

app.use(express.static('images'));
app.use('/public', publicPath);

const routing = require('./routing')(app);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist
  }))
}

const port = (process.env.PORT || 3000)
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
