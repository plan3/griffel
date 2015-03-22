var express = require('express');
var app = express();
var async = require('async');
var request = require('request');
var path = require('path');
var marked = require('marked');
var session = require('express-session');
var github = require('./util/github')((process.env.GH_HOST || null), (process.env.GH_API_PATH_PREFIX || null));
var env = require('./util/env');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
});
app.set('view engine', 'jade');
require('./routes/root')(app, github, marked, async, env.parse(process.env.GH_REPOS), (process.env.DOC_PATH || 'api-doc.md'));
require('./routes/auth')(app, request, (process.env.GH_HOST || 'github.com'), process.env.GH_CLIENT_ID,
	process.env.GH_CLIENT_SECRET, process.env.GH_CALLBACK_URL);
app.use(function(req, res) {
  res.send(404);
});
app.listen(process.env.PORT || 5000);