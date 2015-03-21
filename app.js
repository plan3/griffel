var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var markdown = marked(fs.readFileSync(__dirname + '/spec.md', 'utf8'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
});
app.get('/', function(req, res) {
  res.render('layout', {content: markdown});
});
app.use(function(req, res) {
  res.send(404);
});
app.listen(process.env.PORT || 5000);