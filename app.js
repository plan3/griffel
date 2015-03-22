var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var path = require('path');
var marked = require('marked');
var markdown = marked(fs.readFileSync(__dirname + '/spec.md', 'utf8'));
var session = require('express-session');
var github = require('./github')(process.env.GH_HOST, process.env.GH_API_PATH_PREFIX);
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
require('./routes/root')(app, github, markdown);
require('./routes/auth')(app, github, request, process.env.GH_HOST,
	process.env.GH_CLIENT_ID, process.env.GH_CLIENT_SECRET, process.env.GH_CALLBACK_URL);
app.use(function(req, res) {
  res.send(404);
});
app.listen(process.env.PORT || 5000);