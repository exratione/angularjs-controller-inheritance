/**
 * @fileOverview
 * Launch an Express server for the AngularJS application.
 */

var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
// Static file serving from ../client.
app.use(express.static(path.join(__dirname, '../client')));

// Launch the server.
var server = http.createServer(app).listen(10080);
