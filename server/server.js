// require express, mongoose, middleware, routes
var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');
var routes = require('./config/routes.js');


// start express
var app = express();

// set middleware
middleware(app, express);

// set routes
routes(app, express);

// export app
module.exports = app;