var express = require('express');
var path = require('path');
var app = express();
var db = require('./src/database/db');
var bodyParser = require('body-parser');


app.use(bodyParser());

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackconfig = require('./webpack.dev.config.js');
var webpackcompiler = webpack(webpackconfig);

//enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app) {
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
      'errors-only': true
    }
  }));
  app.use(webpackHotMiddleware(webpackcompiler, {
    log: console.log
  }));

  return app;
}


// Only want hot reloading in development
if (process.env.NODE_ENV !== 'production') {
  // Run dev development with command: npm run start-dev
  console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  useWebpackMiddleware(app);
} else {
  // Run dev development with command: npm run start-prod
  console.log('PRODUCTION ENVIRONMENT');

  // app.use(express.static(__dirname + '/public'));
}
app.use(express.static(__dirname + '/public'));
//=============================================================
// Routing
// -------------------------------------------------------------------------------------------------------------
// I set this routing up so that if you define a route here in the server then it will handle the
// the routing here from the server. If a route is requested that isn't defined here in the server
// then it will get handled on the front-end by react-router.
//=============================================================

db.start(app);

// If route was not defined send the base html file that runs the react app, which will handle the
// routes not defined
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'index.html'));
});



//=============================================================
// Server start
//=============================================================
var server = app.listen(3050, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server Listening at: http://%s:%s", host, port);
});
