module.exports = function(app, github, request, githubHost, githubClientId, githubClientSecret, callbackUrl) {

  app.get('/auth/sign-in', function(req, res) {
    res.redirect('https://'
      + (githubHost || 'github.com')
      + '/login/oauth/authorize?client_id=' + githubClientId
      + '&redirect_uri=' + callbackUrl
      + '&scope=repo');
  });

  app.get('/auth/sign-out', function(req, res) {
    req.session.destroy();
    res.send('You have successfully signed out');
  });

  app.get('/auth/callback', function(req, res) {
    if(req.query.code) {
      var params = {
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code: req.query.code
      };
      request.post({url: 'https://' + (githubHost || 'github.com') + '/login/oauth/access_token', json: params}, function(err, result, body) {
        if(body && body.access_token) {
          req.session.token = body.access_token;
          res.redirect('/');
        } else {
          console.log(err);
          res.send(500);
        }
      });
    } else {
      res.send(400);
    }
  });

}