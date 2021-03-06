module.exports = function(app, request, githubHost, githubClientId, githubClientSecret, callbackUrl, accessPrivateRepos) {

  app.get('/auth/sign-in', function(req, res) {
    res.redirect('https://'
      + githubHost
      + '/login/oauth/authorize?client_id=' + githubClientId
      + '&redirect_uri=' + callbackUrl
      + (accessPrivateRepos ? '&scope=repo' : ''));
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
      request.post({url: 'https://' + githubHost + '/login/oauth/access_token', json: params}, function(err, result, body) {
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