var express = require('express'),
        app = express(),
      async = require('async'),
    request = require('request'),
       path = require('path'),
     marked = require('marked'),
    session = require('express-session'),
     github = require('./util/github')((process.env.GH_HOST || null), (process.env.GH_API_PATH_PREFIX || null)),
        env = require('./util/env');
app.use(session({
  secret: process.env.COOKIE_SECRET,
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
	process.env.GH_CLIENT_SECRET, process.env.GH_CALLBACK_URL, process.env.ACCESS_PRIVATE_REPOS);
app.use(function(req, res) {
  res.send(404);
});
app.listen(process.env.PORT || 5000);