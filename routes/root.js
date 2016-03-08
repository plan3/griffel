module.exports = function(app, github, marked, async, repos, path) {

  app.get('/', function(req, res) {
    if(req.session && req.session.token) {
      var gh = github.client(req.session.token);
      async.map(repos, function(repo, callback) {
        gh.repos.getContent({user: repo.user, repo: repo.repo, ref: req.query.ref ? req.query.ref : 'master', path: path}, function(err, content) {
          if(err) {
            console.log(err);
            callback(null, null);
          } else {
            try {
              callback(null, new Buffer(content.content, content.encoding).toString('utf-8'));
            } catch(err) {
              console.error(err);
              callback(null, null);
            }
          }
        });
      }, function(err, results) {
        if(err) {
          console.error(err);
        }
        if(results) {
          res.render('layout', {content: marked(results.join('\n'))});
        }
      });
    } else {
      res.redirect('/auth/sign-in');
    }
  });

}